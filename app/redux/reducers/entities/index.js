// Load modules
import { combineReducers } from 'redux';

// Load reducers
import { auth } from './auth';
import { user } from './user';
import { client } from './client';
import { log } from './log';
import { ticket } from './ticket';
import { calendar } from './calendar';

// Combine reducers for redux store
const entities = combineReducers({
  auth,
  user,
  client,
  log,
  ticket,
  calendar
});

export default entities;