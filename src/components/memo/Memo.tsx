import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import { Document, Page } from "react-pdf";
import Draggable from "react-draggable";
import memoStyle from "./memo.module.scss";
import { PanZoom } from "react-easy-panzoom";
// @ts-ignore
import SplitPane from "react-split-pane/lib/SplitPane";
// @ts-ignore
import Pane from "react-split-pane/lib/Pane";
import MemoItem from "./MemoItem";
import PDFPages from "./PDFList/PDFPages";
import PDFThumbBar from "./PDFList/PDFThumbBar";
import SideMenuBar from "./SideMenu/SideMenuBar";

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
  const [panBoardSize] = useState({
    w: 2000,
    h: 2000,
  });
  const [viewportSize, setViewportSize] = useState({
    w: 500,
    h: 500,
  });
  const [keyOn, setKeyOn] = useState({
    control: false,
    space: false,
  });
  const [zoomRatio, setZoomRatio] = useState({
    zoom: 1,
  });
  const [documentPosition, setDocumentPosition] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  const [panzoomBoxSize, setPanzoomBoxSize] = useState({
    w: 500,
    h: 500,
  });
  const [currentFocusItem, setCurrentFocusItem] = useState({
    itemID: 0,
  });
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const [pdfList, setPdfList] = useState({});
  const [, setListProgress] = useState(0);

  const initMemoItems = [
    {
      itemID: 0,
      pageNum: 1,
      content: "테스트",
      x: 0,
      y: 0,
    },
  ];
  const [memoItems, setMemoItems] = useState(initMemoItems);
  const viewPortEl = useRef(null);
  const boardEl = useRef(null);
  const draggableContainerEl = useRef(null);
  const documentEl = useRef(null);
  const panzoomBoxEl = useRef(null);
  const panzoomBoxContainerEl = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      if (viewPortEl.current) {
        const height = viewPortEl.current.offsetHeight;
        const width = viewPortEl.current.offsetWidth;

        setViewportSize({ w: width, h: height });
      }
      if (panzoomBoxEl.current) {
        const height = window.innerHeight - 50; //height는 100vh로 설정됨 - menu bar 높이 50
        const width = panzoomBoxEl.current.offsetWidth;
        console.log("panzoombox width " + width);
        setPanzoomBoxSize({ w: width, h: height });
      }
      if (panzoomBoxContainerEl.current) {
        const height = window.innerHeight - 50;
        const width = panzoomBoxContainerEl.current.offsetWidth;
        console.log("panzoombox container width " + width);
        setPanzoomBoxSize({ w: width, h: height });
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
  }, [boardEl, documentEl, draggableContainerEl, panzoomBoxEl, sideMenuOpen]);

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

  const setPanzoomBoundary = useCallback(() => {
    const scaledBoard = {
      w: (panBoardSize.w + 1000) * documentPosition.scale, // 약간씩의 여백 (board 바깥부분).
      h: (panBoardSize.h + 1000) * documentPosition.scale, // 약간씩 여백 (board 바깥부분).
    };

    const hRatio =
      panBoardSize.w * documentPosition.scale - panzoomBoxSize.w > 0
        ? (scaledBoard.w - panzoomBoxSize.w) / scaledBoard.w
        : (scaledBoard.w - panzoomBoxSize.w) / (scaledBoard.w * 8);
    const vRatio =
      panBoardSize.h * documentPosition.scale - panzoomBoxSize.h > 0
        ? (scaledBoard.h - panzoomBoxSize.h) / scaledBoard.h
        : (scaledBoard.h - panzoomBoxSize.h) / (scaledBoard.h * 8);

    return { hRatio: hRatio, vRatio: vRatio };
  }, [panzoomBoxSize, panBoardSize, documentPosition]);

  const setBoardStyle = useCallback(() => {
    const placedDiv = {
      left: Math.abs(boardSize.w - viewportSize.w) / -2,
      top: Math.abs(boardSize.h - viewportSize.h) / -2,
      zoom: zoomRatio.zoom,
    };
    return placedDiv;
  }, [boardSize, viewportSize, zoomRatio]);

  const setDocumentStyle = useCallback(() => {
    const placedDiv = {
      marginLeft: Math.abs(panBoardSize.w - pageSize.w) / 2,
      marginTop: Math.abs(panBoardSize.h - pageSize.h) / 2,
    };
    return placedDiv;
  }, [panBoardSize, pageSize]);

  const onDragHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      if (!keyOn.space) return;

      const endX = pagePosition.x + event.pageX - dragLastPosition.x;
      const endY = pagePosition.y + event.pageY - dragLastPosition.y;

      const position = properPosition({ x: endX, y: endY });

      setPagePosition(position);
      setDragLastPosition({
        x: event.pageX,
        y: event.pageY,
      });
    },
    [pagePosition, dragLastPosition, properPosition, keyOn]
  );

  function onStateChange(state) {
    setDocumentPosition({
      x: state.x,
      y: state.y,
      scale: state.scale,
    });
  }
  const onMouseDown = (event) => {
    if (event.nativeEvent.which === 3) {
      event.preventDefault();
      const newMemoItem = {
        itemID: Date.now(),
        pageNum: pageNumber,
        content: "테스트",
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };

      const addedArray = memoItems.concat(newMemoItem);
      setMemoItems(addedArray);
    }
  };

  function onStartDragHandler(event: React.DragEvent<HTMLDivElement>) {
    const startX = event.pageX;
    const startY = event.pageY;
    setDragLastPosition({
      x: startX,
      y: startY,
    });
  }

  const deleteMemo = useCallback(
    (targetID: number) => {
      const newList = memoItems.filter((item) => {
        console.log(" 타게게셋    " + targetID);
        console.log(" 대상    " + item.itemID);
        if (item.itemID === targetID) {
          console.log(" 흠ㅇ.....    ");
        }

        return item.itemID !== targetID;
      });

      setMemoItems(newList);
    },
    [memoItems]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);
  const onDrop = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <PDFPages
        url={props.fileUrl}
        setPdf={(loadPDF) => {
          setPdfList(loadPDF);
        }}
        updateProgressBar={(progress: number) => {
          setListProgress(progress);
          // const { onProgress } = this.props;
          // onProgress && onProgress();
          //로딩  진행 정도.
        }}
      />

      <div className={memoStyle.workspace_container}>
        <div className={memoStyle.menu_bar}>
          {" "}
          <button onClick={() => setSideMenuOpen(!sideMenuOpen)}>
            메뉴 열기{" "}
          </button>
        </div>
        <SplitPane split="vertical" className={memoStyle.split_pane}>
          <Pane initialSize="200px" minSize="150px" maxSize="500px">
            <div className={memoStyle.split_list_view}>
              <PDFThumbBar
                pdf={pdfList}
                currentPage={pageNumber}
                setCurrentPage={(pageNum: number) => {
                  setPageNumber(pageNum);
                }}
                showThumbSidebar={true}
              />
            </div>
          </Pane>
          <Pane>
            <div
              ref={panzoomBoxContainerEl}
              className={memoStyle.panzoom_box_container}
            >
              <PanZoom
                className={memoStyle.panzoom_box}
                zoomSpeed={5}
                onStateChange={onStateChange}
                boundaryRatioVertical={setPanzoomBoundary().vRatio} //
                boundaryRatioHorizontal={setPanzoomBoundary().hRatio} // panzoom의 경계선을 기준으로 내부 div의 몇배만큼 더 움직일 수 있는지.
                enableBoundingBox
                autoCenter={true}
                maxZoom={3}
                minZoom={0.3}
                ref={panzoomBoxEl}
              >
                <div className={memoStyle.pan_board}>
                  <div
                    className={memoStyle.memo_board}
                    onMouseDown={onMouseDown}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                  >
                    {memoItems.map((item) => {
                      return (
                        <MemoItem
                          key={item.itemID}
                          memoState={item}
                          className={memoStyle.memo_item}
                          keyState={keyOn}
                          scale={documentPosition.scale}
                          writerID={"송병근"}
                          currentPageNum={pageNumber}
                          deleteMemo={deleteMemo}
                          isFocus={
                            currentFocusItem.itemID === item.itemID
                              ? true
                              : false
                          }
                          focusHandler={(itemID) => {
                            setCurrentFocusItem({ itemID: itemID });
                          }}
                        ></MemoItem>
                      );
                    })}
                  </div>
                  <div
                    ref={documentEl}
                    style={setDocumentStyle()}
                    className={memoStyle.testt}
                  >
                    <Document
                      file={props.fileUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className={memoStyle.document}
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={pageSize.w}
                        className={memoStyle.page}
                        onLoadSuccess={(page) => {
                          setPageSize(() => ({
                            w: page.width,
                            h: page.height,
                          }));
                        }}
                      />
                    </Document>
                  </div>
                </div>
              </PanZoom>
            </div>
          </Pane>
          {sideMenuOpen && (
            <Pane initialSize="300px" minSize="300px" maxSize="300px">
              {memoItems.map((item) => {
                if (item.itemID !== currentFocusItem.itemID) {
                  return <div></div>;
                }
                return (
                  <SideMenuBar
                    memoState={item}
                    className={memoStyle.memo_item}
                    keyState={keyOn}
                    scale={documentPosition.scale}
                    writerID={"송병근"}
                    currentPageNum={pageNumber}
                    deleteMemo={deleteMemo}
                    isFocus={
                      currentFocusItem.itemID === item.itemID ? true : false
                    }
                    focusHandler={(itemID) => {
                      setCurrentFocusItem({ itemID: itemID });
                    }}
                  />
                );
              })}
            </Pane>
          )}
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
            ref={boardEl}
          >
            <Draggable
              disabled={true}
              defaultPosition={pagePosition}
              position={pagePosition}
              bounds="parent"
              ref={draggableContainerEl}
            >
              <div>
                <Document
                  file={props.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className={memoStyle.document}
                >
                  <Page pageNumber={pageNumber} width={pageSize.w} />
                </Document>
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    </div>
  );
}
