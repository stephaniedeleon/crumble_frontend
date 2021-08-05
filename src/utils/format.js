import moment from "moment";

export const formatDateForInputDisplay = (date) => {
  const d = new Date(date)
  return moment(d).format("YYYY-MM-DD[T]HH:mm");
}

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM DD, YYYY [at] h:mm a")
}

export const formatTime = (date) => {
  const d = new Date(date)
  return moment(d).format("h:mm a")
}