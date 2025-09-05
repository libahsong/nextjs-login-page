import db from "@/lib/db";
import getSession from "@/lib/session";
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

export default async function profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="w-full h-screen bg-yellow-50 flex justify-center items-center flex-col">
      <div className="flex flex-col gap-6 justify-center items-center w-1/4">
        <div>AVATAR</div>
        <div className="flex flex-col">
          <span>{user?.username}</span>
          <span>{user?.email}</span>
          <span>{user?.bio ? user.bio : "Create you bio"}</span>
        </div>
      </div>
      <div className="mt-10">
        <form action={logOut}>
          <button>Log out</button>
        </form>
      </div>
    </div>
  );
}
