import React, { useEffect, useState } from "react";
import sideStyle from "./sidebar.module.scss";
import classNames from "classnames";
import { TextArea } from "../MemoItem/TextArea";
import PurposeArea from "../MemoItem/Purpose/PurposeArea";

export default function SideMenuBar(props: any) {
  const [memoState, setMemoState] = useState();
  const [memoPurpose, setMemoPurpose] = useState("suggestion");
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    setMemoState(props.memoState);
  }, [props.memoState]);
  const onPurposeClick = (purpose: string) => {
    setMemoPurpose(purpose);
  };
  return (
    <div>
      <div
        className={sideStyle.container}
        onClick={() => {
          props.focusHandler(memoState.itemID);
        }}
        onDragStartCapture={(event) => {
          event.stopPropagation();
          event.dataTransfer.setDragImage(new Image(), 0, 0);
        }}
      >
        <div className={sideStyle.delete_container}>
          <div
            className={sideStyle.delete_button}
            onClick={() => {
              props.deleteMemo(memoState.itemID);
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          ></div>
        </div>
        <div className={sideStyle.purpose_area}>
          <PurposeArea
            onPurposeClick={onPurposeClick}
            memoPurpose={memoPurpose}
          ></PurposeArea>
        </div>
        <div className={sideStyle.writer_area}>
          <div className={sideStyle.writer_text}>작성자</div>
          <div className={sideStyle.writer_name}>송병근</div>
        </div>
        <div className={sideStyle.middle_bar}></div>
        <div
          className={sideStyle.text_area_container}
          onKeyDown={(event) => {
            event.stopPropagation();
          }}
        >
          <TextArea
            inline
            width="100%"
            height="250px"
            maxHeight="250px"
            defaultValue={textContent}
            onChange={(event) => {
              setTextContent(event.target.value);
            }}
          />
        </div>
        <div className={sideStyle.open_comment_container}>
          <div className={sideStyle.open_comment}></div>
        </div>

        <div className={sideStyle.memo_comment_container}>
          <div className={sideStyle.memo_comment}></div>
          <div className={sideStyle.memo_comment_text_area}>
            <TextArea inline width="100%" height="50px" maxHeight="50px" />
          </div>
        </div>
      </div>
    </div>
  );
}
