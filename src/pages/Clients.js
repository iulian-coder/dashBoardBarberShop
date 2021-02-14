import React, { useState } from "react";
import apiRoute from "../api/apiRoute";
import TableUtil from "./components/TableUtil";
import useQuery from "../api/useQuery";

function Clients() {
  const [pageNumber, setPageNumber] = useState(0);
  const numberOfResultsOnPage = 10;
  const { apiData } = useQuery({
    url: apiRoute.clients + `?page=${pageNumber}&size=${numberOfResultsOnPage}`,
  });

  const clientsTableHeaderData = [
    "First Name",
    "Last Name",
    "E-mail",
    "Phone",
    "Id",
    "Action",
  ];


  const handlePageNo = (dataPage) => {
    setPageNumber(pageNumber + dataPage);
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
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Clients</h3>
          </div>
          <div className="card-body">
            {!apiData && <p>Loading...</p>}
            {apiData && (
              <TableUtil
                tableHeaderData={clientsTableHeaderData}
                tableBodyData={apiData.map((item) => (
                  <tr key={item.clientId}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>+{item.phoneNo}</td>
                    <td>{item.clientId}</td>
                    <td align="center">
                      <a href={`/clients/${item.clientId}`}>
                        {" "}
                        <i className="fas fa-ellipsis-h" />
                      </a>
                    </td>
                  </tr>
                ))}
                tableFootData={newFunction(apiData, pageNumber, handlePageNo)}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
function newFunction(clientsData, pageNumber, handlePageNo) {
  return clientsData.length === 10 && pageNumber === 0 ? (
    <tr>
      <td>
        <button className="page-link" onClick={() => handlePageNo(1)}>
          Next
        </button>
      </td>
    </tr>
  ) : clientsData.length === 10 && pageNumber !== 0 ? (
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
  ) : clientsData.length < 10 && pageNumber !== 0 ? (
    <tr>
      <td>
        <button className="page-link" onClick={() => handlePageNo(-1)}>
          Back
        </button>
      </td>
    </tr>
  ) : null;
}
