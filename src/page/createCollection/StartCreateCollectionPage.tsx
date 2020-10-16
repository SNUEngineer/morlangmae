import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CreateDraftCollectionRequest } from "../../services/collection.service";
import pageStyle from "./startCreateCollectionPage.module.scss";
import classNames from "classnames";

export interface StartCreateCollectionPageProps {
  createCollection(request: CreateDraftCollectionRequest): Promise<void>;
  serviceTypes: string[];
}

export default function StartCreateCollectionPage(
  props: StartCreateCollectionPageProps
) {
  const useStyles = makeStyles(() =>
    createStyles({
      submit: {
        height: "50px",
        width: "137px",
        color: "black",
        fontFamily: "Noto Sans CJK KR Medium",
        fontSize: "18px",
        borderRadius: "30px",
        backgroundColor: "white",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
        "&:hover": {
          background: "#707070",
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
      },
    })
  );
  const classes = useStyles();
  return (
    <div className={pageStyle.root}>
      <div className={pageStyle.background_image}></div>
      <div className={pageStyle.content_container}>
        <div className={pageStyle.text_container}>
          <div className={pageStyle.text}>Show yours</div>
          <div className={pageStyle.text}>creativity</div>
        </div>
        <div className={pageStyle.button_container}>
          <div className={pageStyle.align_container}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              생성하기
            </Button>
            <div className={pageStyle.divider}></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              리스트
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
