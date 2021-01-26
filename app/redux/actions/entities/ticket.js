// Load modules
import axios from 'axios';

// Get constants
import {
  CREATE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET,
  CLOSE_TICKET,
  GET_TICKET,
  GET_TICKETS,
  GET_USER_TICKETS
} from '../../constants/ticket';

// Get actions
import { alert } from '../ui/alert';

/**
 * Get ticket by ID
 * @param {String} id 
 */
export const getTicket = id => {
  return (dispatch) => {
    axios.get(`/api/tickets/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_TICKET, payload: response.data.ticket._id })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Get all tickets from API
 */
export const getTickets = () => {
  return (dispatch) => {
    axios.get(`/api/tickets`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_TICKETS, payload: response.data.tickets })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Get tickets by user ID
 * @param {String} userId 
 */
export const getUserTickets = userId => {
  return (dispatch) => {
    axios.get(`/api/tickets/user/${userId}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_USER_TICKETS, payload: response.data.tickets })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Create new ticket with submitted values
 * @param {Object} values 
 */
export const createTicket = values => {
  return (dispatch) => {
    axios.post('/api/tickets', values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: CREATE_TICKET, payload: response.data.ticket })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Update ticket with submitted values
 * @param {Object} values 
 */
export const updateTicket = values => {
  return (dispatch) => {
    axios.put(`/api/tickets/${values._id}`, values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_TICKET, payload: response.data.ticket })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Delete ticket by ID
 * @param {String} id 
 */
export const deleteTicket = id => {
  return (dispatch) => {
    axios.delete(`/api/tickets/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: DELETE_TICKET, payload: response.data.ticket._id })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Close ticket by ID
 * @param {String} id 
 */
export const closeTicket = id => {
  return (dispatch) => {
    axios.put(`/api/tickets/${id}`, { closed: true }, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: CLOSE_TICKET, payload: response.data.ticket })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}