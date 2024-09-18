import moment from "moment";

export const formatDateMMDDYYYY = (dateString: string) => {
  const ISODate = moment(dateString, "YYYY-MM-DD");
  return ISODate.format("MM/DD/YYYY");
};