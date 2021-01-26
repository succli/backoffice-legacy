// Load modules
import moment from 'moment';

// Load date service
import { diffInMinutes } from './date';

/**
 * Calculate ticket's logged time from logs
 * @param {Object[]} logs 
 * @returns {String}
 */
export const getTicketLoggedTime = logs => {
  const dataTime = { hours: 0, minutes: 0};

  for (let log of logs) {
    dataTime.minutes += diffInMinutes(log.start, typeof log.end !== 'undefined' ? log.end : null);
  }

  if (dataTime.minutes > 60) {
    const extraHours = Math.floor(dataTime.minutes / 60);
    dataTime.hours = extraHours;
    dataTime.minutes -= extraHours * 60;
  }

  return moment(dataTime).format('HH:mm');
}

/**
 * Calculate ticket's logged percentage from logs and estimate hours
 * @param {Object[]} logs 
 * @param {Number} estimated 
 * @returns {Number}
 */
export const getTicketPercentage = (logs, estimated) => {
  let minutes = 0;
  
  for (let log of logs) {
    minutes += diffInMinutes(log.start, log.end ? log.end : null);
  }

  if (minutes === 0) {
    return minutes;
  }

  const estimatedInMinutes = estimated * 60

  return (minutes / estimatedInMinutes * 100).toFixed(2);
}