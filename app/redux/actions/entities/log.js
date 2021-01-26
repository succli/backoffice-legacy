// Load modules
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

// Get constants
import {
  LOG_CHECK_IN,
  LOG_CHECK_OUT,
  LOG_TICKET_IN,
  LOG_TICKET_OUT,
  GET_USER_LOGS,
  GET_FILTERED_LOGS
} from '../../constants/log';

// Get actions
import { alert } from '../ui/alert';

/**
 * Create log for check in by user ID
 * @param {String} userId 
 */
export const checkIn = userId => {
  return (dispatch) => {
    axios.post('/api/logs/', {
      start: new Date(),
      user: userId
    }, { 
      headers: { 'Authorization': localStorage.getItem('token') } 
    }).then(response => {
      dispatch({ type: LOG_CHECK_IN, payload: response.data.log });
    }).catch(error => {
      dispatch(alert('danger', error.response.data));
    });
  }
}

/**
 * Check out with updating current check in by ID
 * @param {String} activeId 
 */
export const checkOut = activeId => {
  return (dispatch) => {
    axios.put(`/api/logs/${activeId}`, {
      end: new Date()
    }, { 
      headers: { 'Authorization': localStorage.getItem('token') } 
    }).then(response => {
      dispatch({ type: LOG_CHECK_OUT, payload: response.data.log });
    }).catch(error => {
      dispatch(alert('danger', error.response.data));
    });
  }
}

/**
 * Create ticket log by ticket ID and user ID
 * @param {String} ticket 
 * @param {String} user 
 */
export const logIn = (ticket, user) => {
  return (dispatch) => {
    axios.post('/api/logs/', {
      start: new Date(),
      user,
      ticket
    }, { 
      headers: { 'Authorization': localStorage.getItem('token') } 
    }).then(response => {
      dispatch({ type: LOG_TICKET_IN, payload: response.data.log });
    }).catch(error => {
      dispatch(alert('danger', error.response.data));
    });
  }
}

/**
 * Log out from ticket with updating current log in by ID
 * @param {String} id 
 */
export const logOut = id => {
  return (dispatch) => {
    axios.put(`/api/logs/ticket/${id}`, {
      end: new Date()
    }, { 
      headers: { 'Authorization': localStorage.getItem('token') } 
    }).then(response => {
      dispatch({ type: LOG_TICKET_OUT, payload: response.data.log });
    }).catch(error => {
      dispatch(alert('danger', error.response.data));
    });
  }
}

/**
 * Get logged hours by user ID
 * @param {String} user 
 */
export const getLoggedHours = user => {
  return (dispatch) => {
    axios.get(`/api/logs/user/${user}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_USER_LOGS, payload: response.data.logs });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Filter logs by submitted filters
 * @param {Object} filters 
 */
export const filterLogs = filters => {
  return (dispatch) => {
    axios.get(`/api/logs`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        const logs = _.filter(response.data.logs, log => {
          if (filters.from <= moment(log.start) && filters.to >= moment(log.start)) {
            if (filters.filter === 'worked' && log.ticket === null) {
              if (filters.asignee.length) {
                if (filters.asignee !== log.user) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            } else if (filters.filter === 'logged' && log.ticket !== null) {
              if (filters.asignee.length && filters.client.length) {
                if (filters.asignee !== log.user) {
                  return false;
                }

                if (filters.client !== log.ticket.client) {
                  return false
                }

                return true;
              } else if (filters.asignee.length) {
                if (filters.asignee !== log.user) {
                  return false;
                } else {
                  return true
                }
              } else if (filters.client.length) {
                if (filters.client !== log.ticket.client) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            }

            return false;
          }

          return false;
        });

        dispatch({ type: GET_FILTERED_LOGS, payload: logs });
      })   
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });   
  }
}