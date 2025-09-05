"use client";

import Button from "@/components/form-btn";
import Input from "@/components/form-input";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import handleForm from "./action";

export default function CreateAccount() {
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
            // errors={state?.errors?.email}
            errors={state?.errors?.fieldErrors.email}
          />
          <Input
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            required={true}
            errors={state?.errors?.fieldErrors.username}
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            required={true}
            errors={state?.errors?.fieldErrors.password}
          />
          <Input
            type={"password"}
            placeholder={"Confirm Password"}
            name={"confirm_password"}
            required={true}
            errors={state?.errors?.fieldErrors.confirm_password}
          />
          <Button text={"Create Account"} />
        </form>
      </div>
    </div>
  );
}
