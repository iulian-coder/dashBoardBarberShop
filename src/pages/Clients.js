import React, { useState } from "react";
import { ApiRoutes } from "../routes";
import useRequest from "../api/apiUtil";
import LoadingSpinner from "../common/LoadingSpinner";
import { ClientsTable } from "../components/Tables";

function Clients() {
  const [pageNumber] = useState(0);
  const numberOfResultsOnPage = 10;
  const { apiData } = useRequest({
    url:
      ApiRoutes.clients + `?page=${pageNumber}&size=${numberOfResultsOnPage}`,
  });



  

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
            {!apiData && LoadingSpinner()}
            {apiData && (
                   <ClientsTable tableData={apiData} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
// function newFunction(clientsData, pageNumber, handlePageNo) {
//   return clientsData.length === 10 && pageNumber === 0 ? (
//     <tr>
//       <td>
//         <button className="page-link" onClick={() => handlePageNo(1)}>
//           Next
//         </button>
//       </td>
//     </tr>
//   ) : clientsData.length === 10 && pageNumber !== 0 ? (
//     <tr>
//       <td>
//         <button className="page-link" onClick={() => handlePageNo(-1)}>
//           Back
//         </button>
//       </td>
//       <td>
//         {" "}
//         <button className="page-link" onClick={() => handlePageNo(1)}>
//           Next
//         </button>
//       </td>
//     </tr>
//   ) : clientsData.length < 10 && pageNumber !== 0 ? (
//     <tr>
//       <td>
//         <button className="page-link" onClick={() => handlePageNo(-1)}>
//           Back
//         </button>
//       </td>
//     </tr>
//   ) : null;
// }
