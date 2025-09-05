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
import z from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPasswrods = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    email: z.email(),
    username: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Username is required."
            : "Username must be a string.",
      })
      .min(
        USERNAME_MIN_LENGTH,
        "Username should be at least 5 characters long."
      )
      .trim()
      .toLowerCase(),
    password: z
      .string({})
      .min(
        PASSWORD_MIN_LENGTH,
        "Password should be at least 10 characters long."
      )
      .regex(PASSWORD_REGEX_NUMBER, PASSWORD_REGEX_NUMBER_ERROR),
    confirm_password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        "Password should be at least 10 characters long."
      ),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswrods, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export default async function handleForm(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);

  console.log(result);

  if (!result.success) {
    const flattened = z.flattenError(result.error);
    return { success: result.success, errors: flattened };
  } else {
    console.log(result.data);
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
