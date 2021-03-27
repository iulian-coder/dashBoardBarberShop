import React, { useState } from "react";
import apiRoute from "../api/apiRoutes";
import useRequest from "../api/apiUtil";
import LoadingSpinner from "./common/LoadingSpinner";
import { BookingsTable } from "../components/Tables";

export default function Bookings() {
  const [pageNumber] = useState(0);
  const numberOfResultsOnPage = 10;
  const { apiData } = useRequest({
    url:
      apiRoute.bookings + `?page=${pageNumber}&size=${numberOfResultsOnPage}`,
  });

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
                  {!apiData && LoadingSpinner()}
                  {apiData && <BookingsTable tableData={apiData} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
