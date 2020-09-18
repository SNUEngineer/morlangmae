import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Dialog from "../Dialog";
import menuStyle from "./menu.module.scss";

export default function FloatingMenu(props) {
  const { options } = props;

  const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

  const conatinerEl = useRef<any>(null);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[1]);
  const [menuCoordinates, setMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function DotMenuDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, menuCoordinates } = props;

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
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        position={menuCoordinates}
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
      </Dialog>
    );
  }

  return (
    <div>
      <div
        className={menuStyle.button_container}
        onClick={(event) => {
          //좌표 설정 제대로...

          setMenuCoordinates({
            x: event.target.getBoundingClientRect().x,
            y: event.target.getBoundingClientRect().y,
          });
          handleClickOpen();
        }}
      ></div>
      <DotMenuDialog
        selectedValue={selectedValue}
        menuCoordinates={menuCoordinates}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
