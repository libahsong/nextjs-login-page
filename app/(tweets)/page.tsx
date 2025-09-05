import ListController from "@/components/tweet-list-controller";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const initialTweets = await db.tweet.findMany({
    include: { users: true },
    take: 10,
    orderBy: { created_at: "desc" },
  });
  console.log(Math.ceil(initialTweets.length / 10));

  return initialTweets;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return <ListController initialTweets={initialTweets} />;
}
