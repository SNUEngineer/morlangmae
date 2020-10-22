import React, { useEffect, useState, useCallback } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useLocation, useHistory } from "react-router-dom";
import menuStyle from "./Drawer.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

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
  const history = useHistory();
  const classes = useStyles();
  const [clicked, setClicked] = useState("collection");
  const [lastPath, setLastPath] = useState({
    collection: "/collections/my",
    memo: "/memos/home",
    persona: "/persona",
  });
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
  ];
  useEffect(() => {
    const currentPath = pathname + search;
    if (pathname.startsWith("/collections/")) {
      setClicked("collection");
      setLastPath((prevState) => ({ ...prevState, collection: currentPath }));
    }
    if (pathname.startsWith("/memos/")) {
      setClicked("memo");
      setLastPath((prevState) => ({ ...prevState, memo: currentPath }));
    }
    if (pathname.startsWith("/persona")) {
      setClicked("persona");
      setLastPath((prevState) => ({ ...prevState, persona: currentPath }));
    }
  }, [pathname, search]);

  const clickMenu = useCallback(
    (name: string) => {
      switch (name) {
        case "collection":
          history.push(`${lastPath.collection}`);
          return;
        case "memo":
          history.push(`${lastPath.memo}`);
          return;
        case "persona":
          history.push(`${lastPath.persona}`);
          return;
        default:
          history.push(`${lastPath.collection}`);
          return;
      }
    },
    [lastPath, history]
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
