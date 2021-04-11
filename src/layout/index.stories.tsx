import React from "react";
import Drawer from "./Drawer";
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

export default { title: "drawer" };

export function basic() {
  
  return <><Drawer/> <p > hihihi </p></>;
}
