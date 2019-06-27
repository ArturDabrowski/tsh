import moment from 'moment';

const getFormattedDate = (date) => moment(date).format('DD MMM, YYYY');

export { getFormattedDate }