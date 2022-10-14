import moment from "moment";
export const formatDateDisplay = (date, separator = "/") => {
  return date && moment(date).isValid()
    ? moment(date).format("DD" + separator + "MM" + separator + "YYYY")
    : "";
};

export const formatDateDisplays = (date, separator = "-") => {
  return date && moment(date).isValid()
    ? moment(date).format("YYYY" + separator + "MM" + separator + "DD")
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

export function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
}
