import React from "react";
import { Switch, Route } from "react-router-dom";
import PageError from "./error/PageError";
import Login from "./user/Login";
import OAuth2RedirectHandler from "./user/OAuth2RedirectHandler";
import Signup from "./user/Signup";

export default function UnauthenticatedApp() {
  return <AppRoutes />;
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/oauth2/redirect" component={OAuth2RedirectHandler} />
      <Route exact path="/error" component={PageError} />
      <Route path="/" component={Login} />
    </Switch>
  );
}
