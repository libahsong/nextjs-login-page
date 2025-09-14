"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/action";
import { startTransition, useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export function LikeButton({ isLiked, likeCount, tweetId }: LikeButtonProps) {
  const [optimisticLikeState, optimisticLikeFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState, payload) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );
  const onClick = async () => {
    startTransition(async () => optimisticLikeFn(undefined));
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <>
      <button
        onClick={async () => {
          onClick();
        }}
        className="flex items-center text-gray-500 hover:text-red-700"
      >
        {optimisticLikeState.isLiked ? (
          <HeartIcon className="size-5 text-red-700" />
        ) : (
          <HeartIconOutline className="size-5 " />
        )}
      </button>
      <span>{optimisticLikeState.likeCount}</span>
    </>
  );
}
