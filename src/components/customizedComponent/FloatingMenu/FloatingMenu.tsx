// @ts-nocheck
import React, { useState, useRef, useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import { blue } from "@material-ui/core/colors";
import menuStyle from "./menu.module.scss";
import Popover from "@material-ui/core/Popover";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function FloatingMenu(props) {
  const { options, selectedOption } = props;

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
        minWidth: "0px",
        padding: "0px",
        color: "#a0a0a0",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
        "&:hover": {
          background: "transparent",
          boxShadow: "none",
        },
      },
      item: {
        position: "relative",
        fontSize: "13px",
        letterSpacing: "-0.98px",
        fontFamily: "Noto Sans CJK KR Regular",
        minWidth: "86px",
        width: "190px",
        height: "25px",
        textAlign: "center",
        color: "#707070",
        "&:hover": {
          background: "#f0f0f0",
          color: "#4BA34B",
        },
        borderBottomStyle: "solid",
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: "0.5px",
      },
      menu_item_container: {
        position: "absolute",
        top: "50%",
        left: "50%",

        transform: "translate(-50%, -50%)",
      },
    })
  );

  const conatinerEl = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[1]);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    event.preventDefault();
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
      selectedOption(value);
    };

    return (
      <Popover
        onClose={handleClose}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div ref={conatinerEl}>
          <List>
            {options.map((item) => {
              return (
                <div
                  className={classes.item}
                  onClick={() => {
                    handleListItemClick(item);
                  }}
                >
                  <div className={classes.menu_item_container}>{item}</div>
                </div>
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
      >
        <div className={menuStyle.icon_container}>
          <img className={menuStyle.dot_icon} alt={"icon"} />
        </div>
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
