import React, { useState } from "react";
import { CreateDraftCollectionRequest } from "../../services/collection.service";
import pageStyle from "./creatingCollectionPage.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, theme } from "@material-ui/core/styles";
import classNames from "classnames";

export interface CreatingCollectionPageProps {
  createCollection(request: CreateDraftCollectionRequest): Promise<void>;
  serviceTypes: string[];
}

export default function CreatingCollectionPage(
  props: CreatingCollectionPageProps
) {
  const useStyles = makeStyles(() =>
    createStyles({
      submit: {
        height: "40px",
        width: "145px",
        color: "black",
        fontFamily: "Noto Sans CJK KR Medium",
        fontSize: "13px",
        borderRadius: "30px",
        backgroundColor: "#707070",
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
  const [stage, setStage] = useState(1);
  const content = () => {
    switch (stage) {
      case 0:
        return (
          <div
            className={classNames({
              [pageStyle.container_1]: true,
              [pageStyle.fade_in]: true,
            })}
          >
            <div className={pageStyle.bailey_text}>Bailey</div>
            <div className={pageStyle.progress_container}>
              <div className={pageStyle.align_container}>
                <CircularProgress />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div
            className={classNames({
              [pageStyle.container_1]: true,
              [pageStyle.fade_in]: true,
            })}
          >
            <div className={pageStyle.bailey_text}>Bailey</div>
            <div className={pageStyle.button_container}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                생성한 컬렉션으로
              </Button>
              <div className={pageStyle.divider}></div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                컬렉션 홈으로
              </Button>
            </div>
          </div>
        );
    }
  };
  return (
    <div className={pageStyle.root}>
      <div className={pageStyle.content_container}>{content()}</div>
    </div>
  );
}
