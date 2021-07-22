// @ts-nocheck
import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import itemStyle from "./SelectorItem.module.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import FloatingMenu from "../../../components/customizedComponent/FloatingMenu/FloatingMenu";
import EditorJsComponent from "../../../components/customizedComponent/EditorJsComponent/EditorJsComponent";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
export interface SelectorItemProps {
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
    fontSize: "1.3em",
  },
  textField: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

export default function SelectorItem(props: SelectorItemProps) {
  // const selectorList;
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
  //       pinTask();
  //       break;
  //   }
  // };

  return (
    <div className={itemStyle.item_container}>
      <div className={itemStyle.item_list_sign_container}>
        <div className={itemStyle.vertical_sign} />
        <div className={itemStyle.horizontal_sign} />
      </div>
      <div className={itemStyle.item_page}>
        <div className={itemStyle.title_container}>
          <div className={itemStyle.item_title}>
            <TextField
              name="title"
              required
              fullWidth
              id="title"
              autoFocus
              value={title}
              onChange={changeTitle}
              placeholder="Untitle"
              size="medium"
              InputProps={{ classes }}
              className={classes.textField}
            />
          </div>
          <div className={itemStyle.item_menu}>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                clickOptionMenu(true, optionId);
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={itemStyle.item_menu}>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                deleteOption(optionId);
              }}
            >
              <HighlightOffIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={itemStyle.item_menu}>
            <IconButton
              color="primary"
              component="span"
              onClick={() => {
                clickOptionNext(optionId);
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div className={itemStyle.comment_container}>
          <div className={itemStyle.comment_paper}>
            <EditorJsComponent
              progress={progress}
              data={data}
              parentType="option"
              disableEditing={disableEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
