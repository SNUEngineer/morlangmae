// @ts-nocheck
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import { UserView, EditUserRequest } from "../../services/user.service";
import Fab from "@material-ui/core/Fab";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import editStyle from "./EditPage.module.scss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FloatingMenu from "../../components/customizedComponent/FloatingMenu/FloatingMenu";
import FloatingBackground from "../../components/customizedComponent/FloatingBackground/FloatingBackground";
import SelectorPageContainer from "../selectorPage/SelectorPageContainer";
import TodoPageContainer from "../todoPage/TodoPageContainer";
import Slide from "@material-ui/core/Slide";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export interface EditPageProps {
  editUser(request: EditUserRequest): Promise<void>;
  data;

  deleteOption(optionId: number): void;
  clickOptionNext(optionId: number): void;
}

const useStyles = makeStyles((theme) => ({
  map_close_button: {
    padding: "0.7em",
    margin: "0.3em",
  },
  task_close_button: {
    padding: "0.7em",
    margin: "0.3em",
  },
  drawer: {
    height: "100%",
    width: "100%",
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1400",
  },
}));

export default function EditPage(props: EditPageProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const { deleteOption, clickOptionNext } = props;

  const handleOpenOptionMenu = (isOpen) => (event) => {
    console.log("Asdfasdf 실행? fs " + isOpen);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("Asdfasdf 실행?  " + isOpen);
    setTaskOpen(isOpen);
  };
  const clickOptionMenu = (isOpen: bool, optionId: number) => {
    console.log("Asdfasdf 실행? fs sfsfsf" + isOpen);
    setTaskOpen(isOpen);
  };
  const handleClickOpen = () => {
    console.log("Asfsfs");
    setOpen((prev) => !prev);
  };

  const handleOpenFullMap = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    console.log("asdf " + mapOpen);
    setMapOpen(isOpen);
  };

  const options = useCallback(() => {
    //우선은, 나중에  props.data.progress 로 교체
    switch ("IN_PROGRESS") {
      case "IN_PROGRESS":
        return ["map", "bottle neck", "break time"];

      case "BOTTLE_NECK":
        return ["map", "resume"];

      case "BREAK_TIME":
        return ["map", "resume"];
    }
  }, [props.data]);
  const selectedOption = (option: string) => {
    switch (option) {
      case "map":
        console.log("asdf dd " + mapOpen);
        setMapOpen(true);
        break;

      case "bottle neck":
        break;

      case "break time":
        break;

      case "resume":
        break;
    }
  };
  return (
    <div>
      <Fab className={classes.fab} size="small">
        <FloatingMenu
          className={editStyle.menu_button}
          options={options()}
          selectedOption={selectedOption}
          viewType="fab"
        />
      </Fab>
      <Slide
        in={taskOpen}
        timeout={300}
        direction="up"
        mountOnEnter
        unmountOnExit
      >
        <div className={editStyle.todo_container}>
          <Paper elevation={4} className={editStyle.todo_paper}>
            <div className={editStyle.todo_scroll_container}>
              <div className={editStyle.todo_close_button_container}>
                <div className={editStyle.white_space}> </div>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={handleOpenOptionMenu(false)}
                  size="small"
                  className={classes.todo_close_button}
                >
                  <HighlightOffIcon fontSize="medium" />
                </IconButton>
              </div>
              <div className={editStyle.todo_page}>
                <TodoPageContainer
                  todoId={3}
                  progress="EDITING"
                  clickOptionMenu={clickOptionMenu}
                  deleteOption={deleteOption}
                  clickOptionNext={clickOptionNext}
                />
              </div>
            </div>
          </Paper>
        </div>
      </Slide>
      <Slide
        in={mapOpen}
        timeout={300}
        direction="down"
        mountOnEnter
        unmountOnExit
      >
        <div className={editStyle.map_container}>
          <Paper elevation={4} className={editStyle.map_paper}>
            <Grid container>
              <div className={editStyle.map_close_button_container}>
                <div className={editStyle.white_space}> </div>
                <IconButton
                  color="primary"
                  component="span"
                  onClick={handleOpenFullMap(false)}
                  size="small"
                  className={classes.map_close_button}
                >
                  <HighlightOffIcon fontSize="medium" />
                </IconButton>
              </div>
            </Grid>
          </Paper>
        </div>
      </Slide>
      {(taskOpen || mapOpen) && <FloatingBackground />}
      <Paper elevation={4} className={editStyle.path_container}>
        <Collapse in={open}>
          <div className={editStyle.path_paper}></div>
        </Collapse>
        <div className={editStyle.button_container}>
          <IconButton
            color="primary"
            component="span"
            onClick={handleClickOpen}
            size="small"
            className={editStyle.path_button}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      </Paper>

      <SelectorPageContainer
        selectorId={2}
        progress="EDITING"
        clickOptionMenu={clickOptionMenu}
        deleteOption={deleteOption}
        clickOptionNext={clickOptionNext}
      />
    </div>
  );
}
