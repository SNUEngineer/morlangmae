// @ts-nocheck
import React, {
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import memoStyle from "./memoWorkstation.module.scss";
import { PanZoom } from "../../components/memo/PanZoom";
import MemoItem from "../../components/memo/MemoItem/MemoItem";
import PDFPages from "../../components/memo/PDFList/PDFPages";
import PDFThumbBar from "../../components/memo/PDFList/PDFThumbBar";
import SideMenuBar from "../../components/memo/SideMenu/SideMenuBar";
import classNames from "classnames";
import {
  MemoData,
  MemoItemData,
  MemoItemThreadData,
} from "../../services/memo.service";
import { UserView } from "../../services/user.service";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
// import Menu, { Item as MenuItem, Divider } from "rc-menu";

export function MemoToolBar(props: any) {
  const {
    sideMenuOpen,
    setSideMenuOpen,
    handleSaveItems,
    onClose,
    memoData,
  } = props;
  return (
    <div className={memoStyle.menu_bar}>
      <div className={memoStyle.center_menu_container}>
        <div className={memoStyle.title_container}>
          <img className={memoStyle.cloud_icon} alt={"icon"} />
          <div className={memoStyle.title}>{memoData.title}</div>
          <img
            className={classNames({
              [memoStyle.dropdown_icon_opened]: sideMenuOpen,
              [memoStyle.dropdown_icon_closed]: !sideMenuOpen,
            })}
            alt={"icon"}
          />
        </div>
      </div>
      <div className={memoStyle.menu_container}>
        <div className={memoStyle.bailey_conatiner}>
          <div className={memoStyle.align_container}>
            <div className={memoStyle.verical_center}>
              <div className={memoStyle.bailey_text}>Bailey</div>
            </div>
          </div>
        </div>

        <div className={memoStyle.back_container}>
          <div className={memoStyle.align_container}>
            <div className={memoStyle.verical_center}>
              <div
                onClick={onClose}
                className={classNames({
                  [memoStyle.menu_text]: true,
                  [memoStyle.menu_text_unfocused]: true,
                })}
              >
                뒤로가기
              </div>
            </div>
          </div>
        </div>
        <div className={memoStyle.save_container}>
          <div className={memoStyle.align_container}>
            <div className={memoStyle.verical_center}>
              <div
                onClick={() => {
                  if (sideMenuOpen === "TOOL") {
                    setSideMenuOpen("NONE");
                  } else {
                    setSideMenuOpen("TOOL");
                  }
                }}
                className={classNames({
                  [memoStyle.menu_text]: true,
                  [memoStyle.menu_text_unfocused]: !(sideMenuOpen === "TOOL"),
                  [memoStyle.menu_text_focused]: sideMenuOpen === "TOOL",
                })}
              >
                도구
              </div>
            </div>
          </div>
        </div>
        <div className={memoStyle.share_container}>
          <div className={memoStyle.align_container}>
            <div className={memoStyle.verical_center}>
              <div
                onClick={() => {
                  if (sideMenuOpen === "SHARE") {
                    setSideMenuOpen("NONE");
                  } else {
                    setSideMenuOpen("SHARE");
                  }
                }}
                className={classNames({
                  [memoStyle.menu_text]: true,
                  [memoStyle.menu_text_unfocused]: !(sideMenuOpen === "SHARE"),
                  [memoStyle.menu_text_focused]: sideMenuOpen === "SHARE",
                })}
              >
                공유
              </div>
            </div>
          </div>
        </div>
        <div className={memoStyle.share_container}>
          <div className={memoStyle.align_container}>
            <div className={memoStyle.verical_center}>
              <div
                onClick={() => {
                  handleSaveItems();
                }}
                className={classNames({
                  [memoStyle.menu_text]: true,
                  [memoStyle.menu_text_unfocused]: true,
                })}
              >
                저장
              </div>
            </div>
          </div>
        </div>
        <div className={memoStyle.logo_container}></div>
      </div>

      <div className={memoStyle.top_divider}></div>
    </div>
  );
}

export interface MemoProps {
  memoData: MemoData;
  memoItemDatas?: MemoItemData[];
  memoItemThreadDatas?: MemoItemThreadData[];
  myData: UserView;
  writeMessage: Promise<void>;
  handleMemoItems: Promise<void>;
  handleEditMemo: Promise<void>;
  onClose: Promise<void>;
  sendMessage: Promise<void>;
  collectionData;
}

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [newItemId, setNewItemId] = useState(-100);
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
  const [sideMenuOpen, setSideMenuOpen] = useState("NONE");

  const [pdfList, setPdfList] = useState({});
  const [fisrtAlign, setFisrtAlign] = useState(true);
  const [listProgress, setListProgress] = useState(0);

  const [newMemoItems, setNewMemoItems] = useState<MemoItemData[]>();
  const [existingMemoItems, setExistingMemoItems] = useState<MemoItemData[]>(
    props.memoData?.memoItems
  );
  const [deletingMemoItems, setDeletingMemoItems] = useState<MemoItemData[]>();
  const [memo, setMemo] = useState(props.memoData);
  const [mouseOnItem, setMouseOnItem] = useState(false);

  useEffect(() => {
    setExistingMemoItems(props.memoData?.memoItems);
    setDeletingMemoItems(null);
    setNewMemoItems(null);
    setMemo(props.memoData);
    //return () => clearInterval(timer);
  }, [props.memoData]);

  const initMemoItems = {
    id: 0,
    createdDate: 0,
    metadata: {
      writer: { writerID: 1, writerName: "김기연" },
      memoState: {
        pageNum: 1,
        content: "테스트",
        x: 0,
        y: 0,
        purpose: "request",
      },
    },
  };
  const memoItems = useCallback(() => {
    // console.log("memoItemsmemoItems " + JSON.stringify(newMemoItems));
    console.log(
      "existingMemoItemsexistingMemoItems " + JSON.stringify(existingMemoItems)
    );

    if (!newMemoItems || newMemoItems.length === 0) {
      if (!existingMemoItems || existingMemoItems.length === 0) {
        return [];
      }
      return existingMemoItems;
    }
    if (!existingMemoItems || existingMemoItems.length === 0) {
      return newMemoItems;
    }
    return newMemoItems.concat(existingMemoItems);
  }, [newMemoItems, existingMemoItems]);

  const [currentCheckedWriters, setCurrentCheckedWriters] = useState([
    props.myData.id,
  ]);
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

  const handleSaveItems = async (e: any) => {
    props.handleEditMemo(memo);
    props.handleMemoItems(existingMemoItems, "EDIT");
    props.handleMemoItems(newMemoItems, "ADD");
    props.handleMemoItems(deletingMemoItems, "DELETE");
  };
  const handleShare = async (e: any) => {
    props.handleEditMemo(memo);
    props.handleMemoItems(existingMemoItems, "EDIT");
    props.handleMemoItems(newMemoItems, "ADD");
    props.handleMemoItems(deletingMemoItems, "DELETE");
  };

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
    if (documentPosition.scale !== state.scale) {
      setDocumentPosition({
        x: state.x,
        y: state.y,
        scale: state.scale,
      });
    }
  }
  const onMouseDown = useCallback(
    (event: any) => {
      if (event.nativeEvent.which === 3) {
        event.preventDefault();

        const newMemoItem = {
          id: newItemId,
          metadata: {
            writer: {
              writerID: props.myData.id,
              writerName: props.myData.displayName,
            },
            memoState: {
              pageNum: pageNumber,
              content: "테스트",
              x: event.nativeEvent.offsetX,
              y: event.nativeEvent.offsetY,
              createdDate: new Date(),
              purpose: "request",
              anchor: {
                x: -1000,
                y: -1000,
                box: {
                  x: -1000,
                  y: -1000,
                },
              },
            },
          },
        };
        setNewItemId(newItemId - 1);
        if (!newMemoItems || newMemoItems.length === 0) {
          setNewMemoItems([newMemoItem]);
        } else {
          const addedArray = newMemoItems.concat(newMemoItem);
          setNewMemoItems(addedArray);
        }
        console.log("newMemoItems " + JSON.stringify(newMemoItems));
      }
    },
    [newItemId, newMemoItems, pageNumber, props.myData]
  );
  const deleteMemo = useCallback(
    (targetID: number) => {
      if (!!newMemoItems && newMemoItems.length !== 0) {
        const newList = newMemoItems.filter((item) => item.id !== targetID);
        setNewMemoItems(newList);
      }

      if (!!existingMemoItems && existingMemoItems.length !== 0) {
        const existingList = existingMemoItems.filter((item) => {
          if (item.id === targetID) {
            if (!deletingMemoItems || deletingMemoItems.length === 0) {
              setDeletingMemoItems([item]);
            } else {
              const newDeletingItems = deletingMemoItems.concat(item);
              setDeletingMemoItems(newDeletingItems);
            }
            console.log("삭제! 33333 ");
            return false;
          } else {
            return true;
          }
        });
        console.log("삭제! 44444 " + JSON.stringify(existingList));
        setExistingMemoItems(existingList);
      }
    },
    [newMemoItems, existingMemoItems, deletingMemoItems]
  );

  const checkWriters = useCallback(
    (writerID: number) => {
      if (currentCheckedWriters?.includes(writerID)) {
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
  const updateMemoItem = useCallback(
    (data: MemoItemData) => {
      if (!!newMemoItems && newMemoItems.length !== 0) {
        const newList = newMemoItems.filter((item) => {
          if (item?.id === data?.id) {
            item.metadata.memoState = data.metadata.memoState;
          }
          return true;
        });

        setNewMemoItems(newList);
      }
      if (!!existingMemoItems && existingMemoItems.length !== 0) {
        const existingList = existingMemoItems.filter((item) => {
          if (item.id === data?.id) {
            item.metadata.memoState = data.metadata.memoState;
          }
          return true;
        });

        setExistingMemoItems(existingList);
      }
    },
    [existingMemoItems, newMemoItems]
  );

  const currentPageMemos = useCallback(() => {
    const newList = memoItems().filter(
      (item) => item.metadata.memoState.pageNum === pageNumber
    );
    return newList;
  }, [pageNumber, memoItems]);

  const focusOtherItem = useCallback(
    (next, memoItemData, writerID) => {
      const id = memoItemData.id;
      const newList = currentPageMemos()
        .sort((a, b) => a.id - b.id) //생성된 시간(item 아이디로 오름차순)
        .filter((item) => {
          if (!currentCheckedWriters.includes(item.metadata.writer.writerID)) {
            return false;
          }
          if (next) {
            if (id < item.id) {
              return true;
            }
          } else {
            if (id > item.id) {
              return true;
            }
          }
          return false;
        });
      if (newList.length === 0) {
        return;
      }
      setCurrentFocusItem({
        itemID: next ? newList[0].id : newList[newList.length - 1].id,
      });
    },
    [currentPageMemos, currentCheckedWriters]
  );

  const currentMenuMemo = useCallback(() => {
    const newList = memoItems().filter(
      (item) => item.id === currentFocusItem.itemID
    );
    return newList[0];
  }, [currentFocusItem, memoItems]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);
  const onDrop = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);
  const contentStyles = makeStyles(() =>
    createStyles({
      dialog: {
        height: "100%",
        width: "100%",
        // padding: "15px",
        boxSizing: "border-box",
        // "& .MuiBackdrop-root": {
        //   backgroundColor: "red",
        // },
      },
    })
  );

  const styleClasses = contentStyles();
  const Theme = useTheme();
  const fullScreen = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <Dialog
      //fullScreen={fullScreen}
      disableEnforceFocus
      fullWidth
      maxWidth="xl"
      open
      PaperComponent={PaperComponent}
      className={styleClasses.dialog}
    >
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        className={memoStyle.root}
      >
        <PDFPages
          url={props.memoData.fileUrl}
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
          <MemoToolBar
            sideMenuOpen={sideMenuOpen}
            setSideMenuOpen={setSideMenuOpen}
            handleSaveItems={handleSaveItems}
            onClose={props.onClose}
            memoData={memo}
          />
          {sideMenuOpen !== "NONE" && (
            <div className={memoStyle.side_menu}>
              <SideMenuBar
                itemData={currentMenuMemo()}
                className={memoStyle.memo_item}
                currentPageNum={pageNumber}
                deleteMemo={deleteMemo}
                focusHandler={(itemID) => {
                  setCurrentFocusItem({ itemID: itemID });
                }}
                pageNumber={pageNumber}
                isMenuItem={true}
                focusOtherItem={focusOtherItem}
                memoItems={currentPageMemos()}
                checkWriters={checkWriters}
                currentCheckedWriters={currentCheckedWriters}
                panBoardSize={panBoardSize}
                updateMemoItem={updateMemoItem}
                type={sideMenuOpen}
                collectionMembers={props.collectionData?.members}
                setMemo={setMemo}
                memoData={memo}
                handleShare={handleShare}
                sendMessage={props.sendMessage}
              />
              );
            </div>
          )}
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
                  mouseOnItem={mouseOnItem}
                >
                  <div className={memoStyle.pan_board}>
                    <div
                      className={memoStyle.memo_board}
                      onMouseDown={onMouseDown}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                    >
                      {memoItems().map((item) => {
                        const pageNumCorrect =
                          pageNumber === item?.metadata?.memoState?.pageNum;
                        const checkWriterCorrect = !!currentCheckedWriters
                          ? currentCheckedWriters.includes(
                              item?.metadata?.writer?.writerID
                            )
                          : false;
                        return (
                          pageNumCorrect &&
                          checkWriterCorrect && (
                            <MemoItem
                              key={item.id}
                              itemData={item}
                              className={memoStyle.memo_item}
                              keyState={keyState}
                              scale={documentPosition.scale}
                              writerID={"송병근"}
                              currentPageNum={pageNumber}
                              currentCheckedWriters={currentCheckedWriters}
                              deleteMemo={deleteMemo}
                              updateMemoItem={updateMemoItem}
                              isFocus={
                                currentFocusItem.itemID === item.id
                                  ? true
                                  : false
                              }
                              focusHandler={(itemID) => {
                                setCurrentFocusItem({ itemID: itemID });
                              }}
                              isMenuItem={false}
                              panBoardSize={panBoardSize}
                              sendMessage={props.sendMessage}
                              setMouseOnItem={setMouseOnItem}
                            ></MemoItem>
                          )
                        );
                      })}
                    </div>
                    <div
                      ref={documentEl}
                      style={setDocumentStyle()}
                      className={memoStyle.testt}
                    >
                      <Document
                        file={props.memoData.fileUrl}
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
          </div>
        </div>
      </div>
    </Dialog>
  );
}
const paperStyles = makeStyles(() =>
  createStyles({
    paper: {
      backgroundColor: "transparent",
      padding: "0px",
      margin: "0px",
      height: "100%",
      width: "100%",
      //maxHeight: "756px",
      boxShadow: "none",
    },
  })
);
export function PaperComponent(props: PaperProps) {
  const styleClasses = paperStyles();
  return <Paper {...props} className={styleClasses.paper} />;
}
