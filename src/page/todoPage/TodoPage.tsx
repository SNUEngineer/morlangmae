// @ts-nocheck
import React, { useCallback, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import todoStyle from "./TodoPage.module.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TodoItem from "./todoItem/TodoItem";
import EditorJsComponent from "../../components/customizedComponent/EditorJsComponent/EditorJsComponent";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export interface TodoEditorProps {
  id: number | "CREATING";
  progress: string;
  data?: any;
  title?: string;
  changeTitle(title: string): void;
  disableEditing: boolean;
  clickOptionMenu(isOpen: bool, optionId: number): void;
  deleteOption(optionId: number): void;
  clickOptionNext(optionId: number): void;
  handleOpenTodo(isOpen: bool): void;
}

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
    fontSize: "1.5em",
  },
  textField: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
  accordian: {
    width: "100%",
  },
  todo_close_button: {
    opacity: "0.5",
  },
});

export default function TodoEditor(props: TodoEditorProps) {
  const {
    clickOptionMenu,
    deleteOption,
    clickOptionNext,
    handleOpenTodo,
  } = props;
  const todos = props.data?.optionsData;
  const {
    data,
    id,
    progress,
    disableEditing,
    clickBackward,
    clickForward,
  } = props;
  const [title, setTitle] = useState(data?.title);
  const changeTitle = async (event: any) => {
    props.changeTitle(event.target.value);
    setTitle(event.target.value);
  };
  // const textFieldStyle = textFieldStyles();
  const classes = useStyles();
  return (
    <div
      className={todoStyle.root}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onScroll={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <div className={todoStyle.todo_close_button_container}>
        <IconButton
          color="primary"
          component="span"
          onClick={handleOpenTodo(false)}
          size="small"
          className={classes.todo_close_button}
        >
          <HighlightOffIcon fontSize="medium" />
        </IconButton>
      </div>

      <Grid
        xs={12}
        container
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item sm={11}>
            <TextField
              name="title"
              required
              fullWidth
              id="title"
              onChange={changeTitle}
              placeholder="Untitle"
              autoFocus
              value={title}
              InputProps={{ classes }}
              className={classes.textField}
            />
          </Grid>

          <Grid item sm={1}>
            <IconButton color="primary" component="span" onClick={clickForward}>
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
        </Grid>
        <div className={todoStyle.comment_container}>
          <div className={todoStyle.comment_paper}>
            <EditorJsComponent
              progress={progress}
              data={data}
              parentType="todo"
              disableEditing={disableEditing}
            />
          </div>
        </div>
        <div className={todoStyle.option_container}>
          {todos.map((item, index) => (
            <TodoItem
              key={index}
              progress={progress}
              data={item}
              disableEditing={disableEditing}
              clickOptionMenu={clickOptionMenu}
              deleteOption={deleteOption}
              clickOptionNext={clickOptionNext}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
}
