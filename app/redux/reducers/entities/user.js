// Load modules
import _ from 'lodash';

// Get constants
import {  
  GET_USER_BY_ID,
  UPDATE_USER,
  GET_USERS,
  DELETE_USER
} from '../../constants/user';

/**
 * User reducer
 * @param {Object} state 
 * @param {Object} action
 * @returns {Object} 
 */
export const user = (state = { all: [], selected: null }, action) => {
  const users = state.all;

  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case GET_USER_BY_ID:
      return { ...state, selected: action.payload };
    case UPDATE_USER:
      users[_.findIndex(users, user => user._id === action.payload._id)] = action.payload;
      return { ...state, all: users };
    case DELETE_USER:
      users.splice(_.findIndex(users, user => user._id === action.payload), 1);
      console.log(users);
      return { ...state, all: users };
    default:
      return state;
  }
}