// @ts-nocheck
import React from "react";

import selectorStyle from "./Selector.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export default function Selector(props: any) {
  const { filter, handleChange, theme, options } = props;
  const useStyles = makeStyles(() =>
    createStyles({
      selectBasic: {
        fontSize: "13px",
        letterSpacing: "-0.98px",
        fontFamily: "Noto Sans CJK KR Regular",
        ul: {
          backgroundColor: "red",
          minHeight: "1000px",
        },
      },
      collectionViewSelect: {
        fontSize: "16px",
        letterSpacing: "-0.8px",
        color: "#E2E2E2",
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
        zIndex: 10000,
      },
      selected: {
        "&:hover": {
          color: "#4BA34B",
        },
      },
    })
  );
  const classes = useStyles();
  const themeData = !!theme ? theme : "selectBasic";
  const iconComponent = () => {
    switch (themeData) {
      case "selectBasic":
        return <ExpandMoreRoundedIcon />;
      case "COLVIEW":
        return (
          <img
            alt={"icon"}
            className={selectorStyle.collection_view_drop_down_icon}
          />
        );
      default:
        return ExpandMoreRoundedIcon;
    }
  };

  return (
    <div className={selectorStyle.root}>
      <Select
        value={filter}
        onChange={handleChange}
        className={classNames({
          [classes.selectBasic]: themeData === "selectBasic",
          [classes.collectionViewSelect]: themeData === "COLVIEW",
        })}
        MenuProps={{
          style: {
            zIndex: 3000,
          },
          ".MuiPaper-root": {
            style: {
              backgroundColor: "blue",
            },
          },
        }}
        IconComponent={iconComponent}
        disableUnderline
      >
        {options.map((item) => {
          return (
            <MenuItem
              className={classNames({
                [classes.root]: true,
                [classes.selected]: true,
              })}
              value={item.value}
            >
              <div className={selectorStyle.menu_item_container}>
                {item.text}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
