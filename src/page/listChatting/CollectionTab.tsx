// @ts-nocheck
import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItemLink from "../../components/ListItemLink";
import {
  COLLECTION_LIST_MY_COLLECTION,
  COLLECTION_LIST_CREATED,
  COLLECTION_LIST,
} from "../../common/paths";
import tabStyle from "./CollectionTab.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function CollectionTab() {
  const [clicked, setClicked] = useState("my");
  const { pathname } = useLocation();

  const categories = [
    {
      name: "my",
      text: "나의 컬렉션",
    },
    {
      name: "discover",
      text: "탐색",
    },
    {
      name: "created",
      text: "생성",
    },
  ];
  useEffect(() => {
    if (pathname.includes("my")) {
      setClicked("my");
    }
    if (pathname.includes("discover")) {
      setClicked("discover");
    }
    if (pathname.includes("created")) {
      setClicked("created");
    }
  }, [pathname]);
  const getLink = (name: string) => {
    switch (name) {
      case "my":
        return COLLECTION_LIST_MY_COLLECTION;
      case "discover":
        return COLLECTION_LIST;
      case "created":
        return COLLECTION_LIST_CREATED;
      default:
        return COLLECTION_LIST_MY_COLLECTION;
    }
  };
  return (
    <div>
      <div className={tabStyle.colleciont_title_text}>Collection</div>
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
