// Get constants
import { TOGGLE_MENU } from '../../constants/navigation';

/**
 * Navigation reducer
 * @param {Object} state 
 * @param {Object} action
 * @returns {Object} 
 */
export const navigation = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return action.status;
    default:
      return state;
  }
}