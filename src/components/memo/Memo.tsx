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
import MemoItem from "./MemoItem";
import PDFPages from "./PDFList/PDFPages";
import PDFThumbBar from "./PDFList/PDFThumbBar";

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
  const [panBoardSize, setPanBoardSize] = useState({
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

  const initMemoItems = [
    {
      pageNum: 1,
      content: "테스트",
      x: 0,
      y: 0,
    },
  ];

  const [panzoomBoxSize, setPanzoomBoxSize] = useState({
    w: 500,
    h: 500,
  });

  const [pdfList, setPdfList] = useState({});
  const [listProgress, setListProgress] = useState(0);

  const [memoItems, setMemoItems] = useState(initMemoItems);
  const [firstAlign, setFirstAlign] = useState(true);
  const viewPortEl = useRef(null);
  const boardEl = useRef(null);
  const draggableContainerEl = useRef(null);
  const documentEl = useRef(null);
  const panzoomBoxEl = useRef(null);
  const pageEl = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      if (viewPortEl.current) {
        const height = viewPortEl.current.offsetHeight;
        const width = viewPortEl.current.offsetWidth;

        setViewportSize({ w: width, h: height });
      }
      if (panzoomBoxEl.current) {
        const height = window.innerHeight; //height는 100vh로 설정됨
        const width = viewPortEl.current.offsetWidth;

        console.log("panzoom box  " + width + "   " + window.innerHeight);

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
  }, [boardEl, documentEl, draggableContainerEl, panzoomBoxEl]);

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
      w: (panBoardSize.w + 500) * documentPosition.scale, // 약간씩의 여백 (board 바깥부분).
      h: (panBoardSize.h + 500) * documentPosition.scale, // 약간씩 여백 (board 바깥부분).
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
    console.log(
      "panBoardSize.h - pageSize.h  " + panBoardSize.h + "   " + pageSize.h
    );
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
    console.log(
      "state " +
        state.x +
        "   " +
        state.y +
        "   " +
        state.scale +
        "   " +
        state.angle
    );

    setDocumentPosition({
      x: state.x,
      y: state.y,
      scale: state.scale,
    });
  }
  const onMouseDown = (event) => {
    console.log("click");
    console.log(
      "event.clientX    " +
        event.nativeEvent.offsetX +
        "event.clientY   " +
        event.nativeEvent.offsetY
    );
    if (event.nativeEvent.which === 3) {
      event.preventDefault();
      const newMemoItem = {
        pageNum: pageNumber,
        content: "테스트",
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      };

      const addedArray = memoItems.concat(newMemoItem);
      setMemoItems(addedArray);
      console.log("우클릭 " + memoItems.length);
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

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.log("gmagaga");
      if (event.keyCode === 32) {
        //spcae bar
        event.preventDefault();
        setKeyOn((prevState) => ({ ...prevState, space: true }));
      } else if (event.keyCode === 17) {
        //control
        setKeyOn((prevState) => ({ ...prevState, control: true }));
      }
    },
    []
  );

  const onKeyUpHandler = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === 32) {
        //spcae bar
        setKeyOn((prevState) => ({ ...prevState, space: false }));
      } else if (event.keyCode === 17) {
        //control
        setKeyOn((prevState) => ({ ...prevState, control: false }));
      }
    },
    []
  );
  const listItemClicked = (index: number) => {
    console.log("list item clicked ");
    setPageNumber(index);
  };

  return (
    <div>
      <PDFPages
        url={props.fileUrl}
        setPdf={(loadPDF) => {
          console.log("되냐?12121 " + loadPDF.numPages);
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
        <div className={memoStyle.menu_bar}></div>
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
              <div
                className={memoStyle.pan_board}
                onKeyDown={onKeyDownHandler}
                onKeyUp={onKeyUpHandler}
              >
                <div
                  className={memoStyle.memo_board}
                  onMouseDown={onMouseDown}
                  onDrop={(event) => {}}
                  onDragOver={(event) => {}}
                >
                  {memoItems.map(
                    (i, index) =>
                      memoItems[index].pageNum === pageNumber && (
                        <MemoItem
                          memoState={memoItems[index]}
                          className={memoStyle.memo_item}
                          keyState={keyOn}
                          scale={documentPosition.scale}
                          writerID={"송병근"}
                        ></MemoItem>
                      )
                  )}
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
                        console.log(
                          "page pagepage  " + page.height + "   " + page.width
                        );
                        setPageSize((prevState) => ({
                          w: page.width,
                          h: page.height,
                        }));
                      }}
                    />
                  </Document>
                </div>
              </div>
            </PanZoom>
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
      {/* <ReactPDF
        showThumbSidebar
        url={props.fileUrl}
        showProgressBar
        showToolbox
      /> */}
    </div>
  );
}
