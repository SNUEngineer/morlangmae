import React, { useState, Fragment, useRef } from "react";
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
      {!props.hideToolbar && (
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
        maxWidth="lg"
        open
        PaperComponent={PaperComponent}
        onClose={props.onClose}
        className={classes.paper}
      >
        <Collection {...props} editable={editable} />
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles((Theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: Theme.zIndex.drawer + 1000,
      top: 0,
      height: "60px",
      backgroundColor: "white",
      position: "relative",
      boxShadow: "none",
    },
  })
);

const paperStyles = makeStyles(() =>
  createStyles({
    paper: {
      top: 30,
    },
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
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
    >
      <Toolbar>
        <div className={pageStyle.center_container}>
          {!openSearchBar && <div>{props.collection.title}</div>}
        </div>
        <Switch
          checked={props.editable}
          onChange={() => props.setEditable(!props.editable)}
          name="collection-mode"
        />

        {/* {openSearchBar && }  */}
        <div className={pageStyle.switch_container}>
          <div className={pageStyle.view_mode}> </div>
          <div className={pageStyle.task_mode}> </div>
        </div>

        <div className={pageStyle.search_platter}>
          <SearchPlatter
            collectionTitle={props.collection.title}
            platterSummaries={props.platters}
            openSearchBar={openSearchBar}
            setOpenSearchBar={setOpenSearchBar}
          />
        </div>
        <Selector filter={props.sortType} />
        {props.editable && (
          <Button
            onClick={props.createPlatter}
            color="primary"
            variant="contained"
          >
            +
          </Button>
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    setOpenSearchBar(true);
    setAnchorEl(inputEl.current);
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
            <div className={pageStyle.text}></div>
            <TextField
              variant="outlined"
              name="title"
              onChange={handleChange}
            />
          </div>
        ) : (
          <Button variant="outlined" onClick={handleClick}>
            플래터 리스트
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
        style={{
          zIndex: "2199",
          marginTop: "0px",
        }}
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
      firstCell: {
        paddingLeft: "22px",
      },
      head_row: {
        borderWidth: "0px",
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
              className={classes.showAllButton}
            >
              전체보기
            </Button>
          </div>
          <div className={pageStyle.show_attending_platter}>
            <Button
              value={ViewType.JOINED}
              onClick={onClick}
              className={classes.showAttedingButton}
            >
              참여 중인 플래터만 보기
            </Button>
          </div>
        </div>
      </div>

      <TableContainer component={Paper}>
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
                  [classes.firstCell]: true,
                })}
              >
                플래터
              </TableCell>
              <TableCell className={pageStyle.head_cell}>담당자</TableCell>
              <TableCell className={pageStyle.head_cell}>날짜</TableCell>
              <TableCell className={pageStyle.head_cell}>알림</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {platterSummaires.map((data: PlatterSummaryData) => (
              <TableRow
                key={data.id}
                onClick={() => (window.location.href = `#platter-${data.id}`)}
              >
                <TableCell
                  className={classNames({
                    [pageStyle.body_cell]: true,
                    [classes.firstCell]: true,
                  })}
                >
                  {data.title}
                </TableCell>
                <TableCell className={pageStyle.body_cell}>
                  {data.createdBy.displayName}
                </TableCell>
                <TableCell className={pageStyle.body_cell}>
                  {data.createdDate}
                </TableCell>
                <TableCell className={pageStyle.body_cell}>
                  {data.hasNotification}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
