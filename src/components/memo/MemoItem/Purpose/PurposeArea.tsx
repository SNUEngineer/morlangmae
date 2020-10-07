import React, { useState, useEffect } from "react";
import purposeStyle from "./purposeArea.module.scss";
import classNames from "classnames";

export default function PurposeArea(props: any) {
  const { isDragging, onPurposeClick, itemID, memoPurpose } = props;

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
          if (isDragging) return;
          onPurposeClick(itemID, "suggestion");
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
          if (isDragging) return;
          onPurposeClick(itemID, "request");
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
          if (isDragging) return;
          onPurposeClick(itemID, "question");
        }}
      >
        질문
      </div>
    </div>
  );
}
