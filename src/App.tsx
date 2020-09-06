import React, { useState, Fragment } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from './layout/AppBar';
import Drawer from './layout/Drawer';
import { Toolbar, Typography } from '@material-ui/core';
import AuthRoute from './common/auth/AuthRoute';
import UnauthRoute from './common/auth/UnauthRoute';
import SignInPage from './page/signin/SignInPage';
import { signIn, signUp, SignInRequest, SignUpRequest } from './services/user.service';
import SignUpPage from './page/signup/SignUpPage';
import Error from './common/error'
import CollectionPageContainer from './page/listCollection/CollectionPageContainer'
import CreateCollectionPageContainer from './page/createCollection/CreateCollectionPageContainer';
import EditCollectionPageContainer from './page/editCollection/EditCollectionPageContainer';
import queryString from 'query-string';
import PersonaPageContainer from './page/persona/PersonaPageContainer';
import { COLLECTION_LIST, COLLECTION_LIST_MY_COLLECTION, COLLECTION_LIST_CREATED, COLLECTION_CREATE } from './common/paths';
import MyCollectionTab from './page/listCollection/MyCollectionTab';
import SearchCollectionTab from './page/listCollection/SearchCollectionTab';
import CreateCollectionTab from './page/listCollection/CreateCollectionTab';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

function App() {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [user] = useState(null);
  const token = localStorage.getItem('Authorization');
  const [authenticated, setAuthenticated] = useState(token != null);
  function validateToken() {
    const token = localStorage.getItem('Authorization')
    setAuthenticated(token != null)
  }

  async function handleSignIn(request: SignInRequest) {
    await signIn(request)
    validateToken()
  }

  async function handleSignUp(request: SignUpRequest) {
    await signUp(request)
    validateToken()
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>
            Bailey
            </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <UnauthRoute
          exact
          authenticated={authenticated}
          path="/sign-in"
          render={() => <SignInPage handleSubmit={handleSignIn} />}
        />
        <UnauthRoute
          exact
          authenticated={authenticated}
          path="/sign-up"
          render={() => <SignUpPage handleSubmit={handleSignUp} />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path="/persona"
          render={(props: any) => <PersonaView />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path={COLLECTION_LIST}
          redner={(props: any) => <SearchCollectionTab />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path={COLLECTION_LIST_MY_COLLECTION}
          redner={(props: any) => <MyCollectionTab />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path={COLLECTION_LIST_CREATED}
          redner={(props: any) => <CreateCollectionTab />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path={COLLECTION_CREATE}
          render={(props: any) => <CreateCollectionView />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path="/collections/edit/:id"
          render={(props: any) => <EditCollectionView {...props} />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path="/memos"
          render={(props: any) => <ProjectView user={user} {...props} />}
        />
        <AuthRoute
          exact
          authenticated={authenticated}
          path={ROOT}
          render={(props: any) => <ProjectView user={user} {...props} />}
        />
        <Route>
          <Error />
        </Route>
      </Switch>
    </div>
  );
}

function PersonaView(props: any) {
  const classes = useStyles();
  return (
    <Fragment>
      <Drawer />
      <main className={classes.content}>
        <Toolbar />
        <PersonaPageContainer />
      </main>
    </Fragment>
  )
}

function getCollectionId(props: any): number | undefined {
  const query = queryString.parse(props.location.search);
  let collectionId = undefined;
  if (query && query.collectionId) {
    collectionId = Number(query.collectionId);
  }
  return collectionId
}

function getPlatterId(props: any): number | undefined {
  const query = queryString.parse(props.location.search);
  let platterId = undefined;
  if (query && query.platterId) {
    platterId = Number(query.platterId);
  }
  return platterId;
}

function CreateCollectionTabView(props: any) {
  const collectionId = getCollectionId(props);
  const platterId = getPlatterId(props);
  const classes = useStyles();
  return (
    <Fragment>
      <Drawer />
      <main className={classes.content}>
        <Toolbar />
        <CreateCollectionTab />
      </main>
    </Fragment>
  )
}

function CollectionView(props: any) {
  const query = queryString.parse(props.location.search);
  let id = undefined;
  if (query && query.id) {
    id = +query.id;
  }
  let platterId = undefined;
  if (query && query.platterId) {
    platterId = +query.platterId;
  }
  const classes = useStyles();
  return (
    <Fragment>
      <Drawer />
      <main className={classes.content}>
        <Toolbar />
        <CollectionPageContainer collectionId={id} platterId={platterId} />
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
  )
}

function EditCollectionView(props: any) {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <EditCollectionPageContainer collectionId={props.match.params.id} />
    </main>
  )
}

function ProjectView({ user, ...props }: any) {
  const classes = useStyles();

  return (
    <Fragment>
      <Drawer />
      <main className={classes.content}>
        <Toolbar />
        <Projects user={user} {...props} />
      </main>
    </Fragment>
  );
}

function Projects(props: any) {
  return <h2>Projects</h2>;
}

export default App;
