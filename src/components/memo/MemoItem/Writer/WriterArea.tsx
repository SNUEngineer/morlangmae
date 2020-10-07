import React, { useEffect, useRef } from "react";
import writerStyle from "./writerArea.module.scss";

export default function WriterArea(props: any) {
  return (
    <div className={writerStyle.writer_container}>
      <div className={writerStyle.align_container}>
        <div className={writerStyle.writer_text}>작성자</div>
        <div className={writerStyle.writer_name}>송병근</div>
      </div>
    </div>
  );
}
