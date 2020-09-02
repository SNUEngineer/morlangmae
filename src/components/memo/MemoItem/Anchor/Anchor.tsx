import React, { useState, useEffect, useRef, useCallback } from "react";
import anchorStyle from "./anchor.module.scss";
import { TextArea } from "../TextArea";
import Draggable from "react-draggable";
import Line from "./AnchorLine/Line";

export default function Anchor(props: any) {
  const {
    anchorBound,
    scale,
    isFocus,
    anchorLineStart,
    anchor,
    boxAnchor,
    setBoxAnchor,
    setAnchor,
    panBoardSize,
  } = props;

  const setBoxPosition = useCallback(() => {
    const box = {
      x: boxAnchor.x > anchor.x ? anchor.x : boxAnchor.x,
      y: boxAnchor.y > anchor.y ? anchor.y : boxAnchor.y,
    };
    return box;
  }, [boxAnchor, anchor]);
  const anchorDoubleClick = (event) => {
    setBoxAnchor((prevState) => ({
      exist: true,
      x: anchor.x + 50,
      y: anchor.y + 50,
    }));
  };

  const setBoxStyle = useCallback(() => {
    const placedDiv = {
      width: Math.abs(boxAnchor.x - anchor.x),
      height: Math.abs(boxAnchor.y - anchor.y),
    };
    return placedDiv;
  }, [boxAnchor, anchor]);

  const onDragHandler = (e, coreData) => {
    e.preventDefault();
    e.stopPropagation();
    if (anchor.x <= boxAnchor.x) {
      setAnchor((prevState) => ({
        ...prevState,
        x: coreData.x,
      }));
      setBoxAnchor((prevState) => ({
        ...prevState,
        x: coreData.x + setBoxStyle().width,
      }));
    } else {
      setBoxAnchor((prevState) => ({
        ...prevState,
        x: coreData.x,
      }));
      setAnchor((prevState) => ({
        ...prevState,
        x: coreData.x + setBoxStyle().width,
      }));
    }
    if (anchor.y <= boxAnchor.y) {
      setAnchor((prevState) => ({
        ...prevState,
        y: coreData.y,
      }));
      setBoxAnchor((prevState) => ({
        ...prevState,
        y: coreData.y + setBoxStyle().height,
      }));
    } else {
      setBoxAnchor((prevState) => ({
        ...prevState,
        y: coreData.y,
      }));
      setAnchor((prevState) => ({
        ...prevState,
        y: coreData.y + setBoxStyle().height,
      }));
    }
  };

  return (
    <div>
      {anchor.exist && (
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
          bounds={anchorBound}
          //pan board 너비 높이 - 메모 아이템 너비 높이
          scale={scale}
        >
          <div
            className={anchorStyle.anchor}
            onDoubleClick={anchorDoubleClick}
          ></div>
        </Draggable>
      )}
      {anchor.exist && boxAnchor.exist && isFocus && (
        <div className={anchorStyle.box_anchor_container}>
          <Draggable
            disabled={false}
            position={boxAnchor}
            onDrag={(e, coreData) => {
              e.preventDefault();
              e.stopPropagation();
              setBoxAnchor((prevState) => ({
                ...prevState,
                x: coreData.x,
                y: coreData.y,
              }));
            }}
            bounds={anchorBound}
            //pan board 너비 높이 - 메모 아이템 너비 높이
            scale={scale}
          >
            <div className={anchorStyle.anchor}></div>
          </Draggable>
        </div>
      )}
      {anchor.exist && boxAnchor.exist && isFocus && (
        <div className={anchorStyle.box_container}>
          <Draggable
            disabled={false}
            position={setBoxPosition()}
            scale={scale}
            onDrag={onDragHandler}
          >
            <div className={anchorStyle.anchor_box} style={setBoxStyle()}></div>
          </Draggable>
        </div>
      )}

      {anchor.exist && (
        <Line from={anchorLineStart} to={anchor} panBoardSize={panBoardSize} />
      )}
    </div>
  );
}
