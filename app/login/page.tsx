import { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginHome() {
  return <Login />;
}
