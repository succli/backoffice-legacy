// Get constants
import { ALERT_MESSAGE, ALERT_DISMISS } from '../../constants/alert';

/**
 * Alert reducer
 * @param {Object} state 
 * @param {Object} action
 * @returns {Object} 
 */
export const alert = (state = { classname: null, message: null }, action) => {
  switch (action.type) {
    case ALERT_MESSAGE:
      return { ...state, classname: action.classname, message: action.message };
    case ALERT_DISMISS:
      return { ...state, classname: null, message: null };
    default:
      return state;
  }
}