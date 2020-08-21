import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  memo,
} from "react";
import { Document, Outline, Page } from "react-pdf";
import Draggable from "react-draggable";
import memoStyle from "./memo.module.scss";
import { isAbsolute } from "path";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { PanZoom } from "react-easy-panzoom";
import PageListView from "./PageListView";
// @ts-ignore
import SplitPane from "react-split-pane/lib/SplitPane";
// @ts-ignore
import Pane from "react-split-pane/lib/Pane";
import ReactPDF from "@intelllex/react-pdf";

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pagePosition, setPagePosition] = useState({
    x: 0,
    y: 0,
  });
  const [dragLastPosition, setDragLastPosition] = useState({
    x: 0,
    y: 0,
  });
  const [pageSize, setPageSize] = useState({
    w: 1000,
    h: 500,
  });
  const [boardSize, setBoardSize] = useState({
    w: 500,
    h: 500,
  });
  const [viewportSize, setViewportSize] = useState({
    w: 500,
    h: 500,
  });
  const [keyDown, setKeyDown] = useState({
    control: false,
    space: false,
  });
  const [zoomRatio, setZoomRatio] = useState({
    zoom: 1,
  });

  const [firstAlign, setFirstAlign] = useState(true);

  const viewPortEl = useRef(null);
  const boardEl = useRef(null);
  const draggableContainerEl = useRef(null);
  const documentEl = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      if (viewPortEl.current) {
        const height = viewPortEl.current.offsetHeight;
        const width = viewPortEl.current.offsetWidth;

        setViewportSize({ w: width, h: height });
      }
      if (boardEl.current) {
        const height = boardEl.current.offsetHeight;
        const width = boardEl.current.offsetWidth;
        setBoardSize({ w: width, h: height });
      }
      if (draggableContainerEl.current) {
      }
      if (documentEl.current) {
        const height = documentEl.current.offsetHeight;
        setPageSize((prevState) => ({ ...prevState, h: height }));
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [boardEl, documentEl, draggableContainerEl]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const properPosition = useCallback(
    (position) => {
      let properX = position.x >= 0 ? position.x : 0;
      properX =
        properX <= boardSize.w - pageSize.w
          ? properX
          : boardSize.w - pageSize.w;

      let properY = position.y >= 0 ? position.y : 0;
      properY =
        properY <= boardSize.h - pageSize.h
          ? properY
          : boardSize.h - pageSize.h;
      return { x: properX / zoomRatio.zoom, y: properY / zoomRatio.zoom };
    },
    [boardSize, pageSize, zoomRatio]
  );

  const setBoardStyle = useCallback(() => {
    const placedDiv = {
      left: Math.abs(boardSize.w - viewportSize.w) / -2,
      top: Math.abs(boardSize.h - viewportSize.h) / -2,
      zoom: zoomRatio.zoom,
    };
    return placedDiv;
  }, [boardSize, viewportSize, zoomRatio]);

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!keyDown.space) return;

      const endX = pagePosition.x + event.pageX - dragLastPosition.x;
      const endY = pagePosition.y + event.pageY - dragLastPosition.y;

      const position = properPosition({ x: endX, y: endY });

      setPagePosition(position);
      setDragLastPosition({
        x: event.pageX,
        y: event.pageY,
      });
    },
    [pagePosition, dragLastPosition, properPosition, keyDown]
  );

  function onStartDragHandler(event: React.DragEvent<HTMLDivElement>) {
    const startX = event.pageX;
    const startY = event.pageY;
    setDragLastPosition({
      x: startX,
      y: startY,
    });
  }

  // function onStartTouchHandler(event: React.TouchEvent<HTMLDivElement>) {
  //   console.log("asdfasdf");
  //   const touch = event.touches[0];

  //   const startX = touch.screenX;
  //   const startY = touch.screenY;
  //   setDragLastPosition({
  //     x: startX,
  //     y: startY,
  //   });
  // }
  // const onTouchMoveHandler = useCallback(
  //   (event: React.TouchEvent<HTMLDivElement>) => {
  //     console.log("asdfasdf");
  //     if (!keyDown.space) return;
  //     const touch = event.touches[0];

  //     const endX = pagePosition.x + touch.screenX - dragLastPosition.x;
  //     const endY = pagePosition.y + touch.screenY - dragLastPosition.y;

  //     const position = properPosition({ x: endX, y: endY });

  //     setPagePosition(position);
  //     setDragLastPosition({
  //       x: touch.screenX,
  //       y: touch.screenY,
  //     });
  //   },
  //   [pagePosition, dragLastPosition, properPosition, keyDown]
  // );
  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === 32) {
        //spcae bar
        event.preventDefault();
        setKeyDown((prevState) => ({ ...prevState, space: true }));
      } else if (event.keyCode === 17) {
        //control
        setKeyDown((prevState) => ({ ...prevState, control: true }));
      }
    },
    []
  );

  const onKeyUpHandler = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === 32) {
        //spcae bar
        setKeyDown((prevState) => ({ ...prevState, space: false }));
      } else if (event.keyCode === 17) {
        //control
        setKeyDown((prevState) => ({ ...prevState, control: false }));
      }
    },
    []
  );
  const listItemClicked = (index: number) => {
    console.log("list item clicked ");
    setPageNumber(index);
  };

  // const Block = (props: { inViewport: boolean }) => {
  //   const { inViewport } = props;
  //   const color = inViewport ? "#217ac0" : "#ff9800";
  //   const text = inViewport ? "In viewport" : "Not in viewport";
  //   return (
  //     <div className="viewport-block">
  //       <h3>{text}</h3>
  //       <div style={{ width: "1000px", height: "1000px", background: color }} />
  //     </div>
  //   );
  // };

  return (
    <div>
      <div>
        <SplitPane split="vertical" className={memoStyle.split_pane}>
          <Pane initialSize="200px" minSize="150px" maxSize="500px">
            <div className={memoStyle.split_list_view}>
              {/* <PageListView
                fileUrl="https://raw.githubusercontent.com/degoes-consulting/lambdaconf-2015/master/speakers/jdegoes/intro-purescript/presentation.pdf"
                listItemClicked={listItemClicked}
              /> */}
            </div>
          </Pane>
          <Pane>
            <div className={memoStyle.viewport} ref={viewPortEl}>
              <div
                style={setBoardStyle()}
                tabIndex={0} // key event fire 하기 위한 속성
                className={memoStyle.board}
                draggable={true}
                onDrag={(event) => {
                  onDragHandler(event);
                  event.stopPropagation();
                }}
                onDragStart={(event) => {
                  onStartDragHandler(event);
                  event.dataTransfer.setDragImage(new Image(), 0, 0);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                }}
                onKeyDown={onKeyDownHandler}
                onKeyUp={onKeyUpHandler}
                ref={boardEl}
              >
                <Draggable
                  disabled={true}
                  defaultPosition={pagePosition}
                  position={pagePosition}
                  bounds="parent"
                  ref={draggableContainerEl}
                >
                  <div ref={documentEl}>
                    <Document
                      file={props.fileUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className={memoStyle.document}
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={pageSize.w}
                        onRenderSuccess={() => {
                          if (documentEl.current) {
                            const height = documentEl.current.offsetHeight;
                            setPageSize((prevState) => ({
                              ...prevState,
                              h: height,
                            }));
                            if (firstAlign) {
                              const x = (boardSize.w - pageSize.w) / 2;
                              const y = (boardSize.h - height) / 2;

                              setPagePosition({ x: x, y: y });
                              setFirstAlign(false);
                            }
                          }
                        }}
                      />
                    </Document>
                  </div>
                </Draggable>
              </div>
            </div>
          </Pane>
        </SplitPane>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>

      <div>
        <button
          onClick={() => {
            if (pageNumber <= 1) {
              setPageNumber(1);
            } else {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          이전
        </button>
        <button
          onClick={() => {
            if (pageNumber >= numPages) {
              setPageNumber(numPages);
            } else {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          이후
        </button>
        <button
          onClick={() => {
            setZoomRatio({
              zoom: zoomRatio.zoom + 0.1,
            });
          }}
        >
          확대
        </button>
        <button
          onClick={() => {
            setZoomRatio({
              zoom: zoomRatio.zoom - 0.1,
            });
          }}
        >
          축소
        </button>
        <PanZoom>
          <div className={memoStyle.testviewport}>
            <Document
              file={props.fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className={memoStyle.document}
            >
              <div>
                <Outline className={memoStyle.outline} />
                <Page pageNumber={pageNumber} />
              </div>
            </Document>
          </div>
        </PanZoom>
        <Document file={props.fileUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
      <ReactPDF
        showThumbSidebar
        url={props.fileUrl}
        showProgressBar
        showToolbox
      />
    </div>
  );
}
