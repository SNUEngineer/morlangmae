import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import MuiDrawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItemLink from "../components/ListItemLink";
import PersonIcon from "@material-ui/icons/Person";
import CollectionsIcon from "@material-ui/icons/Collections";
import NoteIcon from "@material-ui/icons/Note";
import Divider from "@material-ui/core/Divider";
import { COLLECTION_LIST, PROFILE } from "../common/paths";
import menuStyle from "./Drawer.module.scss";
import { Link } from "react-router-dom";

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
  const classes = useStyles();

  return (
    <div className={menuStyle.side_container}>
      <div className={menuStyle.fixed_container}>
        <div className={menuStyle.menu_container}>
          <Link className={menuStyle.menu_item} to={COLLECTION_LIST}>
            <div className={menuStyle.icon_container}>
              <img className={menuStyle.collection_icon} alt={"icon"} />
            </div>
            <div className={menuStyle.text}>컬렉션</div>
          </Link>
          <Link className={menuStyle.menu_item} to="/memos">
            <div className={menuStyle.icon_container}>
              <img className={menuStyle.memo_icon} alt={"icon"} />
            </div>
            <div className={menuStyle.text}>메모</div>
          </Link>
          <Link className={menuStyle.menu_item} to={PROFILE}>
            <div className={menuStyle.icon_container}>
              <img className={menuStyle.profile_icon} alt={"icon"} />
            </div>
            <div className={menuStyle.text}>프로필</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
