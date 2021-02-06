import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";
import TableUtil from "./components/TableUtil";

function DashboardHome() {
  const [dataDashboard, setDataDashboard] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await axios.get(apiRoute.bookings + `/dashboard`);
        setDataDashboard(responseData.data);
        setLatestBookings(responseData.data.latestBookings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const dashBoardTableHeaderData = ["Date", "Time", "Status", "Client"];

  const dashBoardTableBodyData = latestBookings.map((item) => (
    <tr key={item.id}>
      <td>{new Date(item.bookingDate).toLocaleDateString("ro-RO")}</td>
      <td>{new Date(item.bookingDate).toLocaleTimeString("ro-RO")}</td>
      <td>
        <span
          className={`badge badge-${handleBookingStatusColor(
            item.bookingStatus
          )}`}
        >
          {item.bookingStatus}
        </span>
      </td>
      <td>
        <a href={`/clients/${item.client.clientId}`}>
          {item.client.firstName} {item.client.lastName}
        </a>
      </td>
    </tr>
  ));

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{dataDashboard.totalClients}</h3>
                  <p>Registered Clients</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/clients" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{dataDashboard.totalUpcomingBookings}</h3>
                  <p>
                    {new Date().toLocaleDateString("en-EN", { month: "long" })}{" "}
                    Upcoming Bookings
                  </p>
                </div>
                <div className="icon">
                  <i className="ion ion-cash" />
                </div>
                <a href="/bookings" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    {dataDashboard.totalConfirmedBookings}
                    <sup style={{ fontSize: 20 }}></sup>
                  </h3>
                  <p>
                    {new Date().toLocaleDateString("en-En", { month: "long" })}{" "}
                    Bookings Confirmed
                  </p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/bookings" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}

            {/* ./col */}
            <div className="col-lg-3 col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{dataDashboard.totalCanceledBookings}</h3>
                  <p>
                    {new Date().toLocaleDateString("en-EN", { month: "long" })}{" "}
                    Bookings Canceled
                  </p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header border-transparent">
              <h3 className="card-title">Next Bookings</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <TableUtil
                tableHeaderData={dashBoardTableHeaderData}
                tableBodyData={dashBoardTableBodyData}
              />
            </div>

            <div className="card-footer clearfix">
              <a href="/search" className="btn btn-sm btn-info float-left">
                Add New Booking
              </a>
              <a
                href="/bookings"
                className="btn btn-sm btn-secondary float-right"
              >
                View All Bookings
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
