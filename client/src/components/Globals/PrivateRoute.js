import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { connect, useDispatch, useSelector } from "react-redux";
// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        this.props.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/user",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
