import db from "@/lib/db";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { AddResponse } from "@/components/response-add-form";
import { Back } from "@/components/back";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import { LikeButton } from "@/components/like-button";
import getSession from "@/lib/session";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/lib/utils";
import Button from "@/components/form-btn";

async function getTweet(id: number) {
  const tweet = await db.tweet.update({
    where: { id },
    data: { views: { increment: 1 } },
    include: { user: true, _count: { select: { responses: true } } },
  });
  console.log("hit getTweet", tweet.views, new Date());
  return tweet;
}

function getCachedTweet(id: number) {
  const cachedOperation = nextCache(getTweet, ["tweet"], {
    tags: ["click-tweet"],
  });

  return cachedOperation(id);
}

async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: { tweetId },
    include: {
      user: { select: { username: true } },
    },
    orderBy: { created_at: "desc" },
  });

  return responses;
}

function getCachedResponses(id: number) {
  const cachedOperation = nextCache(getResponses, ["responses"], {
    tags: ["add-response"],
  });
  return cachedOperation(id);
}

async function getResponsesCount(tweetId: number) {
  const count = await db.response.count({ where: { tweetId } });
  return count;
}

function getCachedResponsesCount(id: number) {
  const cachedOperation = nextCache(getResponsesCount, ["responses-count"], {
    tags: ["responses-count"],
  });
  return cachedOperation(id);
}

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: { id: { tweetId, userId } },
  });
  const likeCount = await db.like.count({ where: { tweetId } });
  return { likeCount, isLiked: Boolean(isLiked) };
}

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

export type Tweet = Prisma.PromiseReturnType<typeof getTweet>;
export type Responses = Prisma.PromiseReturnType<typeof getResponses>;

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const session = await getSession();
  const tweet = await getCachedTweet(id);
  // const tweet = await getTweet(id);

  const responses = await getCachedResponses(id);
  const responsesCount = await getCachedResponsesCount(id);
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);

  return (
    <div className="h-full flex flex-col justify-start items-center">
      <div className="flex flex-col gap-6 justify-center items-center pt-7">
        <Back />
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="size-10" />
            <span className="">{tweet?.user.username}</span>
          </div>
          <div className="text-lg">{tweet?.tweet}</div>
          <div className="flex gap-3 font-light">
            <span className="text-gray-600">
              {formatDate(tweet.created_at.toString())}
            </span>
            <div className="flex gap-1">
              <span>{tweet.views}</span>
              <span className="font-medium">views</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full border-b border-t p-3">
          <div className="flex gap-1 items-center">
            <ChatBubbleBottomCenterIcon className="size-5" />
            {/* <span>{tweet._count.responses}</span> */}
            <span>{responsesCount}</span>
          </div>
          <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
        </div>
        <div className="flex gap-5 justify-end">
          <div className="">
            <Button text="Edit" />
          </div>
          <div className="">
            <Button text="Delete" />
          </div>
        </div>
        <AddResponse
          tweetId={id}
          responses={responses}
          username={tweet?.user.username}
        />
      </div>
    </div>
  );
}
