import moment from "moment";
export const formatDateDisplay = (date, separator = "/") => {
  return date && moment(date).isValid()
    ? moment(date).format("DD" + separator + "MM" + separator + "YYYY")
    : "";
};

export const formatTimeDisplay = (date, showSeconds = false) => {
  return date && moment(date).isValid()
    ? moment(date).format("HH:mm" + (showSeconds ? ":ss" : ""))
    : "";
};

export const formatDateTimeDisplay = (
  date,
  separator = "/",
  showSeconds = true
) => {
  return date && moment(date).isValid()
    ? formatDateDisplay(date, separator) +
        "  " +
        formatTimeDisplay(date, showSeconds)
    : "";
};
