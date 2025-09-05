"use client";

import Button from "@/components/form-btn";
import Input from "@/components/form-input";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import handleForm from "./action";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="w-full h-screen bg-yellow-50 flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center w-1/4">
        <div>
          <LightBulbIcon className="size-20 text-yellow-400" />
        </div>
        <form action={action} className="flex flex-col gap-5 text-lg w-full">
          <Input
            type="text"
            placeholder="Email"
            name="email"
            required={true}
            errors={state?.errors?.fieldErrors.email}
          />
          {/* <Input
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            required={true}
            errors={state?.errors?.fieldErrors.username}
          /> */}
          <Input
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            required={true}
            errors={state?.errors?.fieldErrors.password}
          />
          <Button text={"Login"} />
        </form>
        {/* {state?.success ? ( */}
        {state?.success === true ? (
          <div className="w-full bg-green-600 py-3 rounded-lg text-lg flex items-center justify-center gap-2">
            <CheckCircleIcon className="size-6" />
            <span>Welcome!</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
