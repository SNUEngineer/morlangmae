import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import { Document, Page } from "react-pdf";
import memoStyle from "./memo.module.scss";
import { PanZoom } from "./PanZoom";
import SplitPane from "react-split-pane/lib/SplitPane";
import Pane from "react-split-pane/lib/Pane";
import MemoItem from "./MemoItem/MemoItem";
import PDFPages from "./PDFList/PDFPages";
import PDFThumbBar from "./PDFList/PDFThumbBar";
import SideMenuBar from "./SideMenu/SideMenuBar";
// import Menu, { Item as MenuItem, Divider } from "rc-menu";

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState({
    w: 2000,
    h: 500,
  });
  const [boardSize, setBoardSize] = useState({
    w: 500,
    h: 500,
  });
  const [panBoardSize] = useState({
    w: 6500,
    h: 4500,
  });
  const [keyState, setKeyState] = useState({
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
  const [fisrtAlign, setFisrtAlign] = useState(true);
  const [listProgress, setListProgress] = useState(0);

  const initMemo = [
    {
      itemID: 0,
      pageNum: 1,
      content: "테스트",
      x: 0,
      y: 0,
    },
  ];
  const initMemoItems = {
    writer: { writerID: 1, writerName: "김기연" },
    memoState: {
      itemID: 0,
      pageNum: 1,
      content: "테스트",
      x: 0,
      y: 0,
      purpose: "request",
    },
  };
  const [memoItems, setMemoItems] = useState([initMemoItems]);
  const [currentCheckedWriters, setCurrentCheckedWriters] = useState([0]);
  const boardEl = useRef<HTMLDivElement>(null);
  const documentEl = useRef<HTMLDivElement>(null);
  const panzoomBoxContainerEl = useRef<HTMLDivElement>(null);
  const panzoomEl = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      if (panzoomBoxContainerEl.current) {
        panzoomBoxContainerEl.current.focus();
        const height = window.innerHeight - 50;
        const width = panzoomBoxContainerEl.current.offsetWidth;
        if (!!panzoomEl.current) {
          if (!fisrtAlign) {
            panzoomEl.current.moveBy((width - panzoomBoxSize.w) / 2, 0);
          }
        }
        if (panzoomBoxSize.w !== width) {
          setPanzoomBoxSize({ w: width, h: height });
        }
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
    const onKeyDown = (event) => {
      if (event.keyCode === 32) {
        //spcae bar
        setKeyState((prevState) => ({ ...prevState, spacebar: true }));
        event.preventDefault();
      } else if (event.keyCode === 17) {
        //control
        setKeyState((prevState) => ({ ...prevState, control: true }));
        event.preventDefault();
      }
    };

    const onKeyUp = (event) => {
      if (event.keyCode === 32) {
        //spcae bar
        setKeyState((prevState) => ({ ...prevState, spacebar: false }));
        event.preventDefault();
      } else if (event.keyCode === 17) {
        //control
        setKeyState((prevState) => ({ ...prevState, control: false }));
        event.preventDefault();
      }
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [boardEl, documentEl, sideMenuOpen, panzoomBoxSize]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: any) => {
      setNumPages(numPages);
      if (fisrtAlign) {
        if (!!panzoomEl.current) {
          console.log("auto center!!!");
          panzoomEl.current.autoCenter(1, false);
        }
        setFisrtAlign(false);
      }
    },
    [fisrtAlign]
  );

  const setPanzoomBoundary = useCallback(() => {
    const scaledBoard = {
      w: (panBoardSize.w + 1000) * documentPosition.scale, // 약간씩의 여백 (board 바깥부분).
      h: (panBoardSize.h + 1000) * documentPosition.scale, // 약간씩 여백 (board 바깥부분).
    };

    const hRatio =
      panBoardSize.w * documentPosition.scale - panzoomBoxSize.w > 0
        ? (scaledBoard.w - panzoomBoxSize.w) / scaledBoard.w
        : (scaledBoard.w - panzoomBoxSize.w) / (scaledBoard.w * 2);
    const vRatio =
      panBoardSize.h * documentPosition.scale - panzoomBoxSize.h > 0
        ? (scaledBoard.h - panzoomBoxSize.h) / scaledBoard.h
        : (scaledBoard.h - panzoomBoxSize.h) / (scaledBoard.h * 2);

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
        writer: { writerID: 0, writerName: "송병근" },
        memoState: {
          itemID: Date.now(),
          pageNum: pageNumber,
          content: "테스트",
          x: event.nativeEvent.offsetX,
          y: event.nativeEvent.offsetY,
          purpose: "request",
        },
      };

      const addedArray = memoItems.concat(newMemoItem);
      setMemoItems(addedArray);
    }
  };

  const deleteMemo = useCallback(
    (targetID: number) => {
      const newList = memoItems.filter(
        (item) => item.memoState.itemID !== targetID
      );
      setMemoItems(newList);
    },
    [memoItems]
  );

  const checkWriters = useCallback(
    (writerID: number) => {
      if (currentCheckedWriters.includes(writerID)) {
        const filteredArray = currentCheckedWriters.filter(
          (item) => item !== writerID
        );
        setCurrentCheckedWriters(filteredArray);
      } else {
        const addedArray = currentCheckedWriters.concat(writerID);
        setCurrentCheckedWriters(addedArray);
      }
    },
    [currentCheckedWriters]
  );

  const updateTextContent = useCallback(
    (targetID: number, content) => {
      const newList = memoItems.filter((item) => {
        if (item.memoState.itemID === targetID) {
          item.memoState.content = content;
        }
        return true;
      });

      setMemoItems(newList);
    },
    [memoItems]
  );

  const onPurposeClick = useCallback(
    (targetID: number, purpose) => {
      const newList = memoItems.filter((item) => {
        if (item.memoState.itemID === targetID) {
          item.memoState.purpose = purpose;
        }
        return true;
      });

      setMemoItems(newList);
    },
    [memoItems]
  );

  const currentPageMemos = useCallback(() => {
    const newList = memoItems.filter(
      (item) => item.memoState.pageNum === pageNumber
    );
    return newList;
  }, [memoItems, pageNumber]);

  const focusOtherItem = useCallback(
    (next, memoState, writerID) => {
      const newList = currentPageMemos()
        .sort((a, b) => a.memoState.itemID - b.memoState.itemID) //생성된 시간(item 아이디로 오름차순)
        .filter((item) => {
          if (!currentCheckedWriters.includes(item.writer.writerID)) {
            return false;
          }
          if (next) {
            if (memoState.itemID < item.memoState.itemID) {
              return true;
            }
          } else {
            if (memoState.itemID > item.memoState.itemID) {
              return true;
            }
          }
          return false;
        });
      if (newList.length === 0) {
        return;
      }
      setCurrentFocusItem({
        itemID: next
          ? newList[0].memoState.itemID
          : newList[newList.length - 1].memoState.itemID,
      });
    },
    [currentPageMemos, currentCheckedWriters]
  );

  const currentMenuMemo = useCallback(() => {
    const newList = memoItems.filter(
      (item) => item.memoState.itemID === currentFocusItem.itemID
    );
    return newList[0];
  }, [memoItems, currentFocusItem]);

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
        <div className={memoStyle.split_pane}>
          <div
            className={memoStyle.split_pane_pdf_thumb}
            initialSize="150px"
            minSize="150px"
            maxSize="150px"
          >
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
          </div>
          <div className={memoStyle.split_pane_pdf}>
            <div
              ref={panzoomBoxContainerEl}
              className={memoStyle.panzoom_box_container}
            >
              <PanZoom
                ref={panzoomEl}
                className={memoStyle.panzoom_box}
                zoomSpeed={5}
                onStateChange={onStateChange}
                boundaryRatioVertical={setPanzoomBoundary().vRatio} //
                boundaryRatioHorizontal={setPanzoomBoundary().hRatio} // panzoom의 경계선을 기준으로 내부 div의 몇배만큼 더 움직일 수 있는지.
                enableBoundingBox
                autoCenter={true}
                disableDoubleClickZoom={true}
                maxZoom={3}
                minZoom={0.1}
                keyState={keyState}
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
                          key={item.memoState.itemID}
                          memoState={item.memoState}
                          writer={item.writer}
                          className={memoStyle.memo_item}
                          keyState={keyState}
                          scale={documentPosition.scale}
                          writerID={"송병근"}
                          currentPageNum={pageNumber}
                          currentCheckedWriters={currentCheckedWriters}
                          deleteMemo={deleteMemo}
                          isFocus={
                            currentFocusItem.itemID === item.memoState.itemID
                              ? true
                              : false
                          }
                          updateTextContent={updateTextContent}
                          focusHandler={(itemID) => {
                            setCurrentFocusItem({ itemID: itemID });
                          }}
                          isMenuItem={false}
                          onPurposeClick={onPurposeClick}
                          panBoardSize={panBoardSize}
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
          </div>
          {sideMenuOpen && (
            <div className={memoStyle.split_pane_menu}>
              <SideMenuBar
                memoItem={currentMenuMemo()}
                className={memoStyle.memo_item}
                currentPageNum={pageNumber}
                deleteMemo={deleteMemo}
                updateTextContent={updateTextContent}
                focusHandler={(itemID) => {
                  setCurrentFocusItem({ itemID: itemID });
                }}
                pageNumber={pageNumber}
                isMenuItem={true}
                focusOtherItem={focusOtherItem}
                onPurposeClick={onPurposeClick}
                memoItems={currentPageMemos()}
                checkWriters={checkWriters}
                currentCheckedWriters={currentCheckedWriters}
                panBoardSize={panBoardSize}
              />
              );
            </div>
          )}
        </div>
      </div>
      <Document
        file={props.fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={memoStyle.document}
      >
        <Page
          pageNumber={pageNumber}
          width={pageSize.w}
          className={memoStyle.page}
        />
      </Document>
    </div>
  );
}
