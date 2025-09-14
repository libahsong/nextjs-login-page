import "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
import { LightBulbIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center w-1/4">
        <div className="flex flex-col items-center gap-7">
          <LightBulbIcon className="size-20 text-yellow-400" />
          <span className="text-2xl font-bold">Welcome To My Home Page!</span>
        </div>
        <div className="flex justify-center w-full">
          <Link
            href="/create-account"
            className="w-full bg-lime-200 rounded-full py-4 text-lg font-medium hover:bg-lime-400 text-center"
          >
            Start
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl">Do you have an account already?</span>
          <span>&rarr;</span>
          <Link href="/log-in" className="font-semibold text-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
