// Load modules
import _ from 'lodash';

// Get constants
import {
  CREATE_CLIENT,
  UPDATE_CLIENT,
  GET_CLIENT,
  GET_CLIENTS,
  DELETE_CLIENT
} from '../../constants/client';

/**
 * Client reducer
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Object}
 */
export const client = (state = { all: [], selected: null }, action) => {
  // Set all client
  const clients = state.all;

  switch (action.type) {
    case CREATE_CLIENT:
      clients.push(action.payload)
      return {...state, all: clients}
    case GET_CLIENT:
      return {...state, selected: action.payload}
    case UPDATE_CLIENT:
      clients[_.findIndex(clients, client => client._id === action.payload._id)] = action.payload;
      return { ...state, all: clients };
    case DELETE_CLIENT:
      clients.splice(_.findIndex(clients, client => client._id === action.payload), 1);
      return { ...state, all: clients };
    case GET_CLIENTS:
      return action.payload
    default:
      return state;
  }
}