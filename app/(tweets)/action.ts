"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: { users: true },
    skip: page * 10,
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
