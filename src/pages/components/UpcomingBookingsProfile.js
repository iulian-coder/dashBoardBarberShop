import axios from "../../api/axios";
import React from "react";
import apiRoute from "../../api/apiRoute";

function UpcomingBookingsProfile({ clientDataUpcomingBookings }) {
  const handleBookingStatus = (bookingId, status) => {
    let bookingData = {
      id: bookingId,
      status: status,
    };
    changeBookingStatus(bookingData)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
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
              {new Date(item.createdDate).toUTCString()}
            </span>
            <h3 className="timeline-header">
              {new Date(item.bookingDate).toLocaleDateString("ro-RO")}
            </h3>
            <div className="timeline-body">
              <ul>
                <li>
                  Date:{" "}
                  {new Date(item.bookingDate).toLocaleDateString("ro-RO", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
                <li>
                  Time: {new Date(item.bookingDate).toLocaleTimeString("ro-RO")}
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

async function changeBookingStatus(data) {
  try {
    const responseData = await axios.put(apiRoute.bookings, data);
    return responseData.data;
  } catch (error) {
    console.log(error);
  }
}
