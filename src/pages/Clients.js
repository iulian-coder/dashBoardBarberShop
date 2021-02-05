import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";

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
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
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
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Clients</h3>
          </div>
          {/* /.card-header */}
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Crt</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>E-mail</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clientsData.map((item, index) => (
                  <tr key={item.clientId}>
                    <td>{index + 1}</td>
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
                ))}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </section>
      {/* /.content */}
    </div>
  );
}

export default Clients;
