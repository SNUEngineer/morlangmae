// @ts-nocheck
import React, { useCallback, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import mapStyle from "./MapPage.module.scss";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MapEngine from "./mapEngine/MapEngine";

export interface MapPageProps {
  id: number | "CREATING";
  progress: string;
  data?: any;
  title?: string;
  disableEditing: boolean;
  handleOpenFullMap(isOpen: bool): void;
}

const useStyles = makeStyles({
  map_close_button: {
    opacity: "0.5",
  },
});

export default function MapPage(props: MapPageProps) {
  const { handleOpenFullMap } = props;
  const { data, id, progress, disableEditing } = props;

  // const textFieldStyle = textFieldStyles();
  const classes = useStyles();
  return (
    <div
      className={mapStyle.root}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onScroll={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <MapEngine
        data={data}
        progress={progress}
        disableEditing={disableEditing}
      />
      <div className={mapStyle.map_close_button_container}>
        <IconButton
          color="primary"
          component="span"
          onClick={handleOpenFullMap(false)}
          size="small"
          className={classes.map_close_button}
        >
          <HighlightOffIcon fontSize="medium" />
        </IconButton>
      </div>
    </div>
  );
}
