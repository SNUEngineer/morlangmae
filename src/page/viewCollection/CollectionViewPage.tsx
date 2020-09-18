import React, { useState, Fragment } from "react";
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

export interface CollectionViewPageProps extends CollectionProps {
  hiddenToolbar?: boolean;
  createPlatter: any;
}

export default function CollectionViewPage(props: CollectionViewPageProps) {
  const [editable, setEditable] = useState(false);
  //const { pathname } = useLocation();
  const history = useHistory();
  // const handleClose = () => {
  //   history.replace(pathname)
  // }
  return (
    <Fragment>
      {!props.hiddenToolbar && (
        <ToolBar
          editable={editable}
          setEditable={setEditable}
          createPlatter={props.createPlatter}
        />
      )}
      <Dialog
        fullWidth
        maxWidth="lg"
        open
        PaperComponent={PaperComponent}
        //onClose={handleClose}
      >
        {/* <DialogContent> */}
        <Collection {...props} />
        {/* </DialogContent> */}
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

const paperStyles = makeStyles((theme: Theme) =>
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

export function ToolBar(props: any) {
  const classes = useStyles();
  const options = ["진행 순", "진행 역순", "내가 참여한 플레터"];
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const [menuCoordinates, setMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  function DotMenuDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        classes={{
          paperScroll: {},
        }}
      >
        <List>
          <ListItem button onClick={() => handleListItemClick(options[0])}>
            <ListItemText primary={options[0]} />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick(options[1])}>
            <ListItemText primary={options[1]} />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  return (
    <AppBar
      position="fixed"
      className={classNames({
        [classes.appBar]: true,
      })}
    >
      <Toolbar>
        <div className={pageStyle.bar_container}>
          <div className={pageStyle.mode_container}>
            <Switch
              checked={props.editable}
              onChange={() => props.setEditable(!props.editable)}
              name="collection-mode"
            />
          </div>
          {/* # Platter Search # Sort */}
          <div className={pageStyle.search_container}>
            <div className={pageStyle.search_icon_container}>플레터 검색</div>
            <div className={pageStyle.split_bar}></div>
            <div className={pageStyle.search_bar}>
              플레터 타이틀로 검색해주세요
            </div>
          </div>

          <div className={pageStyle.item_align_menu}>
            <div
              className={pageStyle.dot_menu}
              onClick={(event) => {
                handleClickOpen();
                setMenuCoordinates(event.target.getBoundingClientRect());
              }}
            >
              {selectedValue}
            </div>
            <DotMenuDialog
              selectedValue={selectedValue}
              menuCoordinates={menuCoordinates}
              open={open}
              onClose={handleClose}
            />
          </div>

          <div className={pageStyle.create_platter_container}>
            <Button
              onClick={props.createPlatter}
              color="primary"
              variant="contained"
            >
              +
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
