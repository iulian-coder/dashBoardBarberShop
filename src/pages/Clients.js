import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import TableUtil from "./components/TableUtil";

function Clients() {
  const [clientsData, setClientsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dataResponse = await axios.get(apiRoute.clients);
        setClientsData(dataResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const clientsTableHeaderData = [
    "Client_id",
    "First Name",
    "Last Name",
    "E-mail",
    "Phone",
    "Action",
  ];

  const clientsTableBodyData = clientsData.map((item) => (
    <tr key={item.clientId}>
      <td>{item.clientId}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.phoneNo}</td>
      <td>
        <a href={`/clients/${item.clientId}`}>
          {" "}
          <i className="fas fa-user-edit" />
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
