import axios from "../../api/axios";
import React from "react";
import apiRoute from "../../api/apiRoute";
import {formatDate} from "../components/tableData";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function UpcomingBookingsProfile({ clientDataUpcomingBookings }) {
  const history = useHistory();

  const handleBookingStatus = (bookingId, status) => {
    let bookingData = {
      id: bookingId,
      status: status,
    };
    changeBookingStatus(bookingData)
      .then((res) => {
        localStorage.setItem("message", `Booking ID:${res.id} updated`);
        history.go(0);
      })
      .catch((error) => {
        toast.error("Something went wrong! Change booking");
        history.push({
          pathname: "/error",
          state: { detail: error.message },
        });
      });
  };

  return (
    <div className="timeline timeline-inverse">
      {clientDataUpcomingBookings.map((item) => (
        <div key={item.id}>
          <i className="fas fa-calendar bg-primary" />
          <div className="timeline-item">
            <span className="time">
              <i className="far fa-clock" /> Created at{" "}
              {formatDate(item.createdDate, "UTC")}
            </span>
            <h3 className="timeline-header">{formatDate(item.bookingDate)}</h3>
            <div className="timeline-body">
              <ul>
                <li>Date: {formatDate(item.bookingDate, "LONG")}</li>
                <li>Time: {formatDate(item.bookingDate, "TIME")}</li>
                <li>Notes: {item.bookingNotes ? item.bookingNotes : "None"}</li>
              </ul>
            </div>
            <div className="timeline-footer">
              <button
                onClick={() => handleBookingStatus(item.id, "confirm")}
                className="btn btn-primary btn-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => handleBookingStatus(item.id, "cancel")}
                className="btn btn-danger btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <i className="far fa-clock bg-gray" />
      </div>
    </div>
  );
}

export default UpcomingBookingsProfile;

async function changeBookingStatus(data) {
  const responseData = await axios.put(apiRoute.bookings, data);
  return responseData.data;
}
