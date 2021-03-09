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
    return (
      <section className="content">
        <div className="error-page">
          <h3 className="headline text-success"> Authenticated</h3>
          <div className="text-center">
            <h3>Hey! You are authenticate.</h3>
            <h3>
              You may <a href="/">go to dashboard</a>
            </h3>
          </div>
        </div>
      </section>
    );
  } else {
    return <Redirect to={{ pathname: "/error", state: { detail: error } }} />;
  }
}
