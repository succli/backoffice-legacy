// Load modules
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// Load reducer
import reducers from '../reducers';

// Create redux store
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);