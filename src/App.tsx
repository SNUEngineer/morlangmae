import React, { useState, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from './layout/AppBar';
import Drawer from './layout/Drawer';
import { Toolbar, Typography } from '@material-ui/core';
import AuthRoute from './common/auth/AuthRoute';
import UnauthRoute from './common/auth/UnauthRoute';
import SignIn from './components/signin/SignIn';
import { signIn, signUp } from './components/signin/service';
import SignUp from './components/signup/SignUp';
import Error from './common/error'

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
  const classes = useStyles();
  const [user] = useState(null);
  const token = localStorage.getItem('Authorization');
  const authenticated = token != null;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>
            Bailey
            </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <UnauthRoute
            authenticated={authenticated}
            path="/sign-in"
            render={() => <SignIn handleSubmit={signIn} />}
          />
          <UnauthRoute
            authenticated={authenticated}
            path="/sign-up"
            render={() => <SignUp handleSubmit={signUp} />}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/persona"
            render={(props: any) => <ProjectView user={user} {...props} />}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/projects"
            render={(props: any) => <ProjectView user={user} {...props} />}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/notes"
            render={(props: any) => <ProjectView user={user} {...props} />}
          />
          <AuthRoute
            authenticated={authenticated}
            path="/"
            exact
            render={(props: any) => <ProjectView user={user} {...props} />}
          />
          <Route>
            <Error />
          </Route>
        </Switch>
      </Router>

    </div>
  );
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

function Persona() {
  return <h2>Persona</h2>;
}

function Projects(props: any) {
  return <h2>Projects</h2>;
}

function Memos() {
  return <h2>Memos</h2>;
}

export default App;
