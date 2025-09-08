"use client";

import { useFormState } from "react-dom";
import Button from "./form-btn";
import { uploadTweet } from "@/app/(tweets)/action";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div className="flex justify-center items-center w-1/4">
      <form
        action={action}
        className="w-full flex flex-col gap-5 justify-center items-center p-5"
      >
        <input
          placeholder="Write your tweet"
          name="tweet"
          type="text"
          className="py-4 pl-12 rounded-full w-full ring outline-transparent focus:ring-offset-2 ring-gray-300 focus:outline-gray-300"
        />
        {state?.errors?.fieldErrors?.tweet
          ? state?.errors?.fieldErrors?.tweet.map((error, index) => (
              <span key={index} className="text-red-500 font-light text-base">
                {error}
              </span>
            ))
          : null}
        <div className="w-full flex justify-end">
          <div className="w-1/4">
            <Button text="Post" />
          </div>
        </div>
      </form>
    </div>
  );
}
