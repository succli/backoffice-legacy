// Load modules
import _ from 'lodash';

// Get constants
import {
  GET_CALENDARS,
  UPDATE_CALENDAR
} from '../../constants/calendar';

/**
 * Calendar reducer
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Object}
 */
export const calendar = (state = { all: [] }, action) => {
  // Get all calendar
  const calendars = state.all;

  switch (action.type) {
    case GET_CALENDARS:
      return { ...state, all: action.payload }
    case UPDATE_CALENDAR:
      calendars[_.findIndex(calendars, calendar => calendar._id === action.payload._id)] = action.payload;
      return { ...state, all: calendars }
    default:
      return state;
  }
}