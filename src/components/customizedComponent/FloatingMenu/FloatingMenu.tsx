import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { blue } from "@material-ui/core/colors";
import Dialog from "../Dialog";
import menuStyle from "./menu.module.scss";
import Popover from "@material-ui/core/Popover";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
export default function FloatingMenu(props) {
  const { options } = props;

  const useStyles = makeStyles(() =>
    createStyles({
      avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
      root: {
        backgroundColor: "transparent",
        height: "10px",
        width: "20px",
        minWidth: "20px",
        color: "#a0a0a0",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
        "&:hover": {
          background: "transparent",
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
      },
    })
  );

  const conatinerEl = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[1]);

  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setAnchorEl(null);
  };
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();
  function DotMenuDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, anchorEl, id } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    const setDialogSize = () => {
      console.log("conatinerEl ");
      if (!!conatinerEl.current) {
        console.log("conatinerEl " + conatinerEl.current.offsetWidth);
      }
    };
    useLayoutEffect(() => {
      window.addEventListener("resize", (_) => setDialogSize(), true);
      setDialogSize();
      return () => {
        window.removeEventListener("resize", setDialogSize);
      };
    }, [conatinerEl.current]);
    return (
      <Popover
        onClose={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div
          ref={conatinerEl}
          onload={() => {
            console.log("setDialogSize ");
            setDialogSize();
          }}
        >
          <List>
            {options.map((item) => {
              return (
                <ListItem button onClick={() => handleListItemClick(item)}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Popover>
    );
  }

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.root}
        // endIcon={
        //   <div>
        //     <MoreHorizIcon />
        //   </div>
        // }
      >
        <div>...</div>
      </Button>
      <DotMenuDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        id={id}
      />
    </div>
  );
}
