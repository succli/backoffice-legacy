// Load modules
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Load reducers
import ui from './ui';
import entities from './entities';

// Combine reducers for redux store
const backoffice = combineReducers({
  form: formReducer,
  ui,
  entities
});

export default backoffice;