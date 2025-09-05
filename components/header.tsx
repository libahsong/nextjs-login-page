import getSession from "@/lib/session";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();
  return (
    <>
      {session.id ? (
        <div className="absolute flex gap-5 right-20 text-lg p-10">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
        </div>
      ) : null}
    </>
  );
}
