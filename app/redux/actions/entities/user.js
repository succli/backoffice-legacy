// Load modules
import axios from 'axios';

// Get constants
import { 
  GET_USER_BY_ID,
  UPDATE_USER,
  GET_USERS,
  DELETE_USER
} from '../../constants/user';

// Get actions
import { alert } from '../../actions/ui/alert';
import { getCurrentUser } from '../entities/auth';
import { deleteFile } from '../upload';

/**
 * Change user password
 * @param {Object} values 
 */
export const changePassword = values => {
  return (dispatch) => {
    axios.put(`/api/users/${values._id}/changePassword`, values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_USER, user: response.data.user });
        dispatch(alert('success', response.data.message));
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      })
  }
}

/**
 * Delete user by ID
 * @param {String} userId 
 */
export const deleteUser = (userId) => {
  return (dispatch) => {
    
    axios.delete(`/api/users/${userId}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: DELETE_USER, payload: response.data.user._id });
        dispatch(alert('success', response.data.message));
      })
      .catch(response => {
        dispatch(alert('danger', error.response.data));
      })
  }
}

/**
 * Get user by ID
 * @param {String} userId 
 */
export const getUser = (userId) => {
  return (dispatch) => {
    axios.get(`/api/users/${userId}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_USER_BY_ID, payload: response.data.user._id });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Update user with submitted values
 * @param {Object} values 
 */
export const updateUser = values => {
  return (dispatch) => {
    axios.put(`/api/users/${values._id}`, values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then (response => {
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        dispatch(alert('success', response.data.message));
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Remove user avatar
 * @param {Object} values 
 */
export const unsetUserAvatar = values => {
  return (dispatch) => {
    axios.put(`/api/users/${values._id}/unsetAvatar`, {}, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        if (values.avatar) {
          dispatch(deleteFile(values.avatar));
        }
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Get all users from API
 */
export const getUsers = () => {
  return (dispatch) => {
    axios.get('/api/users', { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_USERS, payload: { all: response.data.users} })
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}