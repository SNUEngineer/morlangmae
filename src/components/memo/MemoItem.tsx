import React, { useCallback, useState } from "react";
// import { Line } from "draw-shape-reactjs";
import itemStyle from "./memoItem.module.scss";

import Draggable from "react-draggable";
import LineTo from "react-lineto";
import { Line } from "@vx/shape";
// @ts-ignore
import SplitPane from "react-split-pane/lib/SplitPane";
// @ts-ignore
import Pane from "react-split-pane/lib/Pane";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import TextArea from "@atlaskit/textarea";

export default function MemoItem(props: any) {
  const memoSize = {
    w: 350,
    h: 400,
  };
  const writerID = props.writerID;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [memoPosition, setMemoPosition] = useState({
    x: props.memoState.x,
    y: props.memoState.y,
  });
  const [anchor, setAnchor] = useState({
    exist: false,
    zoneDown: false,
    x: 0,
    y: 0,
  });
  const [memoPurpose, setMemoPurpose] = useState("suggestion");
  //제안 요청 질문 suggestion, request, question

  const onPurposeClick = (purpose: string) => {
    setMemoPurpose(purpose);
  };

  const onMouseDown = (event) => {
    if (event.nativeEvent.which === 3) {
      event.preventDefault();
      const newAnchor = {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };
    }
  };
  const onMouseUp = (event) => {
    if (event.nativeEvent.which === 3) {
      event.preventDefault();
      const newAnchor = {
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };
    }
  };
  const onDrag = (e, uiData) => {
    console.log("uiData " + uiData.x + "   " + uiData.y);
  };
  const onDragAnchor = (e, uiData) => {
    console.log("uiData    " + uiData.x + "   " + uiData.y);
  };

  const onAnchorZoneDragEnd = (event) => {
    console.log("drag end ");
    console.log("drag end " + event.x + "   " + event.y);
  };
  const onAnchorZoneMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setAnchor((prevState) => ({ ...prevState, zoneDown: true }));
  };

  const onAnchorZoneMouseUp = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [anchor]
  );

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  return (
    <div className={itemStyle.memo_item}>
      {true && (
        <Draggable
          disabled={false}
          defaultPosition={anchor}
          onDrag={(e, coreData) => {
            setAnchor((prevState) => ({
              ...prevState,
              x: coreData.x,
              y: coreData.y,
            }));
          }}
          bounds={{
            left: 0,
            top: 0,
            right: 2000 - memoSize.w,
            bottom: 2000 - memoSize.h,
          }}
          //pan board 너비 높이 - 메모 아이템 너비 높이
          scale={props.scale}
        >
          <div className={itemStyle.anchor}></div>
        </Draggable>
      )}
      {true && (
        // <Line
        //   from={[memoPosition.x, memoPosition.y]}
        //   to={[anchor.x, anchor.y]}
        //   color="#1DBFE7"
        //   lineWeight={1}
        // />
        // <LineTo
        //   from={itemStyle.anchor}
        //   to={itemStyle.anchor_zone}
        //   zIndex={1}
        //   borderColor={"purple"}
        // />

        <Line
          from={{ x: memoPosition.x, y: memoPosition.y }}
          to={{ x: anchor.x, y: anchor.y }}
          fill="#000000"
          width={3}
          z={999}
        ></Line>
      )}

      <Draggable
        disabled={false}
        defaultPosition={props.memoState}
        bounds={{ left: 0, top: 0, right: 1800, bottom: 1800 }} //pan board 너비 높이 - 메모 아이템 너비 높이
        zoomRatio={props.scale}
        defaultClassName={itemStyle.memo_draggable}
        onDrag={(e, coreData) => {
          setMemoPosition(coreData);
        }}
      >
        <div className={itemStyle.container}>
          {/* <SplitPane
            split="horizontal"
            className={itemStyle.split_pane}
            resizerStyle={{
              backgroundColor: "#ff0000",
              height: "10px",
              opacity: 1,
            }}
          >
            <Pane initialSize="200px" minSize="200px" maxSize="200px">
              <div className={itemStyle.content}></div>
            </Pane>
            <Pane>
              <div className={itemStyle.thread}></div>
            </Pane>
          </SplitPane> */}
          <div className={itemStyle.purpose_area}>
            <div
              className={classNames({
                [itemStyle.purpose_left]: true,
                [itemStyle.purpose_button_basic]: true,
                [itemStyle.purpose_button_selected]:
                  memoPurpose === "suggestion",
                [itemStyle.purpose_button_unselected]:
                  memoPurpose !== "suggestion",
              })}
              onClick={() => {
                onPurposeClick("suggestion");
              }}
            >
              제안
            </div>
            <div
              className={classNames({
                [itemStyle.purpose_center]: true,
                [itemStyle.purpose_button_basic]: true,
                [itemStyle.purpose_button_selected]: memoPurpose === "request",
                [itemStyle.purpose_button_unselected]:
                  memoPurpose !== "request",
              })}
              onClick={() => {
                onPurposeClick("request");
              }}
            >
              요청
            </div>
            <div
              className={classNames({
                [itemStyle.purpose_right]: true,
                [itemStyle.purpose_button_basic]: true,
                [itemStyle.purpose_button_selected]: memoPurpose === "question",
                [itemStyle.purpose_button_unselected]:
                  memoPurpose !== "question",
              })}
              onClick={() => {
                onPurposeClick("question");
              }}
            >
              질문
            </div>
          </div>
          <div className={itemStyle.writer_area}>
            <div className={itemStyle.writer_text}>작성자</div>
            <div className={itemStyle.writer_name}>송병근</div>

            <div
              className={itemStyle.anchor_zone}
              // draggable={true}
              // onDragStart={(event) => {
              //   event.stopPropagation();
              //   event.dataTransfer.setDragImage(new Image(), 0, 0);
              // }}
              // onMouseMove={(event) => {
              //   console.log("mouse move ");
              //   if (event.button === 0) {
              //     console.log("mouse move end");
              //   }
              // }}

              // onDrag={(event) => {
              //   onDragHandler(event);
              // }}
              // onDragEnd={(event) => {
              //   console.log("drag end " + event.nativeEvent.offsetX);
              // }}
              // onDragOverCapture={() => {
              //   console.log("drop!!!");
              // }}
              // onDrop={() => {
              //   console.log("drop!!!");
              // }}
            ></div>
          </div>
          <div className={itemStyle.middle_bar}></div>
          <div className={itemStyle.text_area_container}>
            <TextArea />
          </div>
        </div>
      </Draggable>
    </div>
  );
}
