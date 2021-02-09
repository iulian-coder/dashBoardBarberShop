import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";
import TableUtil from "./components/TableUtil";
import formatDate from "../util/formatDate";
import { useHistory } from "react-router-dom";

function Bookings() {
  const [bookingsData, setBookingsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const numberOfResultsOnPage = 10;
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          apiRoute.bookings +
            `?page=${pageNumber}&size=${numberOfResultsOnPage}`
        )
        .then(({ data }) => {
          setBookingsData(data);
        })
        .catch((error) => {
          history.push({
            pathname: "/error",
            state: { detail: error.message },
          });
        });
    }
    fetchData();
  }, [pageNumber, history]);

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
  const bookingsTableBodyData = bookingsData.map((item) => (
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

  const tableFootData =
    bookingsData.length >= 10 && pageNumber === 0 ? (
      <tr>
        <td>
          <button className="page-link" onClick={() => handlePageNo(1)}>
            Next
          </button>
        </td>
      </tr>
    ) : bookingsData.length >= 1 && pageNumber !== 0 ? (
      <tr>
        <td>
          <button className="page-link" onClick={() => handlePageNo(-1)}>
            Back
          </button>
        </td>
      </tr>
    ) : null;

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
                  <TableUtil
                    tableHeaderData={bookingsTableHeaderData}
                    tableBodyData={bookingsTableBodyData}
                    tableFootData={tableFootData}
                  />
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
