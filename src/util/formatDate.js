export default function formatDate(date, option) {
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
