import React, { useState, Fragment, useEffect, useCallback } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../editor/tools";
import { UserView } from "../../services/user.service";
import { BlockView } from "../../services/platter.service";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Popover from "@material-ui/core/Popover";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import Avatar from "@material-ui/core/Avatar";
import platterStyle from "./TaskMap.module.scss";
import testProfile from "../../resources/icons/test_profile_image.png";

export interface TaskMapProps {}

export default function TaskMap(props: TaskMapProps) {
  return <div className={platterStyle.platter_container}></div>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      // top: (props: any) => props.top,
      top: "64px",
    },
  })
);
