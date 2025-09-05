"use server";

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX_NUMBER,
  PASSWORD_REGEX_NUMBER_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import z, { check, email } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist"),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is requried"
          : "Password is a string",
    })
    .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(PASSWORD_REGEX_NUMBER, PASSWORD_REGEX_NUMBER_ERROR),
});

export default async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    // username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const flattened = z.flattenError(result.error);
    return { success: result.success, errors: flattened };
  } else {
    console.log(result.data);
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: { id: true, password: true },
    });
    console.log(user);
    const ok = await bcrypt.compare(
      result.data.password,
      user?.password ?? "xxx"
    );

    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        success: false,
        errors: { fieldErrors: { password: ["Wrong password."], email: [] } },
      };
    }
  }
}
