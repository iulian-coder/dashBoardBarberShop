import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import TableUtil from "./components/TableUtil";
import { useHistory } from "react-router-dom";

function Clients() {
  const [clientsData, setClientsData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(apiRoute.clients)
        .then(({ data }) => {
          setClientsData(data);
        })
        .catch((error) => {
          history.push({
            pathname: "/error",
            state: { detail: error.message },
          });
        });
    }
    fetchData();
  }, [history]);

  const clientsTableHeaderData = [
    "First Name",
    "Last Name",
    "E-mail",
    "Phone",
    "Id",
    "Action",
  ];

  const clientsTableBodyData = clientsData.map((item) => (
    <tr key={item.clientId}>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phoneNo}</td>
      <td>{item.clientId}</td>
      <td align="center">
        <a href={`/clients/${item.clientId}`}>
          {" "}
          <i className="fas fa-ellipsis-h" />
        </a>
      </td>
    </tr>
  ));

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
            <TableUtil
              tableBodyData={clientsTableBodyData}
              tableHeaderData={clientsTableHeaderData}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
