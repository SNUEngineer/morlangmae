// @ts-nocheck
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  memo,
} from "react";
import itemStyle from "./memoItem.module.scss";
import { TextArea } from "../../../components/customizedComponent/TextArea";
import Draggable from "react-draggable";
import PurposeArea from "./Purpose/PurposeArea";
import CommentArea from "./Comment/CommetArea";
import Anchor from "./Anchor/Anchor";
import WriterArea from "./Writer/WriterArea";
import classNames from "classnames";

// const newMemoItem = {
//   writer: { writerID: myData.id, writerName: myData.displayName },
//   memoState: {
//     itemID: newItemId,
//     pageNum: pageNumber,
//     content: "테스트",
//     x: event.nativeEvent.offsetX,
//     y: event.nativeEvent.offsetY,
//     createdDate: new Date(),
//     purpose: "request",
//     anchor :{
//       x: 0,
//       y: 0,
//       box : {
//         x: 0,
//         y: 0,
//       }
//     }
//   },
// };

export default function MemoItem(props: any) {
  const {
    currentPageNum,
    itemData,
    isFocus,
    scale,
    focusHandler,
    deleteMemo,
    updateMemoItem,
    isMenuItem,
    focusOtherItem,
    panBoardSize,
    currentCheckedWriters,
  } = props;

  const [memoPosition, setMemoPosition] = useState({
    x: 0,
    y: 0,
  });
  const [memoItemData, setMemoItemData] = useState(itemData);
  const [purpose, setPurpose] = useState(itemData?.memoState?.purpose);

  const memoSize = {
    w: 350,
    h: 400,
  };
  const [itemID, setItemID] = useState(0);
  const [isDragging, setIsDragging] = useState(0);
  const [textContent, setTextContent] = useState("");
  const [onHover, setOnHover] = useState(false);
  const [anchor, setAnchor] = useState({
    exist: !!itemData?.memoState?.anchor?.x
      ? itemData.memoState.anchor.x > -500
      : false,
    zoneDown: false,
    x: 0,
    y: 0,
  });
  const [boxAnchor, setBoxAnchor] = useState({
    exist: !!itemData?.memoState?.anchor?.box?.x
      ? itemData.memoState.anchor.box.x > -500
      : false,
    x: 0,
    y: 0,
  });
  const [openComment, setOpenComment] = useState(false);
  const [bounds, setBounds] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    left: 0,
    top: 0,
    right: panBoardSize.w - memoSize.w,
    bottom: panBoardSize.h - memoSize.h,
  });
  const [anchorBound, setAnchorBound] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    left: 0,
    top: 0,
    right: panBoardSize.w,
    bottom: panBoardSize.h,
  });
  const [anchorLineStart, setAnchorLineStart] = useState({
    //pan board 너비 높이 - 메모 아이템 너비 높이
    x: 0,
    y: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const contentContainerEl = useRef<HTMLDivElement>(null);
  const anchorZoneEl = useRef<HTMLDivElement>(null);
  const writerAreaEl = useRef<HTMLDivElement>(null);
  const contentTextAreaEl = useRef(null);

  const handleUpdateState = useCallback(() => {
    const editedMemoItem = {
      writer: itemData.writer,
      memoState: {
        itemID: itemData.memoState.itemID,
        pageNum: itemData.memoState.pageNumber,
        content: textContent,
        x: memoPosition.x,
        y: memoPosition.y,
        createdDate: itemData.memoState.createdDate,
        purpose: purpose,
        anchor: {
          x: anchor.exist ? anchor.x : -1000,
          y: anchor.exist ? anchor.y : -1000,
          box: {
            x: boxAnchor.exist ? boxAnchor.x : -1000,
            y: boxAnchor.exist ? boxAnchor.y : -1000,
          },
        },
      },
    };

    updateMemoItem(editedMemoItem);
  }, [
    itemData,
    purpose,
    textContent,
    memoPosition,
    anchor,
    boxAnchor,
    updateMemoItem,
  ]);
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
      handleUpdateState();
    },

    [bounds, memoPosition, handleUpdateState]
  );

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  useEffect(() => {
    const pageNumCorrect = currentPageNum === memoItemData?.memoState?.pageNum;
    const checkWriterCorrect = !!currentCheckedWriters
      ? currentCheckedWriters.includes(memoItemData?.writer.writerID)
      : false;
    setIsVisible(pageNumCorrect && checkWriterCorrect);
  }, [currentPageNum, memoItemData, currentCheckedWriters, isMenuItem]);

  useEffect(() => {
    setMemoPosition(memoItemData?.memoState);
    setItemID(memoItemData?.memoState.itemID);
    //다시 로드 될때만 memo state의 컨텐츠를 받아오고, 그 후에는 간섭없이 memoItemData.memoState에 저장만 하기.
  }, []);

  useLayoutEffect(() => {
    if (isMenuItem) return;
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
  }, [writerAreaEl, anchorZoneEl, memoPosition, isMenuItem]);

  const onPurposeClick = useCallback(
    (purpose: string) => {
      setPurpose(purpose);
      handleUpdateState();
    },
    [handleUpdateState]
  );

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
          {!isMenuItem && (
            <Anchor
              anchorBound={anchorBound}
              anchor={anchor}
              scale={scale}
              isFocus={isFocus}
              boxAnchor={boxAnchor}
              anchorLineStart={anchorLineStart}
              setBoxAnchor={setBoxAnchor}
              setAnchor={setAnchor}
              panBoardSize={panBoardSize}
              onHover={onHover}
              handleUpdateState={handleUpdateState}
            ></Anchor>
          )}

          <Draggable
            disabled={isMenuItem}
            position={!isMenuItem ? memoPosition : { x: 0, y: 0 }}
            bounds={bounds}
            defaultClassName={itemStyle.memo_draggable}
            onStart={(e, coreData) => {
              setIsDragging(true);
            }}
            onStop={(e, coreData) => {
              setIsDragging(false);
              handleUpdateState();
            }}
            onDrag={(e, coreData) => {
              e.preventDefault();
              e.stopPropagation();
              setMemoPosition(coreData);
            }}
            scale={!isMenuItem ? scale : 1}
          >
            <div
              className={classNames({
                [itemStyle.container]: true,
                [itemStyle.container_menu_version]: isMenuItem,
                [itemStyle.focused_container]: isFocus,
              })}
              onMouseEnter={() => {
                setOnHover(true);
              }}
              onMouseLeave={() => {
                setOnHover(false);
              }}
              ref={contentContainerEl}
              onClick={(event) => {
                contentTextAreaEl.current.focus();
                if (isMenuItem) return;
                focusHandler(itemID);
              }}
            >
              <div className={itemStyle.delete_container}>
                <div
                  className={itemStyle.delete_button}
                  onClick={() => {
                    deleteMemo(itemID);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                ></div>
              </div>
              <div className={itemStyle.purpose_area}>
                <PurposeArea
                  onPurposeClick={onPurposeClick}
                  memoPurpose={memoItemData?.memoState.purpose}
                  itemID={memoItemData?.memoState.itemID}
                  isDragging={isDragging}
                ></PurposeArea>
              </div>
              <div className={itemStyle.writer_area} ref={writerAreaEl}>
                <WriterArea></WriterArea>
                {!isMenuItem && (
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
                    onDragStart={(event) => {
                      const dragImg = new Image(0, 0);
                      event.dataTransfer.setDragImage(dragImg, 0, 0);
                      event.stopPropagation();
                    }}
                  ></div>
                )}
              </div>
              <div className={itemStyle.middle_bar} />
              <div
                className={itemStyle.text_area_container}
                onKeyDown={(event) => {
                  if (event.keyCode !== 17) {
                    event.stopPropagation();
                  }
                }}
              >
                <TextArea
                  inline
                  width="100%"
                  height="500px"
                  maxHeight="500px"
                  //value={memoItemData?.memoState.content}
                  value={textContent}
                  ref={contentTextAreaEl}
                  textSize={18}
                  fontFamily={"Noto Sans CJK KR Regular"}
                  padding={10}
                  onChange={(event) => {
                    setTextContent(event.target.value);

                    handleUpdateState();
                  }}
                />
              </div>
              <div
                className={classNames({
                  [itemStyle.open_comment_container]: true,
                  [itemStyle.open_comment_container_opened]: isFocus,
                  [itemStyle.open_comment_container_closed]: !isFocus,
                })}
              >
                {isMenuItem && (
                  <div className={itemStyle.focus_other_container}>
                    <div className={itemStyle.focus_other}>
                      <div
                        className={itemStyle.focus_before}
                        onClick={() => {
                          focusOtherItem(
                            false,
                            memoItemData.memoState,
                            memoItemData.writer.writerID
                          );
                        }}
                      >
                        <div className={itemStyle.left_right_icon}>
                          <img alt={"icon"} className={itemStyle.left_icon} />
                        </div>
                      </div>
                      <div className={itemStyle.focus_index}></div>
                      <div
                        className={itemStyle.focus_after}
                        onClick={() => {
                          focusOtherItem(
                            true,
                            memoItemData.memoState,
                            memoItemData.writer.writerID
                          );
                        }}
                      >
                        <div className={itemStyle.left_right_icon}>
                          <img alt={"icon"} className={itemStyle.right_icon} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={itemStyle.open_comment}
                  onClick={() => {
                    setOpenComment(!openComment);
                  }}
                ></div>
              </div>
              {(isMenuItem || isFocus) && <CommentArea></CommentArea>}
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
}
