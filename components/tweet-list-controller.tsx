"use client";

import { InitialTweets } from "@/app/(tweets)/page";
import TweetList from "./tweet-list";
import { useEffect, useRef, useState } from "react";
import { getCachedMoreTweets, getMoreTweets } from "@/app/(tweets)/action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InitialTweetsProps {
  initialTweets: InitialTweets;
}

export default function ListController({ initialTweets }: InitialTweetsProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  // const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  const trigger = useRef<HTMLSpanElement>(null);
  const params = useSearchParams();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const initialPage = Number(params.get("page"));
    console.log("page", page, "params", initialPage);
    console.log("tweets", tweets);

    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          router.push(`/?page=${page + 1}`, { scroll: false });
          // const newTweets = await getMoreTweets(page + 1);
          const newTweets = await getCachedMoreTweets(page + 1);
          if (newTweets.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...newTweets]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);
  // }, []);

  useEffect(() => {
    console.log("scroll useEffect start", sessionStorage.getItem("scrollY"));

    function savePosition() {
      const restorePosition = sessionStorage.getItem("scrollY") || "{}";
      if (sessionStorage.getItem("scrollY")) {
        sessionStorage.setItem(
          "scrollY",
          JSON.stringify(sessionStorage.getItem("scrollY"))
        );
      }
      if (restorePosition) {
        sessionStorage.setItem("scrollY", window.scrollY.toString());
      }
    }
    const restorePosition = sessionStorage.getItem("scrollY");
    if (restorePosition) {
      console.log("restorePosition first arrived", restorePosition);
      console.log("restorePosition first arrived", Number(restorePosition));
      window.scrollTo(0, Number(restorePosition));
    }
    window.addEventListener("scrollend", savePosition);
    return () => {
      window.removeEventListener("scrollend", savePosition);
    };
  }, []);

  return (
    <div className="flex flex-col gap-16 justify-center items-center w-1/4">
      {tweets.map((tweet) => (
        <TweetList
          key={tweet.id}
          id={tweet.id}
          tweet={tweet.tweet}
          created_at={tweet.created_at}
          username={tweet.user.username}
          userId={tweet.user.id}
          views={tweet.views}
          counts={tweet._count?.responses}
          likeCounts={tweet._count.likes}
          likes={tweet.likes}
        />
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          className="mb-10 text-sm font-semibold bg-white w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  );
}
