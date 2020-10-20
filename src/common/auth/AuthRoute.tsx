import React, { Component, Fragment, useCallback } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Drawer from "../../layout/Drawer";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { SIGN_IN } from "../paths";
import menuStyle from "./route.module.scss";
import CollectionTab from "../../page/listCollection/CollectionTab";
import {
  COLLECTION_LIST_TAB,
  COLLECTION_LIST,
  COLLECTION_LIST_MY_COLLECTION,
  COLLECTION_LIST_CREATED,
} from "../paths";
import CreateCollectionTabContainer from "../../page/listCollection/CreateCollectionTabContainer";
import MyCollectionTabContainer from "../../page/listCollection/MyCollectionTabContainer";
import SearchCollectionTabContainer from "../../page/listCollection/SearchCollectionTabContainer";
import queryString from "query-string";

export interface AuthRouteProps {
  authenticated: boolean;
  hasDrawer?: boolean;
  component?: Component;
  type?: string;
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
  type,
  searchQuery,
  ...rest
}: AuthRouteProps) {
  const classes = useStyles();
  const history = useHistory();
  const viewType = useCallback(() => {
    if (!type) {
      return "basic";
    }
    return type;
  }, [type]);
  const collectionList = useCallback(() => {
    if (!type) {
      return "basic";
    }
    return type;
  }, [type]);

  if (!authenticated) {
    history.push(SIGN_IN);
  }

  return (
    <div>
      <Route
        {...rest}
        render={(props) => (
          <div className={menuStyle.page_container}>
            {hasDrawer && <Drawer />}

            {/* <main className={classes.content}>
            {render(props)}
          </main> */}

            <div className={menuStyle.content_container}>
              {viewType() === "basic" && (
                <div className={menuStyle.content}>{render(props)}</div>
              )}
              {viewType() === "collection" && (
                <div className={menuStyle.content}>
                  <div>
                    <CollectionTab />
                  </div>
                  <Route
                    path={COLLECTION_LIST}
                    {...rest}
                    render={(props) => (
                      <SearchCollectionTabContainer {...rest} />
                    )}
                  />
                  <Route
                    path={COLLECTION_LIST_MY_COLLECTION}
                    {...rest}
                    render={(props) => <MyCollectionTabContainer {...rest} />}
                  />
                  <Route
                    path={COLLECTION_LIST_CREATED}
                    {...rest}
                    render={(props) => (
                      <CreateCollectionTabContainer {...rest} />
                    )}
                  />
                </div>
              )}
              <div></div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
