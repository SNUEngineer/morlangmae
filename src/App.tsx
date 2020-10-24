// @ts-nocheck
import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "./layout/AppBar";
import Drawer from "./layout/Drawer";
import { Toolbar, Typography } from "@material-ui/core";
import AuthRoute from "./common/auth/AuthRoute";
import UnauthRoute from "./common/auth/UnauthRoute";
import SignInPage from "./page/signin/SignInPage";
import {
  signIn,
  signUp,
  SignInRequest,
  SignUpRequest,
} from "./services/user.service";
import SignUpPage from "./page/signup/SignUpPage";
import Error from "./common/error";
import CreateCollectionPageContainer from "./page/createCollection/CreateCollectionPageContainer";
import EditCollectionPageContainer from "./page/editCollection/EditCollectionPageContainer";
import PersonaPageContainer from "./page/persona/PersonaPageContainer";
import {
  COLLECTION_LIST_TAB,
  COLLECTION_CREATE,
  ROOT,
  SIGN_IN,
  SIGN_UP,
  PROFILE,
  COLLECTION_EDIT,
  COLLECTION_LIST_COMPANY,
  NOTIFICATION,
  MEMO_HOME,
  MEMO_LIST,
  MEMO_BINGE,
  MEMO_IN_COLLECTION,
  MEMO_LIST_TAB,
} from "./common/paths";
import CollectionTab from "./page/listCollection/CollectionTab";
import CreateCollectionTabContainer from "./page/listCollection/CreateCollectionTabContainer";
import MyCollectionTabContainer from "./page/listCollection/MyCollectionTabContainer";
import SearchCollectionTabContainer from "./page/listCollection/SearchCollectionTabContainer";
import BingeMemoTab from "./page/listMemo/BingeMemoTab";
import MemoHomeTab from "./page/listMemo/MemoHomeTab";
import MemoListTab from "./page/listMemo/MemoListTab";
import MemoTab from "./page/listMemo/MemoTab";
import MemoListInCollection from "./page/listMemo/MemoListInCollection";
import Memo from "./page/listMemo/MemoListInCollection";
import queryString from "query-string";
import CompanyCollectionPageContainer from "./page/listCollection/CompanyCollectionPageContainer";
import { verify } from "./services/account.service";
import { resetToken, expireToken } from "./common/axios";
import NotificationPageContainer from "./page/notification/NotificationPageContainer";
import BasicMenuBar from "./components/layout/basicMenuBar/BasicMenuBar";
import appStyle from "./App.module.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    body: {
      height: "100%",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App() {
  const { pathname, search } = useLocation();
  const classes = useStyles();
  const token = localStorage.getItem("Authorization");
  const [authenticated, setAuthenticated] = useState(token != null);

  //const [currentCategories, setCurrentCategories] = useState("collection");

  async function validateToken() {
    const token = localStorage.getItem("Authorization");
    try {
      await verify();
    } catch (e) {
      expireToken();
    }
    setAuthenticated(token != null);
  }
  validateToken();

  async function handleSignIn(request: SignInRequest) {
    await signIn(request);
    await validateToken();
  }

  async function handleSignUp(request: SignUpRequest) {
    await signUp(request);
    await validateToken();
  }

  const mainPages = useCallback(() => {
    const memoList = () => {
      if (pathname.includes("home")) {
        return <MemoHomeTab {...queryString.parse(search)} />;
      }
      if (pathname.includes("list")) {
        return <MemoListTab {...queryString.parse(search)} />;
      }
      if (pathname.includes("binge")) {
        return <BingeMemoTab {...queryString.parse(search)} />;
      }
    };
    const collectionList = () => {
      if (pathname.includes("my")) {
        return <MyCollectionTabContainer {...queryString.parse(search)} />;
      }
      if (pathname.includes("discover")) {
        return <SearchCollectionTabContainer {...queryString.parse(search)} />;
      }
      if (pathname.includes("created")) {
        return <CreateCollectionTabContainer {...queryString.parse(search)} />;
      }
    };

    const memoStyle = {
      opacity: pathname.startsWith("/memos") ? 1 : 0,
      zIndex: pathname.startsWith("/memos") ? 800 : -1,
    };
    const collectionSytle = {
      opacity: pathname.startsWith("/collections") ? 1 : 0,
      zIndex: pathname.startsWith("/collections") ? 800 : -1,
    };

    return (
      <div className={appStyle.main_container}>
        <div
          style={memoStyle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div>
            <MemoTab />
          </div>
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {memoList()}
          </div>
        </div>
        <div
          style={collectionSytle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div>
            <CollectionTab />
          </div>
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {collectionList()}
          </div>
        </div>
      </div>
    );
  }, [pathname, search]);

  return (
    <div>
      <BasicMenuBar>
        {/* <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography>Bailey</Typography>
          </Toolbar>
        </AppBar> */}
        <div className={classes.body}>
          <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />

            <UnauthRoute
              exact
              authenticated={authenticated}
              path={SIGN_IN}
              render={() => <SignInPage handleSubmit={handleSignIn} />}
            />
            <UnauthRoute
              exact
              authenticated={authenticated}
              path={SIGN_UP}
              render={() => <SignUpPage handleSubmit={handleSignUp} />}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={PROFILE}
              render={() => <PersonaView />}
            />
            <AuthRoute
              hasDrawer
              authenticated={authenticated}
              path={["/collections", "/memos", "/persona"]}
              render={(props: any) => mainPages()}
            />
            {/* <AuthRoute
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_TAB}
              render={(props: any) => (
                <div>
                  <div>
                    <CollectionTab />
                  </div>
                  <div
                    style={{ minHeight: "800px" }}
                    // 부드러운 전환을 위한
                  >
                    {collectionList()}
                  </div>
                </div>
              )}
            />
            <AuthRoute
              hasDrawer
              authenticated={authenticated}
              path={MEMO_LIST_TAB}
              render={(props: any) => (
                <div>
                  <div>
                    <MemoTab />
                  </div>
                  <div
                    style={{ minHeight: "800px" }}
                    // 부드러운 전환을 위한
                  >
                    {memoListPage()}
                  </div>
                </div>
              )}
            /> */}
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_CREATE}
              render={() => <CreateCollectionPageContainer />}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_COMPANY}
              render={(props: any) => (
                <CompanyCollectionPageContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            />
            <AuthRoute
              exact
              authenticated={authenticated}
              path={COLLECTION_EDIT}
              render={(props: any) => (
                <EditCollectionPageContainer
                  collectionId={props.match.params.id}
                />
              )}
            />
            <AuthRoute
              exact
              authenticated={authenticated}
              hasDrawer
              path={MEMO_IN_COLLECTION}
              render={(props: any) => (
                <MemoListInCollection
                  {...props}
                  collectionId={props.match.params.id}
                />
              )}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={NOTIFICATION}
              render={(props: any) => <NotificationPageContainer />}
            />
            <AuthRoute
              exact
              authenticated={authenticated}
              path={ROOT}
              render={(props: any) => <ProjectView {...props} />}
            />
            <Route>
              <Error />
            </Route>
          </Switch>
        </div>
      </BasicMenuBar>
    </div>
  );
}

function PersonaView() {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <Drawer /> */}
      <main className={classes.content}>
        <Toolbar />
        <PersonaPageContainer />
      </main>
    </Fragment>
  );
}

function CreateCollectionView() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <CreateCollectionPageContainer />
    </main>
  );
}

function ProjectView(props: any) {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <Drawer /> */}
      <main className={classes.content}>
        <Toolbar />
        <Projects {...props} />
      </main>
    </Fragment>
  );
}

function Projects() {
  return <h2>Projects</h2>;
}

export default App;
