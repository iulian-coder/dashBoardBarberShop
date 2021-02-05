import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import handleBookingStatusColor from "../util/bookingStatusColor";

function Bookings() {
  const [bookingsData, setBookingsData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const pageNoResults = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await axios.get(
          apiRoute.bookings + `?page=${pageNo}&size=${pageNoResults}`
        );
        setBookingsData(responseData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [pageNo]);

  const handlePageNo = (dataPage) => {
    setPageNo(pageNo + dataPage);
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
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
                  <table id="example2" className="table">
                    <thead>
                      <tr>
                        <th>Booking_Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>
                            {new Date(item.bookingDate).toLocaleDateString(
                              "ro-RO"
                            )}
                          </td>
                          <td>
                            {new Date(item.bookingDate).toLocaleTimeString(
                              "ro-RO"
                            )}
                          </td>
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
                          <td>{new Date(item.createdDate).toUTCString()}</td>
                          <td>{new Date(item.updatedDate).toUTCString()}</td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        {bookingsData.length >= 10 && (
                          <td>
                            <button
                              className="page-link"
                              onClick={() => handlePageNo(1)}
                            >
                              Next
                            </button>
                          </td>
                        )}
                        {pageNo >= 1 && (
                          <td>
                            <button
                              className="page-link"
                              onClick={() => handlePageNo(-1)}
                            >
                              Back
                            </button>
                          </td>
                        )}
                      </tr>
                    </tfoot>
                  </table>
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
