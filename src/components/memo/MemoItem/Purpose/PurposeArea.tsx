import React, { useState, useEffect } from "react";
import purposeStyle from "./purposeArea.module.scss";
import classNames from "classnames";

export default function PurposeArea(props: any) {
  const [memoPurpose, setMemoPurpose] = useState("suggestion");

  useEffect(() => {
    setMemoPurpose(props.memoPurpose);
  }, [props.memoPurpose]);

  return (
    <div>
      <div
        className={classNames({
          [purposeStyle.purpose_left]: true,
          [purposeStyle.purpose_button_basic]: true,
          [purposeStyle.purpose_button_selected]: memoPurpose === "suggestion",
          [purposeStyle.purpose_button_unselected]:
            memoPurpose !== "suggestion",
        })}
        onClick={() => {
          props.onPurposeClick("suggestion");
        }}
      >
        제안
      </div>
      <div
        className={classNames({
          [purposeStyle.purpose_center]: true,
          [purposeStyle.purpose_button_basic]: true,
          [purposeStyle.purpose_button_selected]: memoPurpose === "request",
          [purposeStyle.purpose_button_unselected]: memoPurpose !== "request",
        })}
        onClick={() => {
          props.onPurposeClick("request");
        }}
      >
        요청
      </div>
      <div
        className={classNames({
          [purposeStyle.purpose_right]: true,
          [purposeStyle.purpose_button_basic]: true,
          [purposeStyle.purpose_button_selected]: memoPurpose === "question",
          [purposeStyle.purpose_button_unselected]: memoPurpose !== "question",
        })}
        onClick={() => {
          props.onPurposeClick("question");
        }}
      >
        질문
      </div>
    </div>
  );
}
