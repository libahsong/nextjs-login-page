"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

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

const tweetSchema = z.object({
  tweet: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Tweet is requried" : "Tweet is a string",
    })
    .min(5, "Tweet should be at least 10 characters long"),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = { tweet: formData.get("tweet") };
  const result = tweetSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    const flattened = z.flattenError(result.error);
    return { success: result.success, errors: flattened };
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          userId: session.id,
        },
        select: { id: true },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
