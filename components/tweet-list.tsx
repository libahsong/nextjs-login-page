import Link from "next/link";

interface TweetListProps {
  id: number;
  tweet: string;
  created_at: Date;
  username: string;
}

export default function TweetList({
  id,
  tweet,
  created_at,
  username,
}: TweetListProps) {
  return (
    <div key={id} className="flex gap-10">
      <span>{id}</span>
      <Link href={`/tweets/${id}`}>
        <span>{tweet.slice(0, 9)}...</span>
      </Link>
      <span>{username}</span>
      <div className="flex gap-1">
        <span>{created_at.toLocaleString("ko-KR", { timeZone: "UTC" })}</span>
      </div>
    </div>
  );
}
