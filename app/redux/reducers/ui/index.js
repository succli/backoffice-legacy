// Load modules
import { combineReducers } from 'redux';

// Load reducers
import { navigation } from './navigation';
import { alert } from './alert';

// Combine reducers for redux store
const ui = combineReducers({
  navigation,
  alert
});

export default ui;