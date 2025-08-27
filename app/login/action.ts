"use server";

export default async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (password !== "12345") {
    return {
      errors: {
        messages: ["Wrong password!"],
        errorStatus: true,
        errorName: "password",
      },
    };
  }
  if (password === "12345") {
    return { success: "Welcome!" };
  }

  return null;
}
