import React, { useState } from "react";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";
import TableUtil from "./components/TableUtil";
import formatDate from "../util/formatDate";
import useQuery from "../api/useQuery";

function Bookings() {
  const [pageNumber, setPageNumber] = useState(0);
  const numberOfResultsOnPage = 10;
  const { apiData } = useQuery({
    url:
      apiRoute.bookings + `?page=${pageNumber}&size=${numberOfResultsOnPage}`,
  });

  const handlePageNo = (dataPage) => {
    setPageNumber(pageNumber + dataPage);
  };

  const bookingsTableHeaderData = [
    "Date",
    "Time",
    "Client",
    "Status",
    "Created",
    "Updated",
    "Id",
  ];

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Bookings</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/search">Add Booking</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Bookings</h3>
                </div>
                <div className="card-body">
                  {!apiData && <p>Loading...</p>}
                  {apiData && (
                    <TableUtil
                      tableHeaderData={bookingsTableHeaderData}
                      tableBodyData={newFunction(apiData)}
                      tableFootData={newFunction_1(
                        apiData,
                        pageNumber,
                        handlePageNo
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bookings;

function newFunction_1(bookingsData, pageNumber, handlePageNo) {
  return bookingsData.length === 10 && pageNumber === 0 ? (
    <tr>
      <td>
        <button className="page-link" onClick={() => handlePageNo(1)}>
          Next
        </button>
      </td>
    </tr>
  ) : bookingsData.length === 10 && pageNumber !== 0 ? (
    <tr>
      <td>
        <button className="page-link" onClick={() => handlePageNo(-1)}>
          Back
        </button>
      </td>
      <td>
        {" "}
        <button className="page-link" onClick={() => handlePageNo(1)}>
          Next
        </button>
      </td>
    </tr>
  ) : bookingsData.length < 10 && pageNumber !== 0 ? (
    <tr>
      <td>
        <button className="page-link" onClick={() => handlePageNo(-1)}>
          Back
        </button>
      </td>
    </tr>
  ) : null;
}

function newFunction(bookingsData) {
  return bookingsData.map((item) => (
    <tr key={item.id}>
      <td>{formatDate(item.bookingDate)}</td>
      <td>{formatDate(item.bookingDate, "TIME")}</td>
      <td>
        <a href={`/clients/${item.client.clientId}`}>
          {item.client.firstName} {item.client.lastName}
        </a>
      </td>
      <td>
        {" "}
        <span
          className={`badge badge-${handleBookingStatusColor(
            item.bookingStatus
          )}`}
        >
          {item.bookingStatus}
        </span>
      </td>
      <td>{formatDate(item.createdDate, "UTC")}</td>
      <td>{formatDate(item.updatedDate, "UTC")}</td>
      <td>{item.id}</td>
    </tr>
  ));
}
