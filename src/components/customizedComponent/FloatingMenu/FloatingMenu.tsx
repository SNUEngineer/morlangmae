// @ts-nocheck
import React, { useState, useRef, useCallback } from "react";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import { blue } from "@material-ui/core/colors";
import menuStyle from "./menu.module.scss";
import Popover from "@material-ui/core/Popover";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default function FloatingMenu(props) {
  const { options, selectedOption, viewType } = props;

  const useStyles = makeStyles(() =>
    createStyles({
      popover: {
        zIndex: "3000",
      },
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

  const [selectedValue, setSelectedValue] = useState(options[0]);

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

  function DotMenuDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open, anchorEl, id, viewType } = props;
    const popType = () => {
      switch (viewType) {
        case "fab":
        case "selector":
          return {
            anchor: {
              vertical: "center",
              horizontal: "left",
            },
            transform: {
              vertical: "center",
              horizontal: "right",
            },
          };

        case "list":
          return {
            anchor: {
              vertical: "bottom",
              horizontal: "right",
            },
            transform: {
              vertical: "top",
              horizontal: "right",
            },
          };
      }
    };
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
        anchorOrigin={popType().achor}
        transformOrigin={popType().transform}
        className={classes.popover}
      >
        <div ref={conatinerEl}>
          <List>
            {options.map((item, index) => {
              return (
                <div
                  key={index}
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
      {(!!viewType ? viewType === "fab" : true) && (
        <IconButton
          aria-describedby={id}
          color="primary"
          component="span"
          onClick={handleClickOpen}
        >
          {(!!viewType ? viewType === "fab" : true) && (
            <MenuIcon color="primary" />
          )}
          {(!!viewType ? viewType === "list" : true) && (
            <MoreVertIcon color="primary" />
          )}
          {(!!viewType ? viewType === "selector" : true) && (
            <MenuIcon color="primary" />
          )}
        </IconButton>
      )}

      <DotMenuDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        id={id}
        viewType={viewType}
      />
    </div>
  );
}
