import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import Line from "./AnchorLine/Line";
import itemStyle from "./memoItem.module.scss";
import { TextArea } from "./TextArea";
import Draggable from "react-draggable";
//import { Line } from "@vx/shape";

import classNames from "classnames";

export default function MemoItem(props: any) {
  const memoSize = {
    w: 350,
    h: 400,
  };
  const [memoPosition, setMemoPosition] = useState({
    x: 0,
    y: 0,
  });
  const [itemID, setItemID] = useState(0);

  const [anchor, setAnchor] = useState({
    exist: false,
    zoneDown: false,
    x: 0,
    y: 0,
  });
  const [boxAnchor, setBoxAnchor] = useState({
    exist: false,
    x: 0,
    y: 0,
  });

  const [openComment, setOpenComment] = useState(false);
  const [bounds, setBounds] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    left: 0,
    top: 0,
    right: 2000 - memoSize.w,
    bottom: 2000 - memoSize.h,
  });
  const [anchorBound, setAnchorBound] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    left: 0,
    top: 0,
    right: 2000,
    bottom: 2000,
  });
  const [anchorLineStart, setAnchorLineStart] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    x: 0,
    y: 0,
  });

  const [memoPurpose, setMemoPurpose] = useState("suggestion");
  //제안 요청 질문 suggestion, request, question
  const [textContent, setTextContent] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const onPurposeClick = (purpose: string) => {
    setMemoPurpose(purpose);
  };
  const [isVisible, setIsVisible] = useState(false);
  const contentContainerEl = useRef<HTMLDivElement>(null);
  const anchorZoneEl = useRef<HTMLDivElement>(null);
  const writerAreaEl = useRef<HTMLDivElement>(null);
  const contentTextAreaEl = useRef(null);
  const commentTextAreaEl = useRef(null);

  const onAnchorZoneDragEnd = useCallback(
    (event) => {
      if (
        event.nativeEvent == null ||
        event.nativeEvent.offsetX == null ||
        event.nativeEvent.offsetY == null
      ) {
        return;
      }

      const newAnchorX =
        memoPosition.x +
        event.nativeEvent.offsetX +
        anchorZoneEl.current.offsetLeft +
        writerAreaEl.current.offsetLeft;
      const newAnchorY =
        memoPosition.y +
        event.nativeEvent.offsetY +
        anchorZoneEl.current.offsetTop +
        writerAreaEl.current.offsetTop;

      if (
        newAnchorX < bounds.left ||
        newAnchorX > bounds.right ||
        newAnchorY < bounds.top ||
        newAnchorY > bounds.bottom
      ) {
        return;
      }

      setAnchor((prevState) => ({
        ...prevState,
        exist: true,
        x: newAnchorX,
        y: newAnchorY,
      }));
      setBoxAnchor((prevState) => ({
        ...prevState,
        exist: false,
      }));
    },
    [bounds, memoPosition]
  );

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  const anchorDoubleClick = (event) => {
    console.log("double click!!");

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

  const setBoxPosition = useCallback(() => {
    const box = {
      x: boxAnchor.x > anchor.x ? anchor.x : boxAnchor.x,
      y: boxAnchor.y > anchor.y ? anchor.y : boxAnchor.y,
    };
    return box;
  }, [boxAnchor, anchor]);

  useEffect(() => {
    setIsVisible(props.currentPageNum === props.memoState.pageNum);
  }, [props.currentPageNum, props.memoState.pageNum]);

  useEffect(() => {
    setMemoPosition(props.memoState);
    setItemID(props.memoState.itemID);
  }, []);

  useEffect(() => {
    setIsFocus(props.isFocus);
  }, [props.isFocus]);

  useLayoutEffect(() => {
    function updateSize() {
      if (anchorZoneEl.current) {
        if (writerAreaEl.current) {
          setAnchorLineStart({
            x:
              memoPosition.x +
              anchorZoneEl.current.offsetLeft +
              writerAreaEl.current.offsetLeft +
              15,
            y:
              memoPosition.y +
              anchorZoneEl.current.offsetTop +
              writerAreaEl.current.offsetTop +
              15,
          });
        }
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [writerAreaEl, anchorZoneEl, memoPosition]);

  return (
    <div>
      {isVisible && (
        <div
          className={itemStyle.memo_item}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
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
              scale={props.scale}
            >
              <div
                className={itemStyle.anchor}
                onDoubleClick={anchorDoubleClick}
              ></div>
            </Draggable>
          )}
          {anchor.exist && boxAnchor.exist && isFocus && (
            <div className={itemStyle.box_anchor_container}>
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
                scale={props.scale}
              >
                <div className={itemStyle.anchor}></div>
              </Draggable>
            </div>
          )}
          {anchor.exist && boxAnchor.exist && isFocus && (
            <div className={itemStyle.box_container}>
              <Draggable
                disabled={false}
                position={setBoxPosition()}
                scale={props.scale}
                onDrag={(e, coreData) => {
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
                }}
              >
                <div
                  className={itemStyle.anchor_box}
                  style={setBoxStyle()}
                ></div>
              </Draggable>
            </div>
          )}

          {anchor.exist && <Line from={anchorLineStart} to={anchor} />}

          <Draggable
            disabled={false}
            position={memoPosition}
            bounds={bounds}
            defaultClassName={itemStyle.memo_draggable}
            onDrag={(e, coreData) => {
              e.preventDefault();
              e.stopPropagation();
              setMemoPosition(coreData);
            }}
            scale={props.scale}
          >
            <div
              className={itemStyle.container}
              ref={contentContainerEl}
              onClick={() => {
                contentTextAreaEl.current.focus();
                props.focusHandler(itemID);
              }}
              onDragStartCapture={(event) => {
                event.stopPropagation();
                event.dataTransfer.setDragImage(new Image(), 0, 0);
              }}
            >
              <div className={itemStyle.delete_container}>
                <div
                  className={itemStyle.delete_button}
                  onClick={() => {
                    props.deleteMemo(itemID);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                ></div>
              </div>
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
                    [itemStyle.purpose_button_selected]:
                      memoPurpose === "request",
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
                    [itemStyle.purpose_button_selected]:
                      memoPurpose === "question",
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
              <div className={itemStyle.writer_area} ref={writerAreaEl}>
                <div className={itemStyle.writer_text}>작성자</div>
                <div className={itemStyle.writer_name}>송병근</div>
                <div
                  className={itemStyle.anchor_zone}
                  ref={anchorZoneEl}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  draggable={true}
                  onDrag={(event) => {
                    onDragHandler(event);
                  }}
                  onDragEnd={onAnchorZoneDragEnd}
                ></div>
              </div>
              <div className={itemStyle.middle_bar}></div>
              <div
                className={itemStyle.text_area_container}
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
                  ref={contentTextAreaEl}
                  onChange={(event) => {
                    setTextContent(event.target.value);
                  }}
                />
              </div>
              <div className={itemStyle.open_comment_container}>
                <div
                  className={itemStyle.open_comment}
                  onClick={() => {
                    setOpenComment(!openComment);
                  }}
                ></div>
              </div>
              {isFocus && (
                <div
                  className={itemStyle.memo_comment_container}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    commentTextAreaEl.current.focus();
                  }}
                >
                  <div className={itemStyle.memo_comment}></div>
                  <div className={itemStyle.memo_comment_text_area}>
                    <TextArea
                      inline
                      width="100%"
                      height="50px"
                      maxHeight="50px"
                      ref={commentTextAreaEl}
                    />
                  </div>
                </div>
              )}
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
}
