import React from "react";
import { useParams } from "react-router-dom";
import apiRoute from "../api/apiRoutes";
import { UseDelete } from "../api/apiUtil";
import FormProfileModify from "../components/ModifyClientProfile";
import UpcomingBookingsProfile from "../components/UpcomingBookingsProfile";
import { useHistory } from "react-router-dom";
import FormProfileAddBooking from "../components/AddBooking";
import TableUtil from "../components/TableUtil";
import { toast } from "react-toastify";
import useRequest from "../api/apiUtil.js";
import LoadingSpinner from "./common/LoadingSpinner";

function ClientProfile() {
  const { id } = useParams();
  const { apiData } = useRequest({ url: apiRoute.clients + `/${id}` });
  const history = useHistory();

  const columnsData = {
    bookingDate: "Date",
    bookingTime: "Time",
    status: "Status",
    createdDate: "Created",
    id: "Id",
  };

  const handleDeleteClient = (clientId) => {
    let dataToDelete = { clientId: clientId };
    UseDelete({ url: apiRoute.clients, params: dataToDelete })
      .then(() => {
        toast.success("Client deleted");
        history.push("/clients");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong ! Client Profile");
          toast.error(error.message);
        }
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
              <h1>Client Profile</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                {!apiData && LoadingSpinner()}
                {apiData && (
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../dist/img/avatar5.png"
                        alt="User-profile"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {apiData.firstName} - {apiData.lastName}
                    </h3>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>E-mail:</b> {apiData.email ? apiData.email : "N/A"}
                      </li>
                      <li className="list-group-item">
                        <b>Phone:</b> +{apiData.phoneNo}
                      </li>
                    </ul>
                    <button
                      onClick={() => handleDeleteClient(apiData.clientId)}
                      className="btn btn-danger btn-block"
                    >
                      Delete
                    </button>
                  </div>
                )}
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
                {!apiData && LoadingSpinner()}
                {apiData && (
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        <TableUtil
                          tableHeaderData={columnsData}
                          tableBodyData={apiData.bookingList}
                        />
                        <div>
                          <p>
                            Stats:{" "}
                            {
                              filterBookings(apiData.bookingList, "CONFIRM")
                                .length
                            }{" "}
                            Confirm |{" "}
                            {
                              filterBookings(apiData.bookingList, "UPCOMING")
                                .length
                            }{" "}
                            Upcoming |{" "}
                            {
                              filterBookings(apiData.bookingList, "CANCEL")
                                .length
                            }{" "}
                            Cancel
                          </p>
                        </div>
                      </div>
                      <div className="tab-pane" id="upcoming-bookings">
                        <UpcomingBookingsProfile
                          clientDataUpcomingBookings={filterBookings(
                            apiData.bookingList,
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientProfile;

function filterBookings(data, option) {
  const result = data.filter((item) => item.bookingStatus === option);

  return result;
}
