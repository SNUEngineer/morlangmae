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
        color: "#136913",
        fontFamily: "Noto Sans CJK KR Medium",
        fontSize: "16px",
        letterSpacing: "-0.8px",
        width: "170px",
        backgroundColor: "transparent",
        borderColor: "transparent",
        boxShadow: "none",
        padding: "5px",
        minHeight: "0px",

        "&:hover": {
          background: "transparent",
          boxShadow: "none",
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
            <div className={pageStyle.info_text}>생성 완료</div>
            <div className={pageStyle.button_container}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                endIcon={<img className={pageStyle.go_to_icon} alt={"icon"} />}
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
                endIcon={<img className={pageStyle.go_to_icon} alt={"icon"} />}
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
