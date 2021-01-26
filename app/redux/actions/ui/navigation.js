// Get constants
import { TOGGLE_MENU } from '../../constants/navigation';

/**
 * Toggle sidebar menu
 * @param {Boolean} status 
 */
export const toggleMenu = status => ({
  type: TOGGLE_MENU,
  status
});