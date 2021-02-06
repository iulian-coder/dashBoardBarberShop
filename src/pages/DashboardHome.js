import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";
import TableUtil from "./components/TableUtil";
import formatDate from "../util/formatDate";
import StatBox from "./components/StatBox";

function DashboardHome() {
  const [dataDashboard, setDataDashboard] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await axios.get(apiRoute.dashboard);
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
      <td>{formatDate(item.bookingDate)}</td>
      <td>{formatDate(item.bookingDate, "TIME")}</td>
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
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <StatBox
              dataName="Registered Clients"
              dataValue={dataDashboard.totalClients}
              dataColor="bg-warning"
              dataIcon="ion ion-person-add"
              dataLink="/clients"
            />
            <StatBox
              dataName={`${formatDate(
                dataDashboard.reportDate,
                "MONTH"
              )} Upcoming Bookings`}
              dataValue={dataDashboard.totalUpcomingBookings}
              dataColor={"bg-info"}
              dataIcon="ion ion-cash"
              dataLink="/bookings"
            />
            <StatBox
              dataName={`${formatDate(
                dataDashboard.reportDate,
                "MONTH"
              )} Confirmed Bookings`}
              dataValue={dataDashboard.totalConfirmedBookings}
              dataColor="bg-success"
              dataIcon="ion ion-stats-bars"
              dataLink="/bookings"
            />
            <StatBox
              dataName={`${formatDate(
                dataDashboard.reportDate,
                "MONTH"
              )} Canceled Bookings`}
              dataValue={dataDashboard.totalCanceledBookings}
              dataColor="bg-danger"
              dataIcon="ion ion-stats-bars"
              dataLink="/bookings"
            />
          </div>

          <div className="card">
            <div className="card-header border-transparent">
              <h3 className="card-title">Next Bookings</h3>
            </div>
            <div className="card-body p-0">
              <TableUtil
                tableHeaderData={dashBoardTableHeaderData}
                tableBodyData={dashBoardTableBodyData}
              />
            </div>
            <div className="card-footer">
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
