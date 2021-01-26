// Load modules
import _ from 'lodash';

/**
 * Get active log from state
 * @param {Object} state
 * @returns {Object} 
 */
export const getActiveLog = state => {
  const activeLogIndex = _.findIndex(state.entities.log.user, log => (state.entities.auth.current === log.user && log.ticket === null && !log.end));
  return state.entities.log.user.length > 0 ?
    activeLogIndex > -1 ? state.entities.log.user[activeLogIndex] : null : null;
}

/**
 * Get active ticket log from state
 * @param {Object} state 
 * @returns {Object}
 */
export const getActiveTicket = state => {
  const activeTicketIndex = _.findIndex(state.entities.log.user, log => (state.entities.auth.current === log.user && log.ticket !== null && !log.end))
  return state.entities.log.user.length > 0 ?
    activeTicketIndex > -1 ? state.entities.log.user[activeTicketIndex] : null : null;
}