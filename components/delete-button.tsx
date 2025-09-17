"use client";
import { deleteTweet } from "@/app/tweets/[id]/action";

export function DeleteBtn({ tweetId }: { tweetId: number }) {
  const deleteClick = async () => await deleteTweet(tweetId);
  return (
    <button
      onClick={deleteClick}
      className="w-full bg-red-200 px-2 rounded-full text-lg font-medium hover:bg-red-400 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      Delete
    </button>
  );
}
