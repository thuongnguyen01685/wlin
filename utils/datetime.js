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

export function formatDate(time, string) {
  let dateNow = new Date(formatDateDisplays(time));
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let dayofweek = dateNow.getDay();

  const dayname = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  if (string === "thang") return month;
  if (string === "ngay") return day;
  if (string === "thu") return dayname[dayofweek];
}

export function formatCash(str) {
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ".") + prev;
    });
}
