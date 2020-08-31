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
import PurposeArea from "./Purpose/PurposeArea";
import CommentArea from "./Comment/CommetArea";
import Anchor from "./Anchor/Anchor";
import WriterArea from "./Writer/WriterArea";

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
          <Anchor
            anchorBound={anchorBound}
            anchor={anchor}
            scale={props.scale}
            isFocus={isFocus}
            boxAnchor={boxAnchor}
            anchorLineStart={anchorLineStart}
            setBoxAnchor={setBoxAnchor}
            setAnchor={setAnchor}
          ></Anchor>

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
                <PurposeArea
                  onPurposeClick={onPurposeClick}
                  memoPurpose={memoPurpose}
                ></PurposeArea>
              </div>
              <div className={itemStyle.writer_area} ref={writerAreaEl}>
                <WriterArea></WriterArea>
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
              <div className={itemStyle.middle_bar} />
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
              {isFocus && <CommentArea></CommentArea>}
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
}
