import React from "react";
import { useLocation } from "react-router-dom";
import Page404 from "./Page404";
import ErrorResponse from "./ErrorResponse";

function ErrorHandler({ children }) {
  const location = useLocation();
  const { errorStatusCode, errorMessage} = location.state ? location.state : "";

  switch (errorStatusCode) {
    case 404:
      return <Page404 />;
    case 400:
      return <ErrorResponse errorMessage={errorMessage} />;
    case 500:
      return <ErrorResponse errorMessage={errorMessage} />;
    case "down":
      return <ErrorResponse errorMessage={errorMessage} />;
    default:
      return children;
  }
}

export default ErrorHandler;
