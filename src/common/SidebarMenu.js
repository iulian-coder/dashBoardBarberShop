import React from "react";
import { useAuthState } from "../context/auth-provider";
import {Routes} from "../routes";

function Menu() {
  const { user } = useAuthState();

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src={user.imageUrl ? user.imageUrl : "/dist/img/AdminLTELogo.png"}
          alt="User Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">{user.name}</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href={Routes.HomePage.path} className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>

            <li className="nav-header">Menu</li>
            <li className="nav-item">
              <a href={Routes.Clients.path} className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>{Routes.Clients.name}</p>
              </a>
            </li>
            <li className="nav-item">
              <a href={Routes.Bookings.path} className="nav-link">
                <i className="nav-icon far fa-calendar-alt" />
                <p>{Routes.Bookings.name}</p>
              </a>
            </li>
            <li className="nav-item">
              <a href={Routes.Search.path} className="nav-link">
                <i className="nav-icon fas fa-search" />
                <p>{Routes.Search.name}</p>
              </a>
            </li>
            <li className="nav-item">
              <a href={Routes.MyProfile.path} className="nav-link">
                <i className="nav-icon far fa-user-circle" />
                <p>{Routes.MyProfile.name}</p>
              </a>
            </li>
            <li className="nav-item">
              <a href={Routes.Logout.path} className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>{Routes.Logout.name}</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
