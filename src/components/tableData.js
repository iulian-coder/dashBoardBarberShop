const tableData = (typeData, data) => {
  switch (typeData) {
    case "client":
      return (
        <a href={`/clients/${data.client.clientId}`}>
          {data.client.firstName} {data.client.lastName}
        </a>
      );
    case "bookingTime":
      return formatDate(data.bookingDate, "TIME");
    case "bookingDate":
      return formatDate(data[typeData]);
    case "status":
      return (
        <span
          className={`badge badge-${handleBookingStatusColor(
            data.bookingStatus
          )}`}
        >
          {data.bookingStatus}
        </span>
      );
    case "id":
      return data[typeData];
    case "firstName":
      return data[typeData];
    case "lastName":
      return data[typeData];
    case "clientId":
      return data[typeData];
    case "email":
      return data[typeData];
    case "phoneNo":
      return "+" + data[typeData];
    case "createdDate":
      return formatDate(data[typeData], "UTC");
    case "updatedDate":
      return formatDate(data[typeData], "UTC");
    case "action":
      return (
        <a href={`/clients/${data.clientId}`}>
          {" "}
          <i className="fas fa-ellipsis-h" />
        </a>
      );
    default:
      return "Error showing data on table";
  }
};

export default tableData;

function handleBookingStatusColor(bookingStatus) {
  switch (bookingStatus) {
    case "UPCOMING":
      return "primary";
    case "CANCEL":
      return "danger";
    case "CONFIRM":
      return "success";
    default:
      return "light";
  }
}

export function formatDate(date, option) {
  const dateToFormat = new Date(date);
  switch (option) {
    case "TIME":
      return dateToFormat.toLocaleTimeString("ro-RO");
    case "UTC":
      return dateToFormat.toUTCString();
    case "MONTH":
      return dateToFormat.toLocaleDateString("en-EN", { month: "long" });
    case "LONG":
      return dateToFormat.toLocaleDateString("ro-RO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    default:
      return dateToFormat.toLocaleDateString("ro-RO");
  }
}
