// Load modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import history from './redux/history';

// Load components
import App from './App.jsx';
import Login from './components/Login/Login.jsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx';

// Load redux store
import { store } from './redux/stores';

// Load redux actions
import { authCurrentUser } from './redux/actions/entities/auth';
import { getUsers } from './redux/actions/entities/user';
import { getClients } from './redux/actions/entities/client';
import { getTickets } from './redux/actions/entities/ticket';
import { getCalendars } from './redux/actions/entities/calendar';

// Load service worker
import registerServiceWorker from './registerServiceWorker';

// Load stylesheets
import 'font-awesome/scss/font-awesome.scss';
import './index.scss';

/**
 * Check if user is logged in
 * If logged in, dispatch initializer redux actions
 */
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(authCurrentUser(token));
  store.dispatch(getUsers());
  store.dispatch(getClients());
  store.dispatch(getTickets());
  store.dispatch(getCalendars());
}

// Render React DOM root element for backend
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={App} />
        </Switch>
      </Router>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('app'));

// Register service worker
registerServiceWorker();