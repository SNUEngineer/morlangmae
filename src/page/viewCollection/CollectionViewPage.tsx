import React, { useState, Fragment, useRef } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { useLocation, useHistory } from "react-router-dom";
import Collection, {
  CollectionProps,
} from "../../components/collection/Collection";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Switch from "@material-ui/core/Switch";
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
        disableEnforceFocus
        fullWidth
        maxWidth="lg"
        open
        PaperComponent={PaperComponent}
        onClose={props.onClose}
      >
        <DialogContent>
          <Collection {...props} editable={editable} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1000,
      top: 0,
      height: "60px",
      backgroundColor: "white",
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

  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
    >
      <Toolbar>
        <Switch
          checked={props.editable}
          onChange={() => props.setEditable(!props.editable)}
          name="collection-mode"
        />
        <Typography>{props.collection.title}</Typography>
        <SearchPlatter
          collectionTitle={props.collection.title}
          platterSummaries={props.platters}
        />
        <select name="sortType" onChange={handleChange} value={props.sortType}>
          <option value={SortType.RECENTLY_ASC}>시간 순</option>
          <option value={SortType.RECENTLY_DESC}>최신 순</option>
        </select>
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
}

function SearchPlatter(props: SearchPlatterProps) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
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
    <Fragment>
      <div ref={inputEl} style={{ display: "flex" }}>
        {openSearchBar ? (
          <Fragment>
            <Typography>플래터 검색</Typography>
            <TextField
              variant="outlined"
              name="title"
              onChange={handleChange}
            />
          </Fragment>
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
      >
        <PlatterSummaryList
          searchQuery={searchQuery}
          collectionTitle={props.collectionTitle}
          platterSummaries={props.platterSummaries}
        />
      </Popover>
    </Fragment>
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

  const [viewType, setViewType] = useState(ViewType.ALL);
  const platterSummaires = props.platterSummaries
    .filter((it) => viewType === ViewType.ALL || it.joined)
    .filter((it) => it.title.includes(props.searchQuery));
  const onClick = (event: any) => {
    setViewType(event.target.value);
  };

  return (
    <Fragment>
      <Typography>{props.collectionTitle}의 리스트</Typography>
      <Button variant="outlined" value={ViewType.ALL} onClick={onClick}>
        전체보기
      </Button>
      <Button variant="outlined" value={ViewType.JOINED} onClick={onClick}>
        참여 중인 플래터만 보기
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>플래터</TableCell>
              <TableCell>담당자</TableCell>
              <TableCell>날짜</TableCell>
              <TableCell>알림</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {platterSummaires.map((data: PlatterSummaryData) => (
              <TableRow
                key={data.id}
                onClick={() => (window.location.href = `#platter-${data.id}`)}
              >
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.createdBy.displayName}</TableCell>
                <TableCell>{data.createdDate}</TableCell>
                <TableCell>{data.hasNotification}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
