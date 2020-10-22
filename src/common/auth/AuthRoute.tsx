import React, { Component, Fragment, useCallback } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { SIGN_IN } from "../paths";
import menuStyle from "./route.module.scss";

export interface AuthRouteProps {
  authenticated: boolean;
  hasDrawer?: boolean;
  component?: Component;
  [propName: string]: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      paddingLeft: 240,
    },
  })
);

export default function AuthRoute({
  authenticated,
  hasDrawer,
  component,
  render,
  ...rest
}: AuthRouteProps) {
  const classes = useStyles();
  const history = useHistory();

  if (!authenticated) {
    history.push(SIGN_IN);
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <div className={menuStyle.page_container}>
          {hasDrawer && <Drawer />}

          {/* <main className={classes.content}>
            {render(props)}
          </main> */}

          <div className={menuStyle.content_container}>
            <div className={menuStyle.content}>{render(props)}</div>
          </div>
        </div>
      )}
    />
  );
}
