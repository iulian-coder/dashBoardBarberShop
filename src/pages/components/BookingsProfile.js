import React from "react";
import handleBookingStatusColor from "../../util/bookingStatusColor"

function BookingsProfile({ clientDataBookings }) {


  return (
    <div className="post clearfix">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Booking_Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Created</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {clientDataBookings.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{new Date(item.bookingDate).toLocaleDateString("ro-RO")}</td>
              <td>{new Date(item.bookingDate).toLocaleTimeString("ro-RO")}</td>

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
                {new Date(item.createdDate).toLocaleDateString("ro-RO")}-
                {new Date(item.createdDate).toLocaleTimeString("ro-RO")}
              </td>
              <td>
                {new Date(item.updatedDate).toLocaleDateString("ro-RO")}-
                {new Date(item.updatedDate).toLocaleTimeString("ro-RO")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingsProfile;
