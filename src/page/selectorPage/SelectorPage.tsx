// @ts-nocheck
import React, { useCallback, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import selectorStyle from "./SelectorPage.module.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SelectorItem from "./selectorItem/SelectorItem";
import EditorJsComponent from "../../components/customizedComponent/EditorJsComponent/EditorJsComponent";

import { SelectorData } from "../../services/selector.service";

export interface SelectorPageProps {
  clickBackward(): void;
  clickForward(): void;
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
    paddingLeft: "1em",
    paddingRight: "1em",
  },
  arrow_button: {
    padding: "0.3em",
  },
});
// const useStyles = makeStyles({
//   textFieldStyle: {
//     padding: "3em 0 3em 0",
//   },
// });
export default function SelectorPage(props: SelectorPageProps) {
  // const selectorList;
  console.log("fafafafd d d d ");
  const { clickOptionMenu, deleteOption, clickOptionNext } = props;
  // const selectors = [1, 2, 3];
  const selectors = props.data?.optionsData;
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
  const placeholder = "title을 입력해 주세요";
  return (
    <Grid
      xs={12}
      container
      justify="space-between"
      alignItems="center"
      direction="column"
      className={selectorStyle.container}
    >
      <Grid
        xs={12}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <IconButton
            color="primary"
            component="span"
            onClick={clickBackward}
            className={classes.arrow_button}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>

        <Grid item sm={10}>
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

        <Grid item>
          <IconButton
            color="primary"
            component="span"
            onClick={clickForward}
            className={classes.arrow_button}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div className={selectorStyle.comment_container}>
        <div className={selectorStyle.comment_paper}>
          <EditorJsComponent
            progress={progress}
            data={data}
            parentType="comment"
            disableEditing={disableEditing}
          />
        </div>
      </div>
      <div className={selectorStyle.option_container}>
        {selectors.map((item, index) => (
          <SelectorItem
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
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={11}></Grid>
      </Grid>
    </Grid>
  );
}
