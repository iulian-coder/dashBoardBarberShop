import React from "react";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";
import TableUtil from "./components/TableUtil";
import formatDate from "../util/formatDate";
import StatBox from "./components/StatBox";
import useQuery from "../api/useQuery";

function DashboardHome() {
  const { apiData } = useQuery({
    url: apiRoute.dashboard,
  });
  const dashBoardTableHeaderData = ["Date", "Time", "Status", "Client"];

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
          {!apiData && <p>Loading...</p>}
          {apiData && (
            <div className="row">
              <StatBox
                dataName={`${formatDate(
                  apiData.reportDate,
                  "MONTH"
                )} New Clients`}
                dataValue={apiData.newClients}
                dataColor="bg-warning"
                dataIcon="ion ion-person-add"
                dataLink="/clients"
              />
              <StatBox
                dataName={`${formatDate(
                  apiData.reportDate,
                  "MONTH"
                )} Upcoming Bookings`}
                dataValue={apiData.totalUpcomingBookings}
                dataColor={"bg-info"}
                dataIcon="ion ion-cash"
                dataLink="/bookings"
              />
              <StatBox
                dataName={`${formatDate(
                  apiData.reportDate,
                  "MONTH"
                )} Confirmed Bookings`}
                dataValue={apiData.totalConfirmedBookings}
                dataColor="bg-success"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
              <StatBox
                dataName={`${formatDate(
                  apiData.reportDate,
                  "MONTH"
                )} Canceled Bookings`}
                dataValue={apiData.totalCanceledBookings}
                dataColor="bg-danger"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
            </div>
          )}
          <div className="card">
            <div className="card-header border-transparent">
              <h3 className="card-title">
                Next Bookings {formatDate(new Date(), "MONTH")}
              </h3>
            </div>
            <div className="card-body p-0">
              {!apiData && <p>Loading...</p>}
              {apiData && (
                <TableUtil
                  tableHeaderData={dashBoardTableHeaderData}
                  tableBodyData={newFunction(apiData.bookingList)}
                />
              )}
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

function newFunction(nextBookings) {
  return nextBookings.map((item) => (
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
}
