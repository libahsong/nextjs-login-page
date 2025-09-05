import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: { users: true },
  });
  return tweet;
}

export default async function Tweet({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);

  return (
    <div className="w-full h-screen bg-yellow-50 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center w-1/4">
        <span>{tweet?.tweet}</span>
        <div>
          <span>user : </span>
          <span className="">{tweet?.users.username}</span>
        </div>
        <span>
          {tweet?.created_at.toLocaleString("ko-KR", { timeZone: "UTC" })}
        </span>
      </div>
    </div>
  );
}
