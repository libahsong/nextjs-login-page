"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export function Back() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="flex justify-start w-full pb-7">
      <button onClick={onClick} className="fixed">
        <ArrowLeftIcon className="size-5" />
      </button>
    </div>
  );
}
