import moment from "moment";

export const formatUei = (uei: string) => {
  return uei.replace(/(\d{6})(\d{4})/, "******$2");
};

export function formatPhoneNumber(phoneNumber: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  return `+1 (${cleanNumber.slice(1, 4)}) ${cleanNumber.slice(4, 7)}-${cleanNumber.slice(7, 11)}`;
}

export const formatDate = (dateString: string, format: string = "M/D/YY") => {
  const inputDate = moment(dateString, "YYYY-MM-DD");
  return inputDate.format(format);
};
