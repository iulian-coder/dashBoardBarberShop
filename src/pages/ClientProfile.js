import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import FormProfileModify from "./components/ModifyProfile";
import UpcomingBookingsProfile from "./components/UpcomingBookingsProfile";
import { useHistory } from "react-router-dom";
import FormProfileAddBooking from "./components/AddBooking";
import TableUtil from "./components/TableUtil";
import handleBookingStatusColor from "../util/bookingStatusColor";
import formatDate from "../util/formatDate";
import { toast } from "react-toastify";

function ClientProfile() {
  const { id } = useParams();
  const [clientData, setClientData] = useState([]);
  const [clientDataBookings, setClientDataBookings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        await axios.get(apiRoute.clients + `/${id}`).then(({ data }) => {
          setClientData(data);
        });

        await axios
          .get(apiRoute.bookings + `/history/${id}`)
          .then(({ data }) => {
            setClientDataBookings(data);
          });
      } catch (error) {
        history.push({
          pathname: "/error",
          state: { detail: error.message },
        });
      }
    }
    fetchData();
  }, [id, history]);

  const columnsData = ["Date", "Time", "Status", "Created", "Id"];
  const rowsData = clientDataBookings.map((item) => (
    <tr key={item.id}>
      <td>{formatDate(item.bookingDate)}</td>
      <td>{formatDate(item.bookingDate, "TIME")}</td>
      <td>
        <span
          className={`badge badge-${handleBookingStatusColor(
            item.bookingStatus
          )}`}
        >
          {item.bookingStatus}
        </span>
      </td>
      <td>
        {formatDate(item.createdDate)} | {formatDate(item.createdDate, "TIME")}
      </td>
      <td>{item.id}</td>
    </tr>
  ));

  const filterBookingsData = (option) => {
    return clientDataBookings.filter((items) => items.bookingStatus === option);
  };

  const handleDeleteClient = () => {
    deleteClient(clientData.clientId)
      .then(() => {
        toast.success("Client deleted");
        history.push("/clients");
      })
      .catch((error) => {
        toast.error("Something went wrong ! Delete client");
        history.push({
          pathname: "/error",
          state: { detail: error.message },
        });
      });
  };

  // Shows notification
  if (localStorage.getItem("message")) {
    toast.success(localStorage.getItem("message"));
    localStorage.removeItem("message");
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src="../../dist/img/avatar5.png"
                      alt="Userprofile"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {clientData.firstName} - {clientData.lastName}
                  </h3>
                  <ul className="list-group list-group-unbordered mb-3">
                    <li className="list-group-item">
                      <b>E-mail</b> {clientData.email}
                    </li>
                    <li className="list-group-item">
                      <b>Phone</b> +{clientData.phoneNo}
                    </li>
                  </ul>
                  <button
                    onClick={handleDeleteClient}
                    className="btn btn-danger btn-block"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Bookings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#upcoming-bookings"
                        data-toggle="tab"
                      >
                        Upcoming Bookings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#add-booking"
                        data-toggle="tab"
                      >
                        Add Booking
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#modify-profile"
                        data-toggle="tab"
                      >
                        Modify Profile
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      <TableUtil
                        tableHeaderData={columnsData}
                        tableBodyData={rowsData}
                      />
                      <div>
                        <p>
                          Stats: {filterBookingsData("CONFIRM").length} Confirm
                          | {filterBookingsData("UPCOMING").length} Upcoming |{" "}
                          {filterBookingsData("CANCEL").length} Cancel
                        </p>
                      </div>
                    </div>
                    <div className="tab-pane" id="upcoming-bookings">
                      <UpcomingBookingsProfile
                        clientDataUpcomingBookings={filterBookingsData(
                          "UPCOMING"
                        )}
                      />
                    </div>
                    <div className="tab-pane" id="modify-profile">
                      <FormProfileModify clientId={id} />
                    </div>
                    <div className="tab-pane" id="add-booking">
                      <FormProfileAddBooking clientId={id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientProfile;

async function deleteClient(dataId) {
  const dataResponse = await axios.delete(apiRoute.clients, {
    data: { clientId: dataId },
  });
  return dataResponse.data;
}
