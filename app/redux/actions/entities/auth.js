// Load modules
import axios from 'axios';
import history from '../../history';

// Get constants
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_ERROR,
  LOGOUT_USER,
  GET_CURRENT_USER
} from '../../constants/auth';

// Get actions
import { alert } from '../../actions/ui/alert';
import { getLoggedHours } from './log';
import { getUserTickets } from './ticket';
import { getUsers } from './user';
import { getClients } from './client';
import { getTickets } from './ticket';
import { getCalendars } from './calendar';

/**
 * Authenticate current user by token
 * @param {String} token 
 */
export const authCurrentUser = (token) => {
  return (dispatch) => {

    axios.post('/api/users/me', { token }, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: AUTHENTICATE_USER, payload: response.data.user.role === 'Administrator' });
        dispatch({ type: GET_CURRENT_USER, payload: response.data.user._id });
        dispatch(getLoggedHours(response.data.user._id));
      }).catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          history.push('/login');
        }
        dispatch(alert('danger', error.response.data.message));
      });
  }
}

/**
 * Get current user by ID
 * @param {String} id 
 */
export const getCurrentUser = (id) => {
  return (dispatch) => {
    axios.get(`/api/users/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch({ type: GET_CURRENT_USER, payload: response.data.user._id });
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Login user by email and password
 * @param {String} email
 * @param {String} password 
 */
export const login = ({ email, password }) => {
  return (dispatch) => {
    axios.post('/api/auth/login', { email, password })
      .then(response => {
        const { token } = response.data;

        localStorage.setItem('token', token);
        dispatch(authCurrentUser(token));
        dispatch(alert('success', 'You successfully logged in.'));

        dispatch(getUsers());
        dispatch(getClients());
        dispatch(getTickets());
        dispatch(getCalendars());

        history.push('/');
      })
      .catch(error => {
        dispatch(alert('danger', 'Wrong email address or password.'));
      });
  }
}

/**
 * Register user with submitted values
 * @param {Object} values
 */
export const registration = values => {
  return (dispatch) => {
    axios.post('/api/auth/signup', values, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then(response => {
        dispatch(alert('success', 'You successfully registered a new user.'));
      })
      .catch(error => {
        dispatch(alert('danger', error.response.data));
      });
  }
}

/**
 * Logout user and remove token from localStorage
 */
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER });
    history.push('/login');
  }
}