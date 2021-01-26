// Get constants
import { ALERT_MESSAGE, ALERT_DISMISS } from '../../constants/alert';

/**
 * Trigger alert component
 * @param {String} classname 
 * @param {String} message 
 */
export const alert = (classname, message) => {
  return { type: ALERT_MESSAGE, classname, message };
}

/**
 * Dismiss alert component
 */
export const dismissAlert = () => {
  return { type: ALERT_DISMISS }
}