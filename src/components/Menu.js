import React from "react";

function Menu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Admin</span>
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
              <a href="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>

            <li className="nav-header">Menu</li>
            <li className="nav-item">
              <a href="/clients" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Clients</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/bookings" className="nav-link">
                <i className="nav-icon far fa-calendar-alt" />
                <p>Bookings</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/search" className="nav-link">
                <i className="nav-icon fas fa-search" />
                <p>Search</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
