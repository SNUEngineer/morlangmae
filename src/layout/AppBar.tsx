import React from "react";
import { Link } from "react-router-dom";
import {
  fade,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { ROOT } from "../common/paths";
import NotificationPageContainer from "../page/notification/NotificationPageContainer";
import {
  readNotification,
  getNotifications,
} from "../services/notification.service";
import { NotificationData } from "../components/notification/Notification";
import { useAsync } from "react-async";
import List from "@material-ui/core/List";
import NotificationListContainer from "./NotificationListContainer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 10000,
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

export default function AppBar(props: any) {
  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar} elevation={1}>
      <Toolbar>
        <Typography>
          <Link to={ROOT}>Bailey</Link>
        </Typography>
        <Notifications />
        {/* <Search /> */}
      </Toolbar>
    </MuiAppBar>
  );
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

const useStyles3 = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      zIndex: `${theme.zIndex.drawer + 10001} !important` as any,
    },
  })
);

async function getData() {
  return await getNotifications();
}

export function Notifications() {
  const classes = useStyles3();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Notifications
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          root: classes.popover,
        }}
      >
        <NotificationListContainer close={handleClose} />
      </Popover>
    </div>
  );
}

export function Search(props: any) {
  const classes = useStyles2();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search ..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
