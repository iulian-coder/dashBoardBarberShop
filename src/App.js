import React, { Fragment } from "react";
import DashboardHome from "./pages/DashboardHome";
import Footer from "./pages/common/Footer";
import Header from "./pages/common/Header";
import Menu from "./pages/common/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import AddClient from "./pages/AddClient";
import Bookings from "./pages/Bookings";
import Search from "./pages/Search";
import Page404 from "./error/Page404";
import PageError from "./error/PageError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./user/Login";
import OAuth2RedirectHandler from "./user/OAuth2RedirectHandler";
import Logout from "./user/Logout";
import Signup from "./user/Signup";
import MyProfile from "./pages/MyProfile";
import AuthProvider, { useAuthState } from "./context/auth-provider";
function App() {
  const UnauthenticatedApp = unauthenticatedRoutes();
  const AuthenticatedApp = authenticatedRoutes();

  function Home() {
    const { user } = useAuthState();
    return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  }

  const MenuItems = () => {
    const { user } = useAuthState();

    return (
      user && (
        <Fragment>
          <Header />
          <Menu />
        </Fragment>
      )
    );
  };

  return (
    <AuthProvider>
      <div className="wrapper">
        <ToastContainer />
        <MenuItems />
        <Home />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

function unauthenticatedRoutes() {
  return () => {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/oauth2/redirect"
          component={OAuth2RedirectHandler}
        />
        <Route exact path="/error" component={PageError} />
        <Route component={Page404} />
      </Switch>
    );
  };
}

function authenticatedRoutes() {
  return () => {
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
  };
}
