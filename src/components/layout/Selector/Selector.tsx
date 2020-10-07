import React from "react";

import selectorStyle from "./Selector.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export default function Selector(props: any) {
  const { filter, handleChange } = props;
  const useStyles = makeStyles(() =>
    createStyles({
      select: {
        fontSize: "13px",
        letterSpacing: "-0.98px",
        fontFamily: "Noto Sans CJK KR Regular",
        ul: {
          backgroundColor: "red",
          minHeight: "1000px",
        },
      },
      root: {
        fontSize: "11.5px",
        letterSpacing: "-0.98px",
        fontFamily: "Noto Sans CJK KR Regular",
        minWidth: "86px",
        textAlign: "center",
        color: "#707070",
        "&:hover": {
          background: "#f0f0f0",
          color: "#4BA34B",
        },
        borderBottomStyle: "solid",
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: "0.5px",
      },
      selected: {
        "&:hover": {
          color: "#4BA34B",
        },
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={selectorStyle.root}>
      <Select
        value={filter}
        onChange={handleChange}
        className={classNames({
          [classes.select]: true,
          [classes.icon]: true,
        })}
        IconComponent={ExpandMoreRoundedIcon}
        disableUnderline
      >
        <MenuItem
          className={classNames({
            [classes.root]: true,
            [classes.selected]: true,
          })}
          value="ALL"
        >
          <div className={selectorStyle.menu_item_container}>전체</div>
        </MenuItem>
        <MenuItem
          className={classNames({
            [classes.root]: true,
            [classes.selected]: true,
          })}
          value="IN_PROGRESS"
        >
          <div className={selectorStyle.menu_item_container}>진행</div>
        </MenuItem>
        <MenuItem
          className={classNames({
            [classes.root]: true,
            [classes.selected]: true,
          })}
          value="DONE"
        >
          <div className={selectorStyle.menu_item_container}>완료</div>
        </MenuItem>
      </Select>
    </div>
  );
}
