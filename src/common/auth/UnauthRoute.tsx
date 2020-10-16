import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export interface UnauthRouteProps {
  authenticated: boolean;
  component?: Component;
  [propName: string]: any;
}

export default function AuthRoute({
  authenticated,
  component,
  render,
  ...rest
}: UnauthRouteProps) {
  console.log("authenticatedauthenticated " + authenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}
