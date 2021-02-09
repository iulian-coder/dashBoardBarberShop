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

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Menu />
        <Switch>
          <Route exact path="/clients">
            <Clients />
          </Route>
          <Route exact path="/clients/new-client">
            <AddClient />
          </Route>
          <Route
            exact
            path="/clients/:id"
            render={(id) => <ClientProfile id={id.match.params.id} />}
          />
          <Route exact path="/bookings">
            <Bookings />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/">
            <DashboardHome />
          </Route>
          <Route exact path="/error" component={PageError} />
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
