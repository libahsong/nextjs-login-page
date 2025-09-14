"use client";

import { uploadResopnse } from "@/app/tweets/[id]/action";
import { useFormState } from "react-dom";
import Input from "./form-input";
import Button from "./form-btn";
import { startTransition, useOptimistic, useRef, useState } from "react";
import { Responses } from "@/app/tweets/[id]/page";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ResponseList } from "./response-list";

export function AddResponse({
  tweetId,
  responses,
  username,
}: {
  tweetId: number;
  responses: Responses;
  username: string;
}) {
  const uploadResopnseWithId = uploadResopnse.bind(null, tweetId);
  const [formState, action] = useFormState(uploadResopnseWithId, null);
  const ref = useRef<HTMLFormElement>(null);
  const [optimisticResponses, addOptimisticResponse] = useOptimistic(
    responses,
    (prevState, newResponse: string) => [
      {
        payload: newResponse + " (seding...)",
        id: 0,
        created_at: new Date(),
        updated_at: new Date(),
        tweetId,
        userId: 0,
        user: {
          username,
        },
      },
      ...prevState,
    ]
  );

  const handleForm = async (formData: FormData) => {
    addOptimisticResponse(formData.get("response") as string);
    console.log(optimisticResponses);
    ref.current?.reset();
    action(formData);
  };

  return (
    <div className="flex flex-col gap-10 border-b w-full">
      <div className="flex items-center gap-5 w-full">
        <UserCircleIcon className="size-10" />
        <form ref={ref} action={handleForm} className="flex gap-5">
          <Input
            type="text"
            name="response"
            placeholder="Post your reply"
            required={true}
          />
          <div className="w-2/4">
            <Button text="Reply" />
          </div>
        </form>
      </div>
      <ResponseList responses={optimisticResponses} />
    </div>
  );
}
