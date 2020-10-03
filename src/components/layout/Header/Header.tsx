import React, { useState } from "react";

import headerStyle from "./Header.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export default function Header(props: any) {
  const { title, filter, handleChange, subMenuType } = props;
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

  const subMenu = () => {
    switch (subMenuType) {
      case "filter":
        return (
          <div className={headerStyle.sort_select}>
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
                <div className={headerStyle.menu_item_container}>전체</div>
              </MenuItem>
              <MenuItem
                className={classNames({
                  [classes.root]: true,
                  [classes.selected]: true,
                })}
                value="IN_PROGRESS"
              >
                <div className={headerStyle.menu_item_container}>진행</div>
              </MenuItem>
              <MenuItem
                className={classNames({
                  [classes.root]: true,
                  [classes.selected]: true,
                })}
                value="DONE"
              >
                <div className={headerStyle.menu_item_container}>완료</div>
              </MenuItem>
            </Select>
          </div>
        );
      case "goToAll":
      case "requestMemo":
        return (
          <div className={headerStyle.go_to_all_menu}>
            <div>전체보기</div>
          </div>
        );

      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <div className={headerStyle.header_container}>
        <div
          className={classNames({
            [headerStyle.text]: subMenuType !== "requestMemo",
            [headerStyle.request_memo_text]: subMenuType === "requestMemo",
          })}
        >
          {title}
        </div>

        <div className={headerStyle.sub_menu}>{subMenu()}</div>
      </div>
      {(!!subMenuType ? subMenuType !== "pinned" : true) && (
        <div className={headerStyle.divider} />
      )}
    </div>
  );
}
