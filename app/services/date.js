// Load modules
import moment from 'moment';

/**
 * Calculate start date and end date difference and return in minutes
 * @param {String} startDate 
 * @param {String} endDate
 * @returns {Number} 
 */
export const diffInMinutes = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = endDate !== null ? moment(endDate) : moment();

  const diff = moment.duration(endDate.diff(startDate));

  return parseInt(diff.asMinutes());
}

/**
 * Get difference between log's start date and end date in hours and minutes
 * @param {Object} log
 * @returns {Object} 
 */
export const getHoursAndMinutes = (log) => {
  const end = typeof log.end !== 'undefined' ? moment(log.end) : moment();
  const duration = moment.duration(end.diff(moment(log.start)));

  return {
    hours: parseInt(duration.asHours()),
    minutes: parseInt(duration.asMinutes() - parseInt(duration.asHours()) * 60)
  }
}