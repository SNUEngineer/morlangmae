// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from "react";
import anchorStyle from "./anchor.module.scss";
import Draggable from "react-draggable";
import Line from "./AnchorLine/Line";
import classNames from "classnames";

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
    onHover,
    handleUpdateState,
  } = props;

  const [anchorBoxVisible, setAnchorBoxVisible] = useState({
    anchor: false,
    box: false,
    boxAnchor: false,
    anchorDragging: false,
    boxAnchorDragging: false,
    boxDragging: false,
  });
  const setBoxStyle = useCallback(() => {
    const placedDiv = {
      width: Math.abs(boxAnchor.x - anchor.x),
      height: Math.abs(boxAnchor.y - anchor.y),
    };
    return placedDiv;
  }, [boxAnchor, anchor]);

  const setResizeBox = useCallback(
    (isMain: boolean) => {
      const minSize = { w: 40, h: 40 };
      const maxSize = { w: 80, h: 80 };
      let size = {
        w: 40,
        h: 40,
      };
      if (!boxAnchor.exist) {
        return null;
      }
      const ratio = 3;
      if (setBoxStyle().width > ratio * minSize.w) {
        size.w = setBoxStyle().width / ratio;
      }
      if (setBoxStyle().width > ratio * maxSize.w) {
        size.w = maxSize.w;
      }
      if (setBoxStyle().height > ratio * minSize.h) {
        size.h = setBoxStyle().height / ratio;
      }
      if (setBoxStyle().height > ratio * maxSize.h) {
        size.h = maxSize.h;
      }

      if (isMain) {
        const box = {
          width: size.w,
          height: size.h,
        };
        return box;
      } else {
        const box = {
          width: size.w,
          height: size.h,
          left: -size.w,
          top: -size.h,
        };
        return box;
      }
    },
    [setBoxStyle, boxAnchor.exist]
  );

  const setBoxPosition = useCallback(() => {
    const box = {
      x: boxAnchor.x > anchor.x ? anchor.x : boxAnchor.x,
      y: boxAnchor.y > anchor.y ? anchor.y : boxAnchor.y,
    };
    return box;
  }, [boxAnchor, anchor]);
  const anchorDoubleClick = async (event) => {
    await setBoxAnchor((prevState) => ({
      exist: true,
      x: anchor.x + 50,
      y: anchor.y + 50,
    }));
    handleUpdateState();
  };

  const isAnchorBoxVisible = useCallback(() => {
    return (
      anchorBoxVisible.anchor ||
      anchorBoxVisible.box ||
      anchorBoxVisible.boxAnchor ||
      anchorBoxVisible.anchorDragging ||
      anchorBoxVisible.boxDragging ||
      anchorBoxVisible.boxAnchorDragging ||
      onHover
    );
  }, [anchorBoxVisible, onHover]);

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
          onStart={(e, coreData) => {
            setAnchorBoxVisible((prevState) => ({
              ...prevState,
              anchorDragging: true,
            }));
          }}
          onStop={async (e, coreData) => {
            await setAnchorBoxVisible((prevState) => ({
              ...prevState,
              anchorDragging: false,
            }));
            handleUpdateState();
          }}
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
            className={classNames({
              [anchorStyle.main_anchor]: !boxAnchor.exist,
              [anchorStyle.main_anchor_box_exists]: boxAnchor.exist,
            })}
            onDoubleClick={anchorDoubleClick}
            style={setResizeBox(true)}
            onMouseEnter={() => {
              setAnchorBoxVisible((prevState) => ({
                ...prevState,
                anchor: true,
              }));
            }}
            onMouseLeave={() => {
              setAnchorBoxVisible((prevState) => ({
                ...prevState,
                anchor: false,
              }));
            }}
          >
            <div className={anchorStyle.anchor}></div>
          </div>
        </Draggable>
      )}

      {anchor.exist && boxAnchor.exist && (isFocus || isAnchorBoxVisible()) && (
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
            onStart={(e, coreData) => {
              setAnchorBoxVisible((prevState) => ({
                ...prevState,
                boxAnchorDragging: true,
              }));
            }}
            onStop={async (e, coreData) => {
              await setAnchorBoxVisible((prevState) => ({
                ...prevState,
                boxAnchorDragging: false,
              }));
              handleUpdateState();
            }}
            bounds={anchorBound}
            //pan board 너비 높이 - 메모 아이템 너비 높이
            scale={scale}
          >
            <div
              className={anchorStyle.box_anchor}
              style={setResizeBox(false)}
              onMouseEnter={() => {
                setAnchorBoxVisible((prevState) => ({
                  ...prevState,
                  boxAnchor: true,
                }));
              }}
              onMouseLeave={() => {
                setAnchorBoxVisible((prevState) => ({
                  ...prevState,
                  boxAnchor: false,
                }));
              }}
            >
              <div className={anchorStyle.anchor}></div>
            </div>
          </Draggable>
        </div>
      )}
      {anchor.exist && boxAnchor.exist && (isFocus || isAnchorBoxVisible()) && (
        <div className={anchorStyle.box_container}>
          <Draggable
            disabled={false}
            position={setBoxPosition()}
            scale={scale}
            onDrag={onDragHandler}
            onStart={(e, coreData) => {
              setAnchorBoxVisible((prevState) => ({
                ...prevState,
                boxDragging: true,
              }));
            }}
            onStop={(e, coreData) => {
              setAnchorBoxVisible((prevState) => ({
                ...prevState,
                boxDragging: false,
              }));
            }}
          >
            <div
              className={anchorStyle.anchor_box}
              style={setBoxStyle()}
              onMouseEnter={() => {
                setAnchorBoxVisible((prevState) => ({
                  ...prevState,
                  box: true,
                }));
              }}
              onMouseLeave={() => {
                setAnchorBoxVisible((prevState) => ({
                  ...prevState,
                  box: false,
                }));
              }}
            ></div>
          </Draggable>
        </div>
      )}

      {anchor.exist && (
        <Line from={anchorLineStart} to={anchor} panBoardSize={panBoardSize} />
      )}
    </div>
  );
}
