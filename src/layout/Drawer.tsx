import React, { useEffect, useState, useCallback } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import menuStyle from "./Drawer.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  COLLECTION_LIST_MY_COLLECTION,
  MEMO_HOME,
  NOTIFICATION,
  PROFILE,
} from "../common/paths";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function Drawer() {
  //좌측 메뉴 탭
  const history = useHistory();
  const classes = useStyles();
  const [clicked, setClicked] = useState("collection");
  const [lastPath, setLastPath] = useState({
    collection: "/collections/my",
    memo: "/memos/home",
    persona: "/persona",
    notification: "/notification",
  });
  // const [lastPath, setLastPath] = useState({
  //   collection: "/collections/my",
  //   memo: "/memos/home",
  //   persona: "/persona",
  // });
  const { pathname, search } = useLocation();
  const categories = [
    {
      name: "collection",
      text: "컬렉션",
    },
    {
      name: "memo",
      text: "메모",
    },
    {
      name: "persona",
      text: "프로필",
    },
    {
      name: "notification",
      text: "알림",
    },
  ];
  useEffect(() => {
    const currentPath = pathname + search;
    //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 저장하여, 추후 복귀시에 이전 작업으로부터의 연속성을 갖도록 함
    if (pathname.startsWith("/collections")) {
      setClicked("collection");
      setLastPath((prevState) => ({ ...prevState, collection: currentPath }));
    }
    if (pathname.startsWith("/memos")) {
      setClicked("memo");
      setLastPath((prevState) => ({ ...prevState, memo: currentPath }));
    }
    if (pathname.startsWith("/persona")) {
      setClicked("persona");
      setLastPath((prevState) => ({ ...prevState, persona: currentPath }));
    }
    if (pathname.startsWith("/notification")) {
      setClicked("notification");
      setLastPath((prevState) => ({ ...prevState, notification: currentPath }));
    }
  }, [pathname, search]);

  const clickMenu = useCallback(
    (name: string) => {
      switch (name) {
        case "collection":
          //현재 활성화된 메뉴 클릭시, 해당 메뉴의 홈으로 이동 (컬렉션의 경우, search tab으로 이동)
          //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 불러옴으로서 ux개선
          if (clicked === "collection") {
            history.push(`${COLLECTION_LIST_MY_COLLECTION}`);
          } else {
            history.push(`${lastPath.collection}`);
          }

          return;
        case "memo":
          if (clicked === "memo") {
            history.push(`${MEMO_HOME}`);
          } else {
            history.push(`${lastPath.memo}`);
          }
          return;
        case "persona":
          if (clicked === "persona") {
            history.push(`${PROFILE}`);
          } else {
            history.push(`${lastPath.persona}`);
          }

          return;
        case "notification":
          if (clicked === "notification") {
            history.push(`${NOTIFICATION}`);
          } else {
            history.push(`${lastPath.notification}`);
          }

          return;
        default:
          history.push(`${lastPath.collection}`);
          return;
      }
    },
    [lastPath, history, clicked]
  );

  return (
    <div className={menuStyle.side_container}>
      <div className={menuStyle.fixed_container}>
        <div className={menuStyle.menu_container}>
          {categories.map((c) => (
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
                    [menuStyle.collection_icon]: c.name === "collection",
                    [menuStyle.memo_icon]: c.name === "memo",
                    [menuStyle.profile_icon]: c.name === "persona",
                  })}
                  alt={"icon"}
                />
              </div>
              <div className={menuStyle.text}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
