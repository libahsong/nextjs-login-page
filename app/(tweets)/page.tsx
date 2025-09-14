import AddTweet from "@/components/tweet-add-form";
import ListController from "@/components/tweet-list-controller";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

async function getInitialTweets() {
  const initialTweets = await db.tweet.findMany({
    include: {
      user: { select: { username: true, id: true } },
      _count: { select: { responses: true, likes: true } },
      likes: true,
    },
    take: 10,
    orderBy: { created_at: "desc" },
  });

  return initialTweets;
}

const getCachedInitialTweets = nextCache(getInitialTweets, ["initialTweets"], {
  tags: ["call-initialTweets"],
});

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  // const initialTweets = await getInitialTweets();
  const initialTweets = await getCachedInitialTweets();

  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <AddTweet />
      <ListController initialTweets={initialTweets} />
    </div>
  );
}
