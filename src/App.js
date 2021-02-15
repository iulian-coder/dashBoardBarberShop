import React from "react";
import DashboardHome from "./pages/DashboardHome";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import ClientProfile from "./pages/ClientProfile";
import AddClient from "./pages/AddClient";
import Bookings from "./pages/Bookings";
import Search from "./pages/Search";
import Page404 from "./pages/Page404";
import PageError from "./pages/PageError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Menu />
        <ToastContainer />
        <Switch>
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/clients/new-client" component={AddClient} />
          <Route exact path="/clients/:id/" component={ClientProfile} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/" component={DashboardHome} />
          <Route exact path="/error" component={PageError} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
