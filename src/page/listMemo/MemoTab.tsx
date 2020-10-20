// @ts-nocheck
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemLink from "../../components/ListItemLink";
import { MEMO_BINGE, MEMO_HOME, MEMO_LIST } from "../../common/paths";
import tabStyle from "./MemoTab.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function CollectionTab() {
  const [clicked, setClicked] = useState("my");
  const { pathname } = useLocation();

  const categories = [
    {
      name: "binge",
      text: "모아보기",
    },
    {
      name: "home",
      text: "홈",
    },
    {
      name: "list",
      text: "리스트",
    },
  ];
  useEffect(() => {
    if (pathname.includes("binge")) {
      setClicked("binge");
    }
    if (pathname.includes("home")) {
      setClicked("home");
    }
    if (pathname.includes("list")) {
      setClicked("list");
    }
  }, [pathname]);
  const getLink = (name: string) => {
    switch (name) {
      case "binge":
        return MEMO_BINGE;
      case "home":
        return MEMO_HOME;
      case "list":
        return MEMO_LIST;
      default:
        return MEMO_HOME;
    }
  };
  return (
    <div>
      <div className={tabStyle.colleciont_title_text}>Memo</div>
      <div className={tabStyle.tab_block}>
        <div className={tabStyle.underbar}></div>
        {categories.map((c) => (
          <Link
            className={classNames({
              [tabStyle.tab_element]: true,
              [tabStyle.tab_element_activated]:
                c.name === clicked ? true : false,
            })}
            to={getLink(c.name)}
            key={c.name}
            onClick={() => setClicked(c.name)}
          >
            <div className={tabStyle.tab_text}>{c.text}</div>
          </Link>
        ))}
      </div>

      {/* <List>
        <div className={menuStyle.container}></div>
        <div className={menuStyle.container}></div>
        <div className={menuStyle.container}></div>
        <ListItemLink
          to={COLLECTION_LIST_MY_COLLECTION}
          primary="나의 컬렉션"
        />
        <ListItemLink to={COLLECTION_LIST} primary="탐색" />
        <ListItemLink to={COLLECTION_LIST_CREATED} primary="생성" />
      </List> */}
    </div>
  );
}
