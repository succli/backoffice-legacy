// Load modules
import _ from 'lodash';

// Get constants
import {
  CREATE_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET,
  CLOSE_TICKET,
  GET_TICKET,
  GET_TICKETS,
  GET_USER_TICKETS,
} from '../../constants/ticket';

/**
 * Ticket reducer
 * @param {Object} state 
 * @param {Object} action
 * @returns {Object}
 */
export const ticket = (state = {all: [], selected: null}, action) => {
  const tickets = state.all;

  switch (action.type) {
    case GET_TICKETS:
      return { ...state, all: action.payload };
    case GET_TICKET:
      return { ...state, selected: action.payload };
    case GET_USER_TICKETS:
      return { ...state, user: action.payload };
    case CREATE_TICKET:
      tickets.push(action.payload);
      return { ...state, all: tickets };
    case UPDATE_TICKET:
      tickets[_.findIndex(tickets, ticket => ticket._id === action.payload._id)] = action.payload;
      return { ...state, all: tickets };
    case DELETE_TICKET:
      tickets.splice(_.findIndex(tickets, ticket => ticket._id === action.payload), 1);
      return { ...state, all: tickets };
    case CLOSE_TICKET:
      tickets[_.findIndex(tickets, ticket => ticket._id === action.payload._id)] = action.payload;
      return { ...state, all: tickets };
    default:
      return state;
  }
}