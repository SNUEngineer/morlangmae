import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItemLink from "../../components/ListItemLink";
import {
  COLLECTION_LIST_MY_COLLECTION,
  COLLECTION_LIST_CREATED,
  COLLECTION_LIST,
} from "../../common/paths";
import tabStyle from "./CollectionTab.module.scss";
import classNames from "classnames";

export default function CollectionTab() {
  const [clicked,setClicked] = useState("home");
  const categories = [
    {
      name: "home",
      text: "나의 컬렉션",
    },
    {
      name: "collection",
      text: "탐색",
    },
    {
      name: "article",
      text: "생성",
    },
  ];

  return (
    <div>
      <div className={tabStyle.colleciont_title_text}>Collection</div>
      <div className={tabStyle.tab_block}>
        <div className={tabStyle.underbar}></div>
        {categories.map((c) => (
          <div
            className={classNames({
              [tabStyle.tab_element]: true,
              [tabStyle.tab_element_activated]: c.name===clicked ? true :false ,
            })}
            key={c.name}
            onClick={() => setClicked(c.name)}
          >
            <div className={tabStyle.tab_text}>{c.text}</div>
          </div>
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
