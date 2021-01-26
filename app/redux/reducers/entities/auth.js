/**
 * Get constants
 */
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_ERROR,
  LOGOUT_USER,
  GET_CURRENT_USER
} from '../../constants/auth';

/**
 * Auth reducer
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Object}
 */
export const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, error: '', authenticated: true, admin: action.payload };
    case LOGOUT_USER:
      return { ...state, authenticated: false, current: null };
    case AUTHENTICATE_ERROR:
      return { ...state, error: action.payload };
    case GET_CURRENT_USER:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}