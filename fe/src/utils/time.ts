const padLeadingZeros = (num: number, size: number) => {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

type TimeVariant = "full" | "hhmmss";

export const timeConverter = (
  UNIX_timestamp: number | string,
  variant: TimeVariant = "full"
) => {
  let timestamp =
    typeof UNIX_timestamp === "string"
      ? parseInt(UNIX_timestamp)
      : UNIX_timestamp;
  var a = new Date(timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = padLeadingZeros(a.getDate(), 2);
  var hour = padLeadingZeros(a.getHours(), 2);
  var min = padLeadingZeros(a.getMinutes(), 2);
  var sec = padLeadingZeros(a.getSeconds(), 2);
  let time;
  switch (variant) {
    case "full":
      time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      break;
    case "hhmmss":
      time = hour + ":" + min + ":" + sec;

      break;

    default:
      break;
  }
  return time;
};
