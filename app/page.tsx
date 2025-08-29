import { Metadata } from "next";
import Login from "./login/login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginHome() {
  return <Login />;
}
