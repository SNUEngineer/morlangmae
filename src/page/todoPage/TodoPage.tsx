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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
});

export default function TodoEditor(props: TodoEditorProps) {
  const { clickOptionMenu, deleteOption, clickOptionNext } = props;
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
        console.log("click");
      }}
    >
      {/* <div className={editStyle.todo_close_button_container}>
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
      </div> */}

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
              type="comment"
              disableEditing={disableEditing}
            />
          </div>
        </div>
        <div className={todoStyle.option_container}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                onChange={changeTitle}
                placeholder="Untitle"
                autoFocus
                onFocus={(event) => event.stopPropagation()}
                onClick={(event) => event.stopPropagation()}
                value={title}
                InputProps={{ classes }}
                className={classes.textField}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                The click event of the nested action will propagate up and
                expand the accordion unless you explicitly stop it.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label="I acknowledge that I should stop the focus event propagation"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                The focus event of the nested action will propagate up and also
                focus the accordion unless you explicitly stop it.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions3-content"
              id="additional-actions3-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox />}
                label="I acknowledge that I should provide an aria-label on each action that I add"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">
                If you forget to put an aria-label on the nested action, the
                label of the action will also be included in the label of the
                parent button that controls the accordion expansion.
              </Typography>
            </AccordionDetails>
          </Accordion>
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
