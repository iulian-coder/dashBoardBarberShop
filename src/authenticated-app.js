import React from "react";
import DashboardHome from "./pages/DashboardHome";
import Header from "./common/HeaderMenu";
import Menu from "./common/SidebarMenu";
import { Switch, Route, Redirect } from "react-router-dom";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import AddClient from "./pages/AddClient";
import Bookings from "./pages/Bookings";
import Search from "./pages/Search";
import Page404 from "./error/Page404";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./user/Logout";
import MyProfile from "./pages/MyProfile";
import { ToastContainer } from "react-toastify";
import ErrorHandler from "./error/ErrorHandler";
import { Routes } from "./routes";

export default function AuthenticatedApp() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <ToastContainer />
      <ErrorHandler>
        <AppRoutes />
      </ErrorHandler>
    </div>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path={Routes.Logout.path} component={Logout} />
      <Route exact path={Routes.Clients.path} component={Clients} />
      <Route
        exact
        path={Routes.Clients.path + "/new-client"}
        component={AddClient}
      />
      <Route
        exact
        path={Routes.Clients.path + "/:id"}
        component={ClientProfile}
      />
      <Route exact path={Routes.MyProfile.path} component={MyProfile} />
      <Route exact path={Routes.Bookings.path} component={Bookings} />
      <Route exact path={Routes.Search.path} component={Search} />
      <Route
        exact
        path={Routes.Login.path}
        render={() => (
          <Redirect
            to={{
              pathname: "/",
              state: {
                errorStatusCode: "general",
                errorMessage: "You are already logged into the application",
              },
            }}
          />
        )}
      />
      <Route
        exact
        path={Routes.Signup.path}
        render={() => (
          <Redirect
            to={{
              pathname: "/",
              state: {
                errorStatusCode: "general",
                errorMessage: "You must logout for register a new user",
              },
            }}
          />
        )}
      />
      <Route exact path={Routes.HomePage.path} component={DashboardHome} />
      <Route component={Page404} />
    </Switch>
  );
}
