"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const responseSchema = z.object({
  response: z.string("Response is a string").max(100, "Response is too long"),
});

export async function uploadResopnse(
  tweetId: number,
  _: any,
  formData: FormData
) {
  await new Promise((res) => setTimeout(res, 1000));
  const data = { response: formData.get("response") };
  console.log(data);
  const result = responseSchema.safeParse(data);
  if (!result.success) {
    const flattened = z.flattenError(result.error);
    return { success: result.success, errors: flattened };
  } else {
    const session = await getSession();
    if (session.id) {
      const response = await db.response.create({
        data: {
          payload: result.data.response,
          user: { connect: { id: session.id } },
          tweet: { connect: { id: tweetId } },
        },
      });
      if (response) {
        revalidateTag("add-response");
        revalidateTag("responses-count");
      }
    }
  }
}

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: { tweetId, userId: session.id! },
    });
    revalidateTag(`like-status-${tweetId}`);
    revalidateTag("call-initialTweets");
    revalidateTag("moreTweets");
  } catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: { id: { tweetId, userId: session.id! } },
    });
    revalidateTag(`like-status-${tweetId}`);
    revalidateTag("call-initialTweets");
    revalidateTag("moreTweets");
  } catch (e) {}
}

export async function customRevalidateTag(text: string) {
  return revalidateTag(text);
}

export async function deleteTweet(tweetId: number) {
  await db.tweet.delete({ where: { id: tweetId } });
  revalidateTag("call-initialTweets");
  revalidateTag("moreTweets");
  redirect("/");
}
