// @ts-nocheck
import React, { useState, Fragment, useRef, useEffect } from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";

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
import classNames from "classnames";
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
import { CollectionDetail } from "../../services/collection.service";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";

export interface CollectionViewPageProps extends CollectionProps {
  hideToolbar?: boolean;
  createPlatter(): Promise<void>;
  editCollectionFn(collection: any): Promise<void>;
  onPlatterClick(): Promise<void>;
  onClose(): Promise<void>;
  users: UserView[];
  collectionDetail: CollectionDetail;
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
  const { collectionDetail } = props;
  const [editCollection, setEditCollection] = useState({
    id: collectionDetail.id,
    collectionType: collectionDetail.collectionType,
    serviceType: collectionDetail.serviceType,
    imageUrl: collectionDetail.imageUrl,
    title: collectionDetail.title,
    startDate: collectionDetail.startDate,
    endDate: collectionDetail.endDate,
    members: collectionDetail.members.map((member: UserView) => {
      return props.users.find((user: UserView) => user.id === member.id);
    }),
  });
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
      <Dialog
        fullScreen={fullScreen}
        disableEnforceFocus
        fullWidth
        maxWidth="xl"
        open
        PaperComponent={PaperComponent}
        onClose={props.onClose}
        onClick={props.onClose}
        className={classes.paper}
      >
        <div
          className={classNames({
            [pageStyle.board_container]: true,
          })}
        >
          {!props.hideToolbar && (
            <CollectionToolBar
              editable={editable}
              setEditable={setEditable}
              sortType={sortType}
              setSortType={setSortType}
              createPlatter={props.createPlatter}
              collection={props.collectionDetail}
              platters={props.platters}
              onClose={props.onClose}
              editCollectionFn={props.editCollectionFn}
              users={props.users}
            />
          )}
          <div
            className={classNames({
              [pageStyle.container]: true,
            })}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
          >
            <Collection
              {...props}
              editable={editable}
              onPlatterClick={props.onPlatterClick}
            />
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 3200,
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

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const options = [
    {
      value: SortType.RECENTLY_ASC,
      text: "시간 진행 순",
    },
    {
      value: SortType.RECENTLY_DESC,
      text: "시간 역 순",
    },
  ];
  const handleChange = (event: any) => {
    props.setSortType(event.target.value);
  };

  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Toolbar
        className={classNames({
          [classes.toolBar]: true,
        })}
      >
        <div className={pageStyle.menu_root_container}>
          <div className={pageStyle.center_container}>
            {!openSearchBar && <div>{props.collection.title}</div>}
          </div>

          {!openSearchBar && (
            <div className={pageStyle.home_container} onClick={props.onClose}>
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
            <div className={pageStyle.basic_container}>
              <div className={pageStyle.align_container}>
                <Selector
                  filter={props.sortType}
                  theme={"COLVIEW"}
                  handleChange={handleChange}
                  options={options}
                  //filter={props.sortType}
                />
              </div>
            </div>
          )}
          {!openSearchBar && (
            <EditMemberMenu
              collection={props.collection}
              users={props.users}
              editCollectionFn={props.editCollectionFn}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

interface EditMemberMenuProps {
  collection: CollectionDetail;
  editCollectionFn(collection: any): Promise<void>;
  users: UserView[];
}

function EditMemberMenu(props: EditMemberMenuProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { collection, editCollectionFn } = props;

  const [editedCollection, setEditedCollection] = useState({
    id: collection.id,
    collectionType: collection.collectionType,
    serviceType: collection.serviceType,
    imageUrl: collection.imageUrl,
    title: collection.title,
    startDate: collection.startDate,
    endDate: collection.endDate,
    members: collection.members.map((member: UserView) => {
      return props.users.find((user: UserView) => user.id === member.id);
    }),
  });
  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setTimeout(() => {
      setEditedCollection(collection);
    }, 200);
  };

  const id = open ? "member-edit-popover" : undefined;

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
          borderRadius: "0px",
          overflow: "visible",
          boxShadow: "none",
        },
      },
      delete_button: {
        minHeight: "0px",
        minWidth: "0px",
      },
      edit_member_button: {
        fontSize: "16px",
        letterSpacing: "-0.8px",
        fontFamily: "Noto Sans CJK KR Regular",
        color: "#E2E2E2",
        padding: "0px",
        width: "100px",
      },
    })
  );
  const myClasses = useMyStyles();

  const attendedUser = () => {
    return (
      <div className={pageStyle.attended_container}>
        <div className={pageStyle.count_text}>
          {!!editedCollection.members &&
            editedCollection.members.length > 0 &&
            editedCollection.members[0].displayName +
              " 외 " +
              (editedCollection.members.length - 1) +
              " 명 (참여자 리스트)"}
        </div>

        <div
          className={classNames({
            [pageStyle.list_container]: true,
          })}
        >
          <div className={pageStyle.list_container_padding_top} />
          {!!editedCollection.members[0] &&
            editedCollection.members.map((user: UserView) => (
              <div key={user.id} className={pageStyle.user_info}>
                <div className={pageStyle.user_info_text}>
                  {user.displayName}
                </div>

                <Button
                  className={myClasses.delete_button}
                  onClick={() => {
                    setEditedCollection({
                      ...editedCollection,
                      members: editedCollection.members.filter(
                        (it: UserView) => it.id !== user.id
                      ),
                    });
                  }}
                >
                  <div className={pageStyle.minus_container}>
                    <div className={pageStyle.minus}></div>
                  </div>
                </Button>
              </div>
            ))}
          <div className={pageStyle.list_container_padding_top} />
        </div>
      </div>
    );
  };
  return (
    <div className={pageStyle.attend_button}>
      <div className={pageStyle.button_container}>
        <div className={pageStyle.align_container}>
          <Button
            className={myClasses.edit_member_button}
            onClick={handleClickOpen}
            aria-describedby={id}
          >
            참여인원
          </Button>
        </div>
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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className={myClasses.popover}
      >
        <div className={pageStyle.edit_member_container}>
          <div className={pageStyle.top_container}>
            <Autocomplete
              id="users-search"
              style={{ width: "100%" }}
              multiple
              value={editedCollection.members}
              onChange={(event, newValue) => {
                setEditedCollection({
                  ...collection,
                  members: newValue,
                });
              }}
              options={props.users}
              //컬렉션의 member를 추가할 수도 있으니, 전체 유저 목록에서 검색
              renderInput={(params) => {
                return (
                  <InputBase
                    className={pageStyle.input_option_container}
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder={"ID 또는 이름으로 참여 인원 추가"}
                    autoFocus
                  />
                );
              }}
              getOptionLabel={(option) => option.displayName}
              renderOption={(option: UserView) => (
                <Fragment>
                  <div className={pageStyle.search_attend_user_item}>
                    <Avatar
                      alt={option.displayName}
                      src={option.imageUrl}
                      className={pageStyle.avatar}
                    />

                    <div className={pageStyle.user_info}>
                      <div className={pageStyle.name_text}>
                        {option.displayName}
                      </div>
                      <div className={pageStyle.user_info_text}>
                        삼성전자, 과장
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            />
            <Button
              // className={styleClasses.delete_button}
              onClick={() => {
                editCollectionFn(editedCollection);
              }}
            >
              확인
            </Button>
          </div>
          {attendedUser()}
        </div>
      </Popover>
    </div>
  );
}

interface SearchPlatterProps {
  collectionTitle: string;
  platterSummaries: PlatterSummaryData[];
  openSearchBar: boolean;
}

function SearchPlatter(props: SearchPlatterProps) {
  //open시 css로 지정된 animation을 이용해 우측에서 좌측으로 slide된 후 나타남.
  // 플레터 클릭시 # 주소로 원하는 platter로 스크롤 됨.
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
  const platterSummaires = props.platterSummaries
    .filter((it) => viewType === ViewType.ALL || it.joined)
    .filter((it) => it.title.includes(props.searchQuery));
  //컬렉션에 저장된 platter의 목록
  console.log("platterSummaires " + JSON.stringify(platterSummaires));
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
