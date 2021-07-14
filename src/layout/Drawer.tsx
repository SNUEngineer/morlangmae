import React, { useEffect, useState, useCallback } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import menuStyle from "./Drawer.module.scss";

import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import {
  COLLECTION_LIST_MY_COLLECTION,
  MEMO_HOME,
  NOTIFICATION,
  PROFILE,
} from "../common/paths";

export default function Drawer() {
  //좌측 메뉴 탭
  const history = useHistory();
  // const pathname = "home";
  // const search = "";
  const { pathname, search } = useLocation();
  const [clicked, setClicked] = useState("list");
  const [lastPath, setLastPath] = useState({
    list: "/list",
    task: "/task",
    analysis: "/analysis",
    notification: "/notification",
    menu: "/menu",
  });

  const categories = [
    {
      name: "list",
      text: "list",
    },
    {
      name: "task",
      text: "task",
    },
    {
      name: "analysis",
      text: "analysis",
    },
    {
      name: "notification",
      text: "notification",
    },
    {
      name: "menu",
      text: "menu",
    },
  ];
  useEffect(() => {
    const currentPath = pathname + search;
    //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 저장하여, 추후 복귀시에 이전 작업으로부터의 연속성을 갖도록 함
    if (pathname.startsWith("/list")) {
      setClicked("list");
      setLastPath((prevState) => ({ ...prevState, list: currentPath }));
    }
    if (pathname.startsWith("/task")) {
      setClicked("task");
      setLastPath((prevState) => ({ ...prevState, task: currentPath }));
    }
    if (pathname.startsWith("/analysis")) {
      setClicked("analysis");
      setLastPath((prevState) => ({ ...prevState, analysis: currentPath }));
    }
    if (pathname.startsWith("/notification")) {
      setClicked("notification");
      setLastPath((prevState) => ({ ...prevState, notification: currentPath }));
    }
    if (pathname.startsWith("/menu")) {
      setClicked("menu");
      setLastPath((prevState) => ({ ...prevState, menu: currentPath }));
    }
  }, [pathname, search]);

  const clickMenu = useCallback(
    (name: string) => {
      switch (name) {
        case "list":
          //현재 활성화된 메뉴 클릭시, 해당 메뉴의 홈으로 이동 (컬렉션의 경우, search tab으로 이동)
          //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 불러옴으로서 ux개선
          if (clicked === "list") {
            history.push(`${COLLECTION_LIST_MY_COLLECTION}`);
          } else {
            history.push(`${lastPath.list}`);
          }
          return;
        case "task":
          if (clicked === "task") {
            history.push(`${MEMO_HOME}`);
          } else {
            history.push(`${lastPath.task}`);
          }
          return;
        case "analysis":
          if (clicked === "analysis") {
            history.push(`${PROFILE}`);
          } else {
            history.push(`${lastPath.analysis}`);
          }

          return;
        case "notification":
          if (clicked === "notification") {
            history.push(`${NOTIFICATION}`);
          } else {
            history.push(`${lastPath.notification}`);
          }
          return;
        case "menu":
          if (clicked === "menu") {
            history.push(`${NOTIFICATION}`);
          } else {
            history.push(`${lastPath.menu}`);
          }
          return;
        default:
          history.push(`${lastPath.list}`);
          return;
      }
    },
    [lastPath, history, clicked]
  );

  return (
    <div className={menuStyle.bottom_container}>
      <div className={menuStyle.fixed_container}>
        <div className={menuStyle.menu_container}>
          <Grid container>
            {categories.map((c) => (
              <Grid item xs={10} sm={2}>
                <div
                  className={classNames({
                    [menuStyle.menu_item]: true,
                    [menuStyle.menu_item_inactivated]:
                      c.name !== clicked ? true : false,
                    [menuStyle.menu_item_activated]:
                      c.name === clicked ? true : false,
                  })}
                  onClick={() => {
                    clickMenu(c.name);
                  }}
                >
                  <div className={menuStyle.icon_container}>
                    <img
                      className={classNames({
                        [menuStyle.list_icon]: c.name === "list",
                        [menuStyle.task_icon]: c.name === "task",
                        [menuStyle.analysis_icon]: c.name === "analysis",
                        [menuStyle.notification_icon]:
                          c.name === "notification",
                        [menuStyle.menu_icon]: c.name === "menu",
                      })}
                      alt={"icon"}
                    />
                  </div>
                  <div className={menuStyle.text}>{c.text}</div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
