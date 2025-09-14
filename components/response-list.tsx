"use client";

import { Responses } from "@/app/tweets/[id]/page";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface ResponseListProps {
  responses: Responses;
}

export function ResponseList({ responses }: ResponseListProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      {responses.map((response) => (
        <div key={response.id} className="flex gap-3">
          <UserCircleIcon className="size-10 text-teal-700" />
          <div className="flex flex-col gap-2">
            <span className="font-medium">{response.user?.username}</span>
            <span>{response.payload}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
