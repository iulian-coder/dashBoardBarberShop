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

export const DashboardTable = ({ tableData }) => {
  const TableRow = (props) => {
    const { bookingDate, bookingStatus, client } = props;
    return (
      <tr>
        <td>{formatDate({ date: bookingDate })}</td>
        <td>{formatDate({ date: bookingDate, option: "TIME" })}</td>
        <td>
          <span
            className={`badge badge-${handleBookingStatusColor({
              bookingStatus: bookingStatus,
            })}`}
          >
            {bookingStatus}
          </span>
        </td>
        <td>
          <a href={`/clients/${client.clientId}`}>
            {" "}
            {client.firstName + " " + client.lastName}
          </a>
        </td>
      </tr>
    );
  };

  return (
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table table-bordered m-0 table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <TableRow key={item.id} {...item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ClientProfileTable = ({ tableData }) => {
  const TableRow = (props) => {
    const { bookingDate, bookingStatus, createdDate, updatedDate } = props;

    return (
      <tr>
        <td>{formatDate({ date: bookingDate })}</td>
        <td>{formatDate({ date: bookingDate, option: "TIME" })}</td>
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
            <th>Booking Date</th>
            <th>Time</th>
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

export const ClientsTable = ({ tableData }) => {
  const TableRow = (props) => {
    const {
      createdDate,
      updatedDate,
      clientId,
      firstName,
      lastName,
      email,
      phoneNo,
    } = props;

    return (
      <tr>
        <td>{clientId}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email.length > 1 ? email : "N/A"}</td>
        <td>{"+" + phoneNo}</td>
        <td>{formatDate({ date: createdDate, option: "UTC" })}</td>
        <td>{formatDate({ date: updatedDate, option: "UTC" })}</td>
        <td>
          <a href={`/clients/${clientId}`}>
            <i className="fas fa-ellipsis-h" />
          </a>
        </td>
      </tr>
    );
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered m-0 table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <TableRow key={item.clientId} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function formatDate({ date, option }) {
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
