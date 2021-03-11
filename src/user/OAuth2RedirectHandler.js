import React from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { ACCESS_TOKEN } from "../constants/index";

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
    return (
      <section className="content">
        <div className="error-page">
          <h3 className="headline text-success"> Unauthenticated</h3>
          <div className="text-center">
            <h3>Hey! You need to authenticated for using the app!</h3>
            <h3>
              You may go to <a href="/">login</a>
            </h3>
            {error && (
              <h3 className="text-danger">
                Error : Authentication via social media failed | {error}
              </h3>
            )}
          </div>
        </div>
      </section>
    );
  }
}
