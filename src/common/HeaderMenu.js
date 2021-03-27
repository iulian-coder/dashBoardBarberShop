import React from "react";
import { Routes } from "../routes";

function Header() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href={Routes.HomePage.path} className="nav-link">
            {Routes.HomePage.name}
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href={Routes.Clients.path} className="nav-link">
            {Routes.Clients.name}
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href={Routes.Bookings.path} className="nav-link">
            {Routes.Bookings.name}
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href={Routes.Search.path} className="nav-link">
            {Routes.Search.name}
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href={Routes.Logout.path} className="nav-link">
            {Routes.Logout.name}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
