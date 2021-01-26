// Load modules
import axios from 'axios';
import history from '../../history';

// Get constants
import {
  CREATE_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  GET_CLIENT,
  GET_CLIENTS
} from '../../constants/client';

// Get actions
import { alert } from '../ui/alert';
import { deleteFile } from '../upload';

/**
 * Create new client with submitted values
 * @param {Object} values 
 */
export const createClient = values => {
  return (dispatch) => {

    axios.post('/api/clients/', values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: CREATE_CLIENT, payload: response.data.client });
        dispatch(alert('success', 'Successfully created client!'));

        setTimeout(() => {
          history.push(`/clients/${response.data.client._id}`);
        }, 3000);
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Update client with submitted values
 * @param {Object} values 
 */
export const updateClient = values => {
  return (dispatch) => {
    axios.put(`/api/clients/${values._id}`, values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_CLIENT, payload: response.data.client });
        dispatch(alert('success', 'Successfully updated client!'));
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Get client by ID
 * @param {String} id 
 */
export const getClient = id => {
  return (dispatch) => {
    axios.get(`/api/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_CLIENT, payload: response.data.client._id });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Get all clients from API
 */
export const getClients = () => {
  return (dispatch) => {
    axios.get('/api/clients', { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_CLIENTS, payload: { all: response.data.clients} })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Delete client by ID
 * @param {String} id 
 */
export const deleteClient = id => {
  return (dispatch) => {
    axios.delete(`/api/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: DELETE_CLIENT, payload: id });
        dispatch(alert('success', 'Successfully deleted client!'))
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Remove client logo by ID and delete the file
 * @param {String} id 
 */
export const unsetClientLogo = id => {
  return (dispatch) => {
    axios.get(`/api/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        if (response.data.client.logo) {
          dispatch(deleteFile(response.data.client.logo));
        }
      })
    axios.put(`/api/clients/${id}/unsetLogo`, {}, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_CLIENT, payload: response.data.client });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}