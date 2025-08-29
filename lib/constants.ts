export const EMAIL_REGEX = new RegExp(/^([a-z0-9_\.-]+)@zod\.com$/);
export const EMAIL_REGEX_ERROR = "Only @zod.com emails are allowed.";
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(
  /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{10,})\S$/
);
export const PASSWORD_REGEX_NUMBER = new RegExp(
  /^((?=\S*?[a-z])(?=\S*?[0-9]).{10,})\S$/
);

export const PASSWORD_REGEX_NUMBER_ERROR =
  "Passwords should contain at least one number(0123456789).";
