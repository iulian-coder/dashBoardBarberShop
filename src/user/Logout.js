import { ACCESS_TOKEN } from "../constants";
import { Redirect } from "react-router-dom";

export default function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.setItem("message", "You're safely logged out!");
  return <Redirect to={{ pathname: "/login" }} />;
}
