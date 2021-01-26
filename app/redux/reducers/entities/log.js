// Load modules
import _ from 'lodash';

// Get constants
import {
  LOG_CHECK_IN,
  LOG_CHECK_OUT,
  LOG_TICKET_IN,
  LOG_TICKET_OUT,
  GET_USER_LOGS,
  GET_FILTERED_LOGS
} from '../../constants/log';

/**
 * Log reducer
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Object}
 */
export const log = (state = { user: [], filtered: [] }, action) => {
  // Get user
  const user = state.user;

  switch (action.type) {
    case LOG_TICKET_IN:
    case LOG_CHECK_IN:
      user.push(action.payload);
      return { ...state, user};
    case LOG_TICKET_OUT:
    case LOG_CHECK_OUT:
      user[_.findIndex(user, log => log._id === action.payload._id)] = action.payload;
      return { ...state, user };
    case GET_USER_LOGS:
      return { ...state, user: action.payload };
    case GET_FILTERED_LOGS:
      return { ...state, filtered: action.payload };
    default:
      return state;
  }
}