export default function handleBookingStatusColor(bookingStatus) {
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
