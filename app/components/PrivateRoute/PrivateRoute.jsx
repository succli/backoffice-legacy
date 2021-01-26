// Load modules
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Check if user logged in, if not redirects to login page
 * @param {Object} 
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token') ? 
      <Component {...props} /> :
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);
