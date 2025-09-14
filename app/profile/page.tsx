import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({ where: { id: session.id } });
    if (user) {
      return user;
    }
  }
  return notFound();
}

export async function generateMetadata() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({ where: { id: session.id } });
    if (user) {
      return { title: user.username };
    }
  }
}

export default async function profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="w-full h-screen flex items-center flex-col pt-10">
      <div className="flex flex-col gap-6 justify-center items-center w-1/4">
        <div>
          <UserCircleIcon className="size-44" />
          <div className="w-full flex justify-end">
            <button className="border px-2 py-1 rounded-lg ">edit</button>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <span className="text-2xl">{user?.username}</span>
          <span className="text-2xl">{user?.email}</span>
          <form className="flex flex-col gap-5">
            <textarea className="text-lg border rounded-lg p-5">
              {user?.bio ? user.bio : "Create you bio"}
            </textarea>
            <div className="w-full text-end">
              <button className="border px-2 py-1 rounded-lg">send</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10">
        <form action={logOut}>
          <button className="border px-4 py-2 rounded-lg text-2xl">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
