import React, { useState } from "react";
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

export default function FloatingMenu(props) {
  const { options } = props;

  const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

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

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        position={menuCoordinates}
        classes={{
          paperScroll: {
            alignItems: "baseline",
          },
          paper: {
            margin: "100px",
            left: "300px",
            position: "relative",
            overflowY: "auto",
            backgroundColor: "red",
          },
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
      </Dialog>
    );
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={(event) => {
          //좌표 설정 제대로...
          setMenuCoordinates({
            x: event.target.getBoundingClientRect().x,
            y: event.target.getBoundingClientRect().y,
          });
          handleClickOpen();
        }}
      >
        ...
      </Button>
      <DotMenuDialog
        selectedValue={selectedValue}
        menuCoordinates={menuCoordinates}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
