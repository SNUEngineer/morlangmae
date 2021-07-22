// @ts-nocheck
import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import itemStyle from "./TodoItem.module.scss";

import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import FloatingMenu from "../../customizedComponent/FloatingMenu/FloatingMenu";
import EditorJsComponent from "../../../components/customizedComponent/EditorJsComponent/EditorJsComponent";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export interface TodoItemProps {
  progress: "CREATING" | "EDITING" | "VIEWING" | "TASKING";
  data?: any;
  disableEditing: bool;
  clickOptionMenu(isOpen: bool, optionId: number): void;
  deleteOption(optionId: number): void;
  clickOptionNext(optionId: number): void;
  changeTitle(): void;
}
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
    fontSize: "1em",
  },

  textField: {
    paddingLeft: "1em",
    paddingRight: "1em",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  checkBox: {
    paddingLeft: "1em",
    paddingRight: "1em",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
  accordion: {
    width: "100%",
    height: "fit-content",
  },
});

export default function TodoItem(props: TodoItemProps) {
  const { progress, data, disableEditing } = props;
  const { clickOptionMenu, deleteOption, clickOptionNext } = props;
  const [title, setTitle] = useState(data?.title);
  const changeTitle = async (event: any) => {
    // props.changeTitle(event.target.value);
    setTitle(event.target.value);
  };
  const classes = useStyles();
  const optionId = useCallback(() => {
    if (!!data?.id) {
      return data.id;
    } else {
      //임시 아이디
      const tempId = Date.now();
      return tempId;
    }
  }, [data]);
  // const options = useCallback(() => {
  //   switch (progress) {
  //     case "CREATING":
  //       return ["edit",""];
  //       case "EDITING":
  //       return [];
  //       case "VIEWING":
  //       return [];
  //   }
  // }, [progress]);

  // const selectedOption = (option: string) => {
  //   switch (option) {
  //     case "edit":
  //       pinTodo();
  //       break;
  //   }
  // };

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div className={itemStyle.title_container}>
          <Checkbox
            onFocus={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            size="small"
          />
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
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={itemStyle.comment_container}>
          <EditorJsComponent
            progress={progress}
            data={data}
            parentType="option"
            disableEditing={disableEditing}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
