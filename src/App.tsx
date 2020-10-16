// @ts-nocheck
import React, { useState, Fragment } from "react";
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
  COLLECTION_LIST,
  COLLECTION_LIST_MY_COLLECTION,
  COLLECTION_LIST_CREATED,
  COLLECTION_CREATE,
  ROOT,
  SIGN_IN,
  SIGN_UP,
  PROFILE,
  COLLECTION_EDIT,
  COLLECTION_LIST_COMPANY,
  NOTIFICATION,
} from "./common/paths";
import CreateCollectionTabContainer from "./page/listCollection/CreateCollectionTabContainer";
import MyCollectionTabContainer from "./page/listCollection/MyCollectionTabContainer";
import SearchCollectionTabContainer from "./page/listCollection/SearchCollectionTabContainer";
import queryString from "query-string";
import CompanyCollectionPageContainer from "./page/listCollection/CompanyCollectionPageContainer";
import { verify } from "./services/account.service";
import { resetToken, expireToken } from "./common/axios";
import NotificationPageContainer from "./page/notification/NotificationPageContainer";
import BasicMenuBar from "./components/layout/basicMenuBar/BasicMenuBar";

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
  const { pathname } = useLocation();
  const classes = useStyles();
  const token = localStorage.getItem("Authorization");
  const [authenticated, setAuthenticated] = useState(token != null);

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
              authenticated={authenticated}
              path={PROFILE}
              render={() => <PersonaView />}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST}
              render={(props: any) => (
                <SearchCollectionTabContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_MY_COLLECTION}
              render={(props: any) => (
                <MyCollectionTabContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_CREATED}
              render={(props: any) => (
                <CreateCollectionTabContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_CREATE}
              render={() => <CreateCollectionView />}
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
              path="/memos"
              render={(props: any) => <ProjectView {...props} />}
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
