import React, { useEffect, useRef } from "react";
import anchorStyle from "./anchor.module.scss";
import Draggable from "react-draggable";

export default function Line(props: any) {
  const lineEl = useRef(null);
  let ctx = null;

  useEffect(() => {
    const lineCurrentEl = lineEl.current;
    // lineCurrentEl.width = Math.log(props.to.x - props.from.x);
    // lineCurrentEl.height = Math.log(props.to.y - props.from.y);
    lineCurrentEl.width = 2000;
    lineCurrentEl.height = 2000;

    // get context of the canvas
    ctx = lineCurrentEl.getContext("2d");
    drawLine({
      x: props.from.x,
      y: props.from.y,
      x1: props.to.x,
      y1: props.to.y,
    });
  }, [props.from, props.to]);

  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = "black", width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  return (
    <Draggable
      disabled={false}
      position={anchor}
      onDrag={(e, coreData) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchor((prevState) => ({
          ...prevState,
          x: coreData.x,
          y: coreData.y,
        }));
      }}
      bounds={bounds}
      //pan board 너비 높이 - 메모 아이템 너비 높이
      scale={props.scale}
    >
      <div className={itemStyle.anchor}></div>
    </Draggable>
  );
}
