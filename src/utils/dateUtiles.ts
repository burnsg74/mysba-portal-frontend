import moment from 'moment';

export const formatDateMMDDYYYY = (dateString: moment.MomentInput) => {
  return moment(dateString).format("MM/DD/YYYY");
};