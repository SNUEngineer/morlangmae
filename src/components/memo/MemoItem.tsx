import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
import itemStyle from "./memoItem.module.scss";

import Draggable from "react-draggable";

export default function MemoItem(props: any) {
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

  const onClick = () => {
    console.log("memo item " + props.keyState.space);
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
          onDrag={onDragAnchor}
          bounds={{ left: 0, top: 0, right: 1800, bottom: 1800 }} //pan board 너비 높이 - 메모 아이템 너비 높이
          documentScale={props.scale}
        >
          <div className={itemStyle.anchor}></div>
        </Draggable>
      )}

      <Draggable
        disabled={false}
        defaultPosition={props.memoState}
        bounds={{ left: 0, top: 0, right: 1800, bottom: 1800 }} //pan board 너비 높이 - 메모 아이템 너비 높이
        documentScale={props.scale}
        defaultClassName={itemStyle.memo_draggable}
      >
        <div className={itemStyle.container} onClick={onClick}>
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
      </Draggable>
    </div>
  );
}
