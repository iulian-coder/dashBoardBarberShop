import React from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { ACCESS_TOKEN } from "../constants/index";
import { Redirect } from "react-router-dom";

export default function OAuth2RedirectHandler() {
  const location = useLocation();
  const { token } = queryString.parse(location.search);
  const { error } = queryString.parse(location.search);

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <Redirect to={{ pathname: "/error", state: { detail: error } }} />;
  }
}
