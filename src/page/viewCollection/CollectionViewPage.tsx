// @ts-nocheck
import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  makeStyles,
  createStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

import Dialog from "../../components/customizedComponent/PlatterDialog/Dialog";
import { useLocation, useHistory } from "react-router-dom";
import Collection, {
  CollectionProps,
} from "../../components/collection/Collection";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
import Selector from "../../components/layout/Selector/Selector";
import Button from "@material-ui/core/Button";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import clsx from "clsx";
import pageStyle from "./collectionViewPage.module.scss";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { UserView } from "../../services/user.service";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export interface CollectionViewPageProps extends CollectionProps {
  hideToolbar?: boolean;
  createPlatter(): Promise<void>;
  onClose(): Promise<void>;
}

enum SortType {
  RECENTLY_DESC,
  RECENTLY_ASC,
}

export default function CollectionViewPage(props: CollectionViewPageProps) {
  const [editable, setEditable] = useState(false);
  const [sortType, setSortType] = useState(SortType.RECENTLY_ASC);
  const Theme = useTheme();
  const fullScreen = useMediaQuery(Theme.breakpoints.down("sm"));

  const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
      paper: {
        "&&:MuiPaper-root": {
          boxShadow: "none",
        },
      },
    })
  );
  const classes = useStyles();
  return (
    <Fragment>
      {/* {!props.hideToolbar && ( 여기서 hide tool bar는 platter를 수정하는 hide tool bar 인듯.*/}
      {true && (
        <CollectionToolBar
          editable={editable}
          setEditable={setEditable}
          sortType={sortType}
          setSortType={setSortType}
          createPlatter={props.createPlatter}
          collection={props.collectionDetail}
          platters={props.platters}
        />
      )}
      <Dialog
        fullScreen={fullScreen}
        disableEnforceFocus
        fullWidth
        maxWidth="xl"
        open
        PaperComponent={PaperComponent}
        onClose={props.onClose}
        className={classes.paper}
      >
        <div
          className={classNames({
            [pageStyle.board_container]: true,
          })}
        >
          <div
            className={classNames({
              [pageStyle.container]: true,
            })}
          >
            <Collection {...props} editable={editable} />
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 2200,
      top: 0,
      margin: "0px",
      height: "54px",
      backgroundColor: "#1D1D1F",
      boxShadow: "none",
    },
    toolBar: {
      minHeight: "0px",
      height: "100%",
      maxWidth: "1154px",
      left: "50%",
      top: "0px",
      transform: "translate(-50%, 0)",
    },
    addButton: {
      backgroundColor: "transparent",
      fontSize: "16px",
      letterSpacing: "-0.8px",
      fontFamily: "Noto Sans CJK KR Regular",
      color: "#18C953",
    },
  })
);

const paperStyles = makeStyles(() =>
  createStyles({
    paper: {},
  })
);

export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const classes = paperStyles();
  return <Paper {...props} className={clsx(inherited, classes.paper)} />;
}

export function CollectionToolBar(props: any) {
  const classes = useStyles();
  const handleChange = (event: any) => {
    props.setSortType(event.target.value);
  };
  console.log("CollectionToolBar 작동");
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [filter, setFilter] = useState<string>("ALL");
  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
    >
      <Toolbar
        className={classNames({
          [classes.toolBar]: true,
        })}
      >
        <div className={pageStyle.center_container}>
          {!openSearchBar && <div>{props.collection.title}</div>}
        </div>

        {!openSearchBar && (
          <div className={pageStyle.home_container}>
            <img alt={"icon"} className={pageStyle.home_icon} />
          </div>
        )}

        {!openSearchBar && (
          <div className={pageStyle.switch_container}>
            <div className={pageStyle.switch}>
              <div
                className={classNames({
                  [pageStyle.mode]: true,
                  [pageStyle.view_mode]: true,
                  [pageStyle.mode_active]: !props.editable,
                  [pageStyle.mode_inactive]: props.editable,
                })}
                onClick={() => props.setEditable(false)}
              >
                <div className={pageStyle.mode_text}>뷰</div>
              </div>
              <div
                className={classNames({
                  [pageStyle.mode]: true,
                  [pageStyle.task_mode]: true,
                  [pageStyle.mode_active]: props.editable,
                  [pageStyle.mode_inactive]: !props.editable,
                })}
                onClick={() => props.setEditable(true)}
              >
                <div className={pageStyle.mode_text}>테스크</div>
              </div>
            </div>

            <div className={pageStyle.bar_container}>
              <div
                className={classNames({
                  [pageStyle.bar]: true,
                  [pageStyle.view_bar]: !props.editable,
                  [pageStyle.task_bar]: props.editable,
                })}
              ></div>
            </div>
          </div>
        )}

        <div className={pageStyle.search_platter}>
          <SearchPlatter
            collectionTitle={props.collection.title}
            platterSummaries={props.platters}
            openSearchBar={openSearchBar}
            setOpenSearchBar={setOpenSearchBar}
          />
          {!openSearchBar && props.editable && (
            <Button
              onClick={props.createPlatter}
              className={classNames({
                [classes.addButton]: true,
                [pageStyle.add_platter_button]: true,
              })}
              startIcon={<img className={pageStyle.add_icon} alt={"icon"} />}
            >
              플래터 추가
            </Button>
          )}
        </div>
        {!openSearchBar && (
          <Selector
            filter={filter}
            theme={"COLVIEW"}
            //filter={props.sortType}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

interface SearchPlatterProps {
  collectionTitle: string;
  platterSummaries: PlatterSummaryData[];
  openSearchBar: boolean;
}

function SearchPlatter(props: SearchPlatterProps) {
  const { openSearchBar, setOpenSearchBar } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const inputEl = useRef(null);
  const focusEl = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setOpenSearchBar(true);
    setTimeout(() => {
      setAnchorEl(inputEl.current);
      if (!!focusEl.current) {
        focusEl.current.focus();
      }
    }, 400);
  };

  const handleClose = () => {
    setOpenSearchBar(false);
    setAnchorEl(null);
  };

  const handleChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "platter-search-popover" : undefined;

  const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  });
  const classes = useStyles();
  const useMyStyles = makeStyles(() =>
    createStyles({
      listButton: {
        fontSize: "16px",
        letterSpacing: "-0.8px",
        fontFamily: "Noto Sans CJK KR Regular",
        color: "#E2E2E2",
        // "&:hover": {
        //   background: "trasparent",
        //   color: "white",
        // },
      },
      popover: {
        zIndex: "2300",
        marginTop: "7px",
        "& .MuiPaper-rounded": {
          backgroundColor: "transparent",
        },
      },
    })
  );
  const myClasses = useMyStyles();
  return (
    <div
      className={classNames({
        [pageStyle.container_search]: true,
        [pageStyle.container_search_close]: !openSearchBar,
        [pageStyle.container_search_open]: openSearchBar,
      })}
    >
      <div ref={inputEl} style={{ display: "flex" }}>
        {openSearchBar ? (
          <div className={pageStyle.search_menu_container}>
            <div className={pageStyle.text}>플레터 검색</div>
            <div className={pageStyle.divider}>
              <div className={pageStyle.line}></div>
            </div>
            <TextField
              className={pageStyle.text_field}
              margin="normal"
              required
              id="title"
              name="title"
              onChange={handleChange}
              placeholder={"플래터 타이틀로 검색해주세요."}
              inputRef={focusEl}
              InputProps={{ classes }}
            />
          </div>
        ) : (
          <Button className={myClasses.listButton} onClick={handleClick}>
            리스트
          </Button>
        )}
      </div>
      <Popover
        disableAutoFocus
        disableEnforceFocus
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={myClasses.popover}
      >
        <PlatterSummaryList
          searchQuery={searchQuery}
          collectionTitle={props.collectionTitle}
          platterSummaries={props.platterSummaries}
        />
      </Popover>
    </div>
  );
}

interface PlatterSummaryListProps {
  searchQuery: string;
  collectionTitle: string;
  platterSummaries: PlatterSummaryData[];
}

interface PlatterSummaryData {
  id: number;
  title: string;
  createdBy: UserView;
  createdDate: Date;
  hasNotification?: boolean;
  joined?: boolean;
}

enum ViewType {
  ALL,
  JOINED,
}

function PlatterSummaryList(props: PlatterSummaryListProps) {
  console.log(props);
  const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
      showAllButton: {
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: "12px",
        letterSpacing: "-0.7px",
        fontFamily: "Noto Sans CJK KR Light",
        position: "absolute",
        height: "100%",
        right: "0px",
        top: "0px",
      },
      showAttedingButton: {
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: "12px",
        letterSpacing: "-0.7px",
        borderWidth: "0px",
        fontFamily: "Noto Sans CJK KR Light",
        position: "absolute",
        height: "100%",
        right: "0px",
        top: "19px",
      },
      button_active: {
        color: "#105710",
      },
      button_inactive: {
        color: "#C5C5C5",
      },
      firstCell: {
        marginLeft: "22px",
      },
      body_row: {
        height: "64px",
        boxSizing: "border-box",
      },
      first_body_cell: {
        borderBottomColor: "#DADADA",
        borderBottomWidth: "0.5px",
        padding: "0 0 0 22px",
      },
      body_cell: {
        borderBottomColor: "#DADADA",
        borderBottomWidth: "0.5px",
        padding: "0px",
      },
      first_head_cell: {
        borderBottomColor: "transparent",
        padding: "0 0 0 22px",
      },
      head_cell: {
        borderBottomColor: "transparent",
        padding: "0px",
      },
      head_row: {
        borderWidth: "0px",
      },
      name: {
        width: "120px",
        boxSizing: "border-box",
      },
      date: {
        width: "80px",
      },
      notification: {
        textAlign: "center",
        width: "80px",
        paddingRight: "50px",
      },
    })
  );
  const classes = useStyles();
  const [viewType, setViewType] = useState(ViewType.ALL);
  // const platterSummaires = props.platterSummaries
  //   .filter((it) => viewType === ViewType.ALL || it.joined)
  //   .filter((it) => it.title.includes(props.searchQuery));
  const ps1 = {
    id: 0,
    title: "string1111",
    createdBy: 0,
    createdDate: 0,
  };
  const platterSummaires = [ps1, ps1];
  const onClick = (event: any) => {
    setViewType(event.target.value);
  };

  return (
    <div className={pageStyle.search_platter_container}>
      <div className={pageStyle.header}>
        <div className={pageStyle.collection_title}>
          {props.collectionTitle}의 리스트
        </div>
        <div className={pageStyle.menu_container}>
          <div className={pageStyle.show_all}>
            <Button
              value={ViewType.ALL}
              onClick={onClick}
              className={classNames({
                [classes.showAllButton]: true,
                [classes.button_active]: true,
                [classes.button_inactive]: false,
              })}
            >
              전체보기
            </Button>
          </div>
          <div className={pageStyle.show_attending_platter}>
            <Button
              value={ViewType.JOINED}
              onClick={onClick}
              className={classNames({
                [classes.showAttedingButton]: true,
                [classes.button_active]: false,
                [classes.button_inactive]: true,
              })}
            >
              참여 중인 플래터만 보기
            </Button>
          </div>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              className={classNames({
                [pageStyle.head_row]: true,
              })}
            >
              <TableCell
                className={classNames({
                  [pageStyle.head_cell]: true,
                  [classes.first_head_cell]: true,
                })}
              >
                플래터
              </TableCell>
              <TableCell
                className={classNames({
                  [pageStyle.head_cell]: true,
                  [classes.head_cell]: true,
                  [classes.name]: true,
                })}
              >
                담당자
              </TableCell>
              <TableCell
                className={classNames({
                  [pageStyle.head_cell]: true,
                  [classes.head_cell]: true,
                  [classes.date]: true,
                })}
              >
                날짜
              </TableCell>
              <TableCell
                className={classNames({
                  [pageStyle.head_cell]: true,
                  [classes.head_cell]: true,
                  [classes.notification]: true,
                })}
              >
                알림
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {platterSummaires.map((data: PlatterSummaryData) => (
              <TableRow
                key={data.id}
                onClick={() => (window.location.href = `#platter-${data.id}`)}
                className={classNames({
                  [classes.body_row]: true,
                })}
              >
                <TableCell
                  className={classNames({
                    [pageStyle.body_cell]: true,
                    [classes.first_body_cell]: true,
                  })}
                >
                  {data.title}
                </TableCell>
                <TableCell
                  className={classNames({
                    [pageStyle.body_cell]: true,
                    [classes.body_cell]: true,
                    [classes.name]: true,
                  })}
                >
                  {data.createdBy.displayName}
                </TableCell>
                <TableCell
                  className={classNames({
                    [pageStyle.body_cell]: true,
                    [classes.body_cell]: true,
                    [pageStyle.date]: true,
                  })}
                >
                  {data.createdDate}
                </TableCell>
                <TableCell
                  className={classNames({
                    [pageStyle.body_cell]: true,
                    [classes.body_cell]: true,
                    [classes.notification]: true,
                  })}
                >
                  {/* {data.hasNotification} */}
                  {true && (
                    <div
                      className={classNames({
                        [pageStyle.has_notification]: true,
                      })}
                    >
                      <div
                        className={classNames({
                          [pageStyle.notification_icon]: true,
                        })}
                      ></div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
