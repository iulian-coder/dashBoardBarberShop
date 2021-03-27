export const BookingsTable = ({ tableData }) => {
  const TableRow = (props) => {
    const {
      bookingDate,
      bookingStatus,
      client,
      createdDate,
      updatedDate,
      id,
    } = props;

    return (
      <tr>
        <td>{id}</td>
        <td>{formatDate({ date: bookingDate })}</td>
        <td>{formatDate({ date: bookingDate, option: "TIME" })}</td>
        <td>
          <a href={`/clients/${client.clientId}`}>
            {" "}
            {client.firstName + " " + client.lastName}
          </a>
        </td>
        <td>
          <span
            className={`badge badge-${handleBookingStatusColor({
              bookingStatus: bookingStatus,
            })}`}
          >
            {bookingStatus}
          </span>
        </td>
        <td>{formatDate({ date: createdDate, option: "UTC" })}</td>
        <td>{formatDate({ date: updatedDate, option: "UTC" })}</td>
      </tr>
    );
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered m-0 table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Client</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <TableRow key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function formatDate({ date, option }) {
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

function handleBookingStatusColor({ bookingStatus }) {
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
