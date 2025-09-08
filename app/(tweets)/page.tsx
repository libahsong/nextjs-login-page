import AddTweet from "@/components/tweet-add-form";
import ListController from "@/components/tweet-list-controller";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const initialTweets = await db.tweet.findMany({
    include: { user: true },
    take: 10,
    orderBy: { created_at: "desc" },
  });
  console.log(Math.ceil(initialTweets.length / 10));

  return initialTweets;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <div className="w-full h-screen bg-yellow-50 flex flex-col gap-7 justify-center items-center">
      <AddTweet />
      <ListController initialTweets={initialTweets} />
    </div>
  );
}
