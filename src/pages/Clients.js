import React, { useState } from "react";
import { ApiRoutes } from "../routes";
import useRequest from "../api/apiUtil";
import LoadingSpinner from "../common/LoadingSpinner";
import { ClientsTable } from "../components/Tables";

function Clients() {
  const [pageNumber, setPageNumber] = useState(0);

  const [numberOfResultsOnPage, setNumberOfResultsOnPage] = useState(10);
  const { apiData } = useRequest({
    url:
      ApiRoutes.clients + `?page=${pageNumber}&size=${numberOfResultsOnPage}`,
  });

  const handlePageNumber = (props) => {
    setPageNumber(pageNumber + props);
  };

  const handleRowChange = (event) => {
    setNumberOfResultsOnPage(event.target.value);
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Clients</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/clients/new-client">Add Client</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      {!apiData && LoadingSpinner()}

      {apiData && (
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                Total Clients {apiData.totalElements}
              </h3>
              <div className="float-right">
                <select onChange={handleRowChange}>
                  <option value={10}>10</option>
                  <option value={5}>5</option>
                  <option value={20}>20</option>
                </select>{" "}
                rows per page
              </div>
            </div>
            <div className="card-body">
              <ClientsTable tableData={apiData.content} />
              <div className="fixed-table-pagination">
                <div className="float-left">
                  Showing {apiData.pageable.offset} to{" "}
                  {apiData.pageable.offset + apiData.numberOfElements} of{" "}
                  {apiData.totalElements} entries
                </div>
                <div className="float-right">
                  <ul className="pagination">
                    {apiData.first === false && (
                      <li>
                        <button
                          className="page-link"
                          onClick={() => handlePageNumber(-1)}
                        >
                          ‹
                        </button>
                      </li>
                    )}

                    {apiData.last === false && (
                      <li>
                        <button
                          className="page-link"
                          onClick={() => handlePageNumber(1)}
                        >
                          ›
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Clients;
