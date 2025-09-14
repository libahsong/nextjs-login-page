import getSession from "@/lib/session";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Nav() {
  const session = await getSession();
  return (
    <>
      <div className="fixed h-screen w-1/4 border-r border-gray-300 flex flex-col items-end gap-5 text-xl">
        {session.id ? (
          <div className="flex flex-col gap-7 p-8 px-11">
            <Link href="/">
              <EnvelopeIcon className="size-9" />
            </Link>
            <div className="flex flex-col gap-7">
              <Link href="/">Home</Link>
              <Link href="/profile">Profile</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7 p-8 px-11">
            <Link href={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </>
  );
}
