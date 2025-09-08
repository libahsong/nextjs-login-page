import getSession from "@/lib/session";
import Link from "next/link";

export default async function Header() {
  const session = await getSession();
  return (
    <>
      {session.id ? (
        <div className="w-full border-b flex justify-end bg-yellow-50 gap-5 text-lg p-7">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
        </div>
      ) : null}
    </>
  );
}
