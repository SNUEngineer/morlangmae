import React from "react";
import SignInPage from "./SignInPage";
import UnauthRoute from "../../common/auth/UnauthRoute";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  BrowserRouter as Router,
} from 'react-router-dom';

export default { title: "SignIn" };

export function basic() {
  return <Router><Route><SignInPage /></Route></Router>;
}
