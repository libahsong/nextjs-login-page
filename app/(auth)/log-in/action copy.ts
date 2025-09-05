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
import z, { email } from "zod";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z.email(),
  username: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Username is required."
          : "Username must be a string.",
    })
    .min(USERNAME_MIN_LENGTH, "Username should be at least 5 characters long.")
    .trim()
    .toLowerCase(),
  password: z
    .string({})
    .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(PASSWORD_REGEX_NUMBER, PASSWORD_REGEX_NUMBER_ERROR),
});

export default async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000)); //pending

  const data = {
    email: formData.get("email"),
    // username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    const flattened = z.flattenError(result.error);
    return { success: result.success, errors: flattened };
  } else {
    console.log(result.data);
    return { success: result.success };
  }
}
