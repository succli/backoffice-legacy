// Load modules
import axios from 'axios';

// Get constants
import {
  GET_CALENDARS,
  UPDATE_CALENDAR
} from '../../constants/calendar';

// Get actions
import { alert } from '../ui/alert';

/**
 * Get all calendar from API
 */
export const getCalendars = () => {
  return (dispatch) => {
    axios.get(`/api/calendar`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_CALENDARS, payload: response.data.calendar });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data.error.message));
      });
  }
}

/**
 * Update calendar with submitted values
 * @param {Object} calendar 
 */
export const updateCalendar = calendar => {
  return (dispatch) => {
    axios.put(`/api/calendar/${calendar._id}`, calendar, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_CALENDAR, payload: response.data.calendar });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data.error.message));
      });
  }
}