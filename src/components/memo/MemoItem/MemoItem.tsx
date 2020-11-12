// @ts-nocheck
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import itemStyle from "./memoItem.module.scss";
import { TextArea } from "../../../components/customizedComponent/TextArea";
import Draggable from "react-draggable";
import PurposeArea from "./Purpose/PurposeArea";
import CommentArea from "./Comment/CommetArea";
import Anchor from "./Anchor/Anchor";
import WriterArea from "./Writer/WriterArea";
import classNames from "classnames";

export interface Anchor {
  exist: boolean;
  lineVisible?: boolean;
  zoneDown: boolean;
  x: number;
  y: number;
}

export interface BoxAnchor {
  exist: boolean;
  x: number;
  y: number;
}

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
    sendMessage,
    setMouseOnItem,
  } = props;

  const [memoPosition, setMemoPosition] = useState({
    x: 0,
    y: 0,
  });
  const [memoItemData, setMemoItemData] = useState(itemData);
  const [purpose, setPurpose] = useState(
    itemData?.metadata?.memoState?.purpose
  );

  const memoSize = {
    w: 350,
    h: 400,
  };
  const [itemID, setItemID] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [onHover, setOnHover] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>();
  const [boxAnchor, setBoxAnchor] = useState<BoxAnchor>();
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

  const handleUpdateState = useCallback(
    async (data: any, type: string) => {
      // console.log("")
      const metadata = itemData.metadata;
      const editedMemoItem = {
        id: itemData.id,
        metadata: {
          writer: metadata.writer,
          memoState: {
            pageNum: metadata.memoState.pageNum,
            content: textContent,
            x: memoPosition.x,
            y: memoPosition.y,
            createdDate: metadata.memoState.createdDate,
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
        },
      };

      switch (type) {
        case "position":
          editedMemoItem.metadata.memoState.x = data.x;
          editedMemoItem.metadata.memoState.y = data.y;
          break;
        case "anchor":
          console.log("data.xdata.x  " + data.x);
          editedMemoItem.metadata.memoState.anchor.x = data.x;
          editedMemoItem.metadata.memoState.anchor.y = data.y;
          break;
        case "box-anchor":
          editedMemoItem.metadata.memoState.anchor.box.x = data.x;
          editedMemoItem.metadata.memoState.anchor.box.y = data.y;
          break;
        case "content":
          editedMemoItem.metadata.memoState.content = data.textContent;
          break;
        case "purpose":
          editedMemoItem.metadata.memoState.purpose = data.purpose;
          break;
      }

      await updateMemoItem(editedMemoItem); // 딜레이 자꾸 생기넹,..
    },
    [
      itemData,
      purpose,
      textContent,
      memoPosition,
      anchor,
      boxAnchor,
      updateMemoItem,
    ]
  );
  const onAnchorZoneDragEnd = useCallback(
    async (event) => {
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

      setAnchor((currentState) => ({
        ...currentState,
        exist: true,
        lineVisible: true,
        x: newAnchorX,
        y: newAnchorY,
      }));
      setBoxAnchor((currentState) => ({
        ...currentState,
        exist: false,
      }));
      await handleUpdateState({ x: -1000, y: -1000 }, "box-anchor");
      await handleUpdateState({ x: newAnchorX, y: newAnchorY }, "anchor");
    },

    [bounds, memoPosition, handleUpdateState]
  );

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  useEffect(() => {
    const pageNumCorrect =
      currentPageNum === memoItemData?.metadata?.memoState?.pageNum;
    const checkWriterCorrect = !!currentCheckedWriters
      ? currentCheckedWriters.includes(memoItemData?.metadata?.writer.writerID)
      : false;
    setIsVisible(pageNumCorrect && checkWriterCorrect);
    console.log(
      "setIsVisiblesetIsVisible " + checkWriterCorrect + "   " + pageNumCorrect
    );
  }, [currentPageNum, memoItemData, currentCheckedWriters, isMenuItem]);

  useEffect(() => {
    if (!isMenuItem) {
      const state = memoItemData?.metadata?.memoState;
      const anchor = state?.anchor;
      const box = state?.anchor?.box;

      setMemoPosition(state);
      setPurpose(state.purpose);
      setTextContent(state.content);
      setAnchor({
        exist: !!anchor.x ? anchor.x > -500 : false,
        zoneDown: false,
        lineVisible: true,
        x: anchor.x,
        y: anchor.y,
      });
      setBoxAnchor({
        exist: !!box.x ? box.x > -500 : false,
        x: box.x,
        y: box.y,
      });
      setItemID(memoItemData?.id);
      //다시 로드 될때만 memo state의 컨텐츠를 받아오고, 그 후에는 간섭없이 memoItemData.memoState에 저장만 하기.
    }
  }, [memoItemData, isMenuItem]);

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
      handleUpdateState({ purpose: purpose }, "purpose");
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
              setAnchor((currentState) => ({
                ...currentState,
                lineVisible: false,
              }));
            }}
            onStop={(e, coreData) => {
              setIsDragging(false);
              setAnchor((currentState) => ({
                ...currentState,
                lineVisible: true,
              }));
              handleUpdateState({ x: coreData.x, y: coreData.y }, "position");
              setMemoPosition(coreData);
            }}
            onDrag={(e, coreData) => {
              e.preventDefault();
              e.stopPropagation();
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

                if (!!setMouseOnItem) {
                  console.log("setMouseOnItemsetMouseOnItem ");
                  setMouseOnItem(true);
                }
              }}
              onMouseLeave={() => {
                setOnHover(false);
                if (!!setMouseOnItem) {
                  setMouseOnItem(false);
                }
              }}
              ref={contentContainerEl}
              onClick={(event) => {
                contentTextAreaEl.current.focus();
                if (isMenuItem) return;
                focusHandler(itemID);
              }}
              onScroll={(event) => {
                console.log("onScrollonScroll ");
                event.preventDefault();
                event.stopPropagation();
              }}
              onWheel={(event) => {
                console.log("onWheelonWheel ");
                event.preventDefault();
                event.stopPropagation();
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
                  memoPurpose={memoItemData?.metadata?.memoState?.purpose}
                  itemID={memoItemData?.id}
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
                    handleUpdateState(
                      { textContent: event.target.value },
                      "content"
                    );
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
                            memoItemData,
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
                            memoItemData,
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
              {(isMenuItem || isFocus) && (
                <CommentArea
                  memoItemData={itemData}
                  sendMessage={sendMessage}
                ></CommentArea>
              )}
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
}
