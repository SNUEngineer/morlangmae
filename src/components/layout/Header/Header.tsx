// @ts-nocheck
import React, { useState } from "react";

import headerStyle from "./Header.module.scss";
import Select from "@material-ui/core/Select";
import Selector from "../Selector/Selector";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { COLLECTION_LIST_PAGE } from "../../../common/paths";
import { useHistory } from "react-router-dom";
export default function Header(props: any) {
  //컬렉션과 메모에서, 각 컨텐츠 노출 종류 의 제목 (최근 접속한 컬렉션, 보낸 메모 받은 메모 등)
  //과, 컨텐츠 정렬 메뉴를 묶은 컴포넌트
  const { title, filter, handleChange, subMenuType, options, type } = props;
  //options = 컨텐츠 정렬 옵션
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
  const history = useHistory();
  const onShowAllClick = async () => {
    const path = `${COLLECTION_LIST_PAGE}/${type}`;
    history.push(path);
  };

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
              {options.map((item) => {
                return (
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value={item.value}
                  >
                    <div className={headerStyle.menu_item_container}>
                      {item.text}
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        );
      case "goToAll":
      case "requestMemo":
        return (
          <div className={headerStyle.go_to_all_menu} onClick={onShowAllClick}>
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
