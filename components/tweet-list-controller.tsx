"use client";

import { InitialTweets } from "@/app/(tweets)/page";
import TweetList from "./tweet-list";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { getMoreTweets } from "@/app/(tweets)/action";

interface InitialTweetsProps {
  initialTweets: InitialTweets;
}

export default function ListController({ initialTweets }: InitialTweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    const newTweets = await getMoreTweets(page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      // setTweets((prev) => [...prev, ...newTweets]);
      setTweets(newTweets);
    } else {
      setIsLastPage(true);
    }
  };
  const onLoadPrevClick = async () => {
    if (page === 0) {
      setIsLastPage(true);
      return;
    } else {
      const newTweets = await getMoreTweets(page - 1);
      setPage((prev) => prev - 1);
      setTweets(newTweets);
    }
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-1/4">
      {tweets.map((tweet) => (
        <TweetList
          key={tweet.id}
          id={tweet.id}
          tweet={tweet.tweet}
          created_at={tweet.created_at}
          username={tweet.users.username}
        />
      ))}
      <div className="w-full flex justify-between p-10">
        <button onClick={onLoadPrevClick}>
          <ArrowLeftCircleIcon className="size-10" />
        </button>
        <span>{page + 1}</span>
        <button onClick={onLoadMoreClick}>
          <ArrowRightCircleIcon className="size-10" />
        </button>
      </div>
    </div>
  );
}
