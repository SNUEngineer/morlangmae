import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import { Document, Page } from "react-pdf";
import Draggable from "react-draggable";
import memoStyle from "./memo.module.scss";
import { PanZoom } from "react-easy-panzoom";
// @ts-ignore
import SplitPane from "react-split-pane/lib/SplitPane";
// @ts-ignore
import Pane from "react-split-pane/lib/Pane";
import MemoItem from "./MemoItem/MemoItem";
import PDFPages from "./PDFList/PDFPages";
import PDFThumbBar from "./PDFList/PDFThumbBar";
import SideMenuBar from "./SideMenu/SideMenuBar";

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
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
  const [keyOn, setKeyOn] = useState({
    control: false,
    space: false,
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
  const boardEl = useRef<HTMLDivElement>(null);
  const documentEl = useRef<HTMLDivElement>(null);
  const panzoomBoxContainerEl = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function updateSize() {
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
      if (documentEl.current) {
        const height = documentEl.current.offsetHeight;
        setPageSize((prevState) => ({ ...prevState, h: height }));
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [boardEl, documentEl, sideMenuOpen]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

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

  const setDocumentStyle = useCallback(() => {
    const placedDiv = {
      marginLeft: Math.abs(panBoardSize.w - pageSize.w) / 2,
      marginTop: Math.abs(panBoardSize.h - pageSize.h) / 2,
    };
    return placedDiv;
  }, [panBoardSize, pageSize]);

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
    </div>
  );
}
