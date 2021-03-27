import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./user/Login";
import OAuth2RedirectHandler from "./user/OAuth2RedirectHandler";
import Signup from "./user/Signup";
import { ToastContainer } from "react-toastify";
import { Routes } from "./routes";

export default function UnauthenticatedApp() {
  return (
    <div className="wrapper">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}
function AppRoutes() {
  return (
    <Switch>
      <Route exact path={Routes.Login.path} component={Login} />
      <Route exact path={Routes.Signup.path} component={Signup} />
      <Route
        exact
        path={Routes.Oauth2.path}
        component={OAuth2RedirectHandler}
      />
      <Route path={Routes.HomePage.path} component={Login} />
    </Switch>
  );
}
