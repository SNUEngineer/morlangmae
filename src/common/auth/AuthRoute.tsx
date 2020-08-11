import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export interface AuthRouteProps {
  authenticated: boolean;
  component?: Component;
  [propName: string]: any;
}

export default function AuthRoute({ authenticated, component, render, ...rest }: AuthRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
              <Component {...props} />
            )
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location }}}
          />
        )
      }
    />
  );
}
