import React, { Fragment } from "react";
import DashboardHome from "./pages/DashboardHome";
import Header from "./pages/common/Header";
import Menu from "./pages/common/Menu";
import { Switch, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import AddClient from "./pages/AddClient";
import Bookings from "./pages/Bookings";
import Search from "./pages/Search";
import Page404 from "./error/Page404";
import PageError from "./error/PageError";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./user/Logout";
import MyProfile from "./pages/MyProfile";

export default function AuthenticatedApp() {
  return (
    <Fragment>
      <Header />
      <Menu />
      <AppRoutes />
    </Fragment>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/clients/new-client" component={AddClient} />
      <Route exact path="/clients/:id/" component={ClientProfile} />
      <Route exact path="/my-profile" component={MyProfile} />
      <Route exact path="/bookings" component={Bookings} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/" component={DashboardHome} />
      <Route exact path="/error" component={PageError} />
      <Route component={Page404} />
    </Switch>
  );
}
