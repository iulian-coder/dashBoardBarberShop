import React from "react";

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
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/clients" className="nav-link">
            Clients
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/bookings" className="nav-link">
            Bookings
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/search" className="nav-link">
            Search
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/login" className="nav-link">
            Login
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/signup" className="nav-link">
            Signup
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/logout" className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
