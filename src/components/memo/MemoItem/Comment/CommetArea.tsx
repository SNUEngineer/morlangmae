import React, { useState, useEffect, useRef } from "react";
import commentStyle from "./commentArea.module.scss";
import { TextArea } from "../TextArea";

export default function CommentArea(props: any) {
  const commentTextAreaEl = useRef(null);

  return (
    <div
      className={commentStyle.memo_comment_container}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <div className={commentStyle.memo_comment}></div>
      <div className={commentStyle.memo_comment_text_area}>
        <TextArea
          inline
          width="100%"
          height="50px"
          maxHeight="50px"
          ref={commentTextAreaEl}
        />
      </div>
    </div>
  );
}
