import { formatDate } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { customRevalidateTag } from "@/app/tweets/[id]/action";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import Button from "./form-btn";

interface TweetListProps {
  id: number;
  tweet: string;
  created_at: Date;
  username: string;
  views: number;
  counts: number;
  userId: number;
  likeCounts: number;
  likes: {
    created_at: Date;
    userId: number;
    upadated_at: Date;
    tweetId: number;
  }[];
}

export default function TweetList({
  id,
  tweet,
  created_at,
  username,
  views,
  counts,
  userId,
  likeCounts,
  likes,
}: TweetListProps) {
  const isLiked = Boolean(
    likes?.find((like) => like.tweetId === id && like.userId === userId)
  );

  return (
    <div key={id} className="flex flex-col gap-10 w-full">
      <div className="flex gap-2">
        <UserCircleIcon className="size-10" />
        <div className="flex gap-1 items-start">
          <div className="flex items-center gap-1">
            <span>{username}</span>
            <span>&middot;</span>
            <span className="text-gray-600 text-sm ">
              {formatDate(created_at.toString())}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={`/tweets/${id}`}
        onClick={() => customRevalidateTag("click-tweet")}
        scroll={false}
      >
        <span>{tweet}</span>
      </Link>
      <div className="flex gap-3 items-center w-full border-b border-t p-3">
        <div className="flex gap-1 items-center">
          <ChatBubbleBottomCenterIcon className="size-5" />
          <span className="text-sm">{counts}</span>
        </div>
        <div className="flex gap-1 text-sm">
          <span>{views}</span>
          <span>views</span>
        </div>
        {/* <LikeButton isLiked={isLiked} likeCount={likeCounts} tweetId={id} /> */}
        <div className="flex gap-1">
          <button
            disabled={true}
            className="flex items-center text-gray-500 hover:text-red-700"
          >
            {isLiked ? (
              <HeartIcon className="size-5 text-red-700" />
            ) : (
              <HeartIconOutline className="size-5 " />
            )}
          </button>
          <span>{likeCounts}</span>
        </div>
      </div>
    </div>
  );
}
