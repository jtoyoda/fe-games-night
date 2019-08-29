import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from 'services/authenticationService';

// @ts-ignore
export const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    const currentUser = authenticationService.currentUserValue;
    if (!currentUser || currentUser.type !== 'admin') {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)
