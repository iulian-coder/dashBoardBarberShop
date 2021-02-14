import React from "react";
import apiRoute from "../api/apiRoute";
import TableUtil from "./components/TableUtil";

import StatBox from "./components/StatBox";
import useQuery from "../api/useQuery";

function DashboardHome() {
  const { apiData } = useQuery({
    url: apiRoute.dashboard,
  });
  const dashBoardTableHeaderData = {
    bookingDate: "Date",
    bookingTime: "Time",
    status: "Status",
    client: "Client",
  };

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
                dataName="New Clients"
                reportDate={apiData.reportDate}
                dataValue={apiData.newClients}
                dataColor="bg-warning"
                dataIcon="ion ion-person-add"
                dataLink="/clients"
              />
              <StatBox
                dataName="Upcoming Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalUpcomingBookings}
                dataColor={"bg-info"}
                dataIcon="ion ion-cash"
                dataLink="/bookings"
              />
              <StatBox
                dataName="Confirmed Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalConfirmedBookings}
                dataColor="bg-success"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
              <StatBox
                dataName="Canceled Bookings"
                reportDate={apiData.reportDate}
                dataValue={apiData.totalCanceledBookings}
                dataColor="bg-danger"
                dataIcon="ion ion-stats-bars"
                dataLink="/bookings"
              />
            </div>
          )}
          <div className="card">
            {!apiData && <p>Loading...</p>}
            <div className="card-header border-transparent">
              <h3 className="card-title">Next Bookings</h3>
            </div>
            {apiData && (
              <div className="card-body p-0">
                <TableUtil
                  tableHeaderData={dashBoardTableHeaderData}
                  tableBodyData={apiData.bookingList}
                />
              </div>
            )}

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
