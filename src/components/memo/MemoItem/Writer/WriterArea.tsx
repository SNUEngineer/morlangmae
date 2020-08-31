import React, { useEffect, useRef } from "react";
import writerStyle from "./writerArea.module.scss";

export default function WriterArea(props: any) {
  return (
    <div>
      <div className={writerStyle.writer_text}>작성자</div>
      <div className={writerStyle.writer_name}>송병근</div>
    </div>
  );
}
