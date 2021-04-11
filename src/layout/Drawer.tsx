import React, { useEffect, useState, useCallback } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import menuStyle from "./Drawer.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid"; 
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
  const [clicked, setClicked] = useState("sent");
  const [lastPath, setLastPath] = useState({
    sent: "/sent",
    received: "/received",
    notification: "/notification",
    menu: "/menu",
  });
  // const [lastPath, setLastPath] = useState({
  //   collection: "/collections/my",
  //   memo: "/memos/home",
  //   persona: "/persona",
  // });
  const pathname = "home"
  const search = ""
  //const { pathname, search } = useLocation();
  const categories = [
    {
      name: "sent",
      text: "보낸 메세지",
    },
    {
      name: "received",
      text: "받은 메세지",
    },
    {
      name: "notification",
      text: "알림",
    },
    {
      name: "menu",
      text: "메뉴",
    },
  ];
  useEffect(() => {
    const currentPath = pathname + search;
    //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 저장하여, 추후 복귀시에 이전 작업으로부터의 연속성을 갖도록 함
    if (pathname.startsWith("/sent")) {
      setClicked("sent");
      setLastPath((prevState) => ({ ...prevState, sent: currentPath }));
    }
    if (pathname.startsWith("/received")) {
      setClicked("received");
      setLastPath((prevState) => ({ ...prevState, received: currentPath }));
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
        case "sent":
          //현재 활성화된 메뉴 클릭시, 해당 메뉴의 홈으로 이동 (컬렉션의 경우, search tab으로 이동)
          //다른 메뉴 클릭시, 해당 메뉴의 최신 url을 불러옴으로서 ux개선
          if (clicked === "sent") {
            history.push(`${COLLECTION_LIST_MY_COLLECTION}`);
          } else {
            history.push(`${lastPath.sent}`);
          }
          return;
        case "received":
          if (clicked === "received") {
            history.push(`${MEMO_HOME}`);
          } else {
            history.push(`${lastPath.received}`);
          }
          return;
        case "notification":
          if (clicked === "notification") {
            history.push(`${PROFILE}`);
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
          history.push(`${lastPath.sent}`);
          return;
      }
    },
    [lastPath, history, clicked]
  );

  return (
    <div className={menuStyle.bottom_container}>
      <div className={menuStyle.fixed_container}>
        <div className={menuStyle.menu_container}>
        <Grid container >
          {categories.map((c) => (
            
            <Grid item xs={12} sm={3}>
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
                    [menuStyle.sent_icon]: c.name === "sent",
                    [menuStyle.received_icon]: c.name === "received",
                    [menuStyle.notification_icon]: c.name === "notification",
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
