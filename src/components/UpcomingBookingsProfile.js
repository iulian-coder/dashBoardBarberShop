import React from "react";
import { ApiRoutes } from "../routes";
import { UsePut } from "../api/apiUtil.js";
import { formatDate } from "../components/Tables";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function UpcomingBookingsProfile({ clientDataUpcomingBookings }) {
  const history = useHistory();
  const handleBookingStatus = (bookingId, status) => {
    let bookingData = {
      id: bookingId,
      status: status,
    };
    UsePut({ url: ApiRoutes.bookings, params: bookingData })
      .then((res) => {
        localStorage.setItem("message", `Booking ID:${res.id} updated`);
        history.go(0);
      })
      .catch((error) => {
        toast.error("Something went wrong! Change booking");
        toast.error(error.message);
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
              {formatDate({ date: item.createdDate, option: "UTC" })}
            </span>
            <h3 className="timeline-header">
              {formatDate({ date: item.bookingDate })}
            </h3>
            <div className="timeline-body">
              <ul>
                <li>
                  Date: {formatDate({ date: item.bookingDate, option: "LONG" })}
                </li>
                <li>
                  Time: {formatDate({ date: item.bookingDate, option: "TIME" })}
                </li>
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
