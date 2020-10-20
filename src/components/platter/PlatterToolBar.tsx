// @ts-nocheck
import React, { Fragment, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import ParagraphButton from "./ParagraphButton";
import AppBar from "@material-ui/core/AppBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import { UserView } from "../../services/user.service";
import Typography from "@material-ui/core/Typography";
import platterStyle from "./PlatterEditor.module.scss";
import classNames from "classnames";

interface PlatterToolBarProps {
  collectionMembers: UserView[];
  members: UserView[];
  setMembers(members: UserView[]): void;
  createPlatter?(): Promise<void>;
  editorRef: any;
}

interface EditorRefProps {
  editorRef: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1000,
      top: 64,
    },
  })
);

export default function PlatterToolBar(props: PlatterToolBarProps) {
  const classes = useStyles();

  const { editorRef } = props;

  const bold = () => document.execCommand("bold");
  const underline = () => document.execCommand("underline");
  const alignLeft = () => document.execCommand("justifyleft");
  const alignCenter = () => document.execCommand("justifycenter");
  const alignRight = () => document.execCommand("justifyright");

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <ParagraphButton editorRef={editorRef} />
        <ConvertButton editorRef={editorRef} />
        <Button variant="outlined" onClick={bold}>
          B
        </Button>
        <Button variant="outlined" onClick={underline}>
          U
        </Button>
        <ColorButton />
        <Button variant="outlined" onClick={alignLeft}>
          L
        </Button>
        <Button variant="outlined" onClick={alignCenter}>
          C
        </Button>
        <Button variant="outlined" onClick={alignRight}>
          R
        </Button>
        <LinkButton />
        <AttendButton
          collectionMembers={props.collectionMembers}
          platterMembers={props.members}
          setPlatterMembers={props.setMembers}
        />
        {props.createPlatter && (
          <Button variant="outlined" onClick={props.createPlatter}>
            플래터 생성
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

function ConvertButton(props: EditorRefProps) {
  const classes = popOverStyles();
  const { editorRef } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "convert-popover" : undefined;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toHeader = async () => {
    const index = editorRef.blocks.getCurrentBlockIndex();
    const data = await editorRef.save();
    const block = data.blocks[index];
    editorRef.blocks.delete(index);
    editorRef.blocks.insert(
      "header",
      { text: block.data.text, level: 2 },
      undefined,
      index
    );
    editorRef.blocks.getBlockByIndex(index).holder.focus();
  };
  const toSubheader = async () => {
    const index = editorRef.blocks.getCurrentBlockIndex();
    const data = await editorRef.save();
    const block = data.blocks[index];
    editorRef.blocks.delete(index);
    editorRef.blocks.insert(
      "header",
      { text: block.data.text, level: 3 },
      undefined,
      index
    );
  };
  const toText = async () => {
    const index = editorRef.blocks.getCurrentBlockIndex();
    const data = await editorRef.save();
    const block = data.blocks[index];
    editorRef.blocks.delete(index);
    editorRef.blocks.insert(
      "paragraph",
      { text: block.data.text },
      undefined,
      index
    );
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClick}>
        본문
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          root: classes.popover,
        }}
      >
        <Button variant="outlined" onClick={toHeader}>
          헤더
        </Button>
        <Button variant="outlined" onClick={toSubheader}>
          서브헤더
        </Button>
        <Button variant="outlined" onClick={toText}>
          본문
        </Button>
      </Popover>
    </Fragment>
  );
}

const popOverStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      zIndex: `${theme.zIndex.drawer + 10001} !important` as any,
    },
    show_list_button: {
      minHeight: "0px",
      minWidth: "0px",
      padding: "0px",
      margin: "-2px 0 0 0",
      backgroundColor: "transparent",
      boxShadow: "none",
      "&:active": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },
    delete_button: {
      minHeight: "0px",
      minWidth: "0px",
    },
  })
);
function ColorButton() {
  const classes = popOverStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const color = (color: any) => {
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("foreColor", false, color);
  };
  const black = () => color("#000000");
  const green = () => color("#00ff00");
  const blue = () => color("#0000ff");
  const red = () => color("#ff0000");

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClick}>
        A
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          root: classes.popover,
        }}
      >
        <Button variant="outlined" onClick={black}>
          B
        </Button>
        <Button variant="outlined" onClick={green}>
          G
        </Button>
        <Button variant="outlined" onClick={blue}>
          B
        </Button>
        <Button variant="outlined" onClick={red}>
          R
        </Button>
      </Popover>
    </Fragment>
  );
}

function LinkButton() {
  const classes = popOverStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "link-popover" : undefined;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { register, handleSubmit, reset } = useForm();
  const link = ({ url }: any) => {
    document.execCommand(
      "insertHTML",
      false,
      `<a href="${url}" target="_blank>${url}</a>`
    );
    reset();
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClick}>
        L
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          root: classes.popover,
        }}
      >
        <form onSubmit={handleSubmit(link)}>
          <TextField
            label="standard"
            name="url"
            inputRef={register}
          ></TextField>
        </form>
      </Popover>
    </Fragment>
  );
}

interface AttendButtonProps {
  collectionMembers?: UserView[];
  platterMembers?: UserView[];
  setPlatterMembers(platterMembers: UserView[]): void;
}

function AttendButton(props: AttendButtonProps) {
  const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const classes = popOverStyles();
  const id = popoverOpen ? "simple-popover-search" : undefined;
  console.log("props.usersprops.users " + JSON.stringify(props.users));
  const handleClickOpen = (event) => {
    setPopoverOpen(true);
    setPopOverAnchorEl(event.currentTarget);
  };
  // setPasswordActive(false);
  // setPopOpen(false);

  const handleClose = (value) => {
    setPopoverOpen(false);
    setPopOverAnchorEl(null);
  };
  const attendedUser = (checking: boolean) => {
    return (
      <div className={platterStyle.attended_user_container}>
        <div className={platterStyle.count_text_check_container}>
          {!!props.platterMembers && !!props.platterMembers[0] && (
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClickOpen}
              className={classes.show_list_button}
              endIcon={<img className={platterStyle.go_to_icon} alt={"icon"} />}
              // endIcon={
              //   <div>
              //     <MoreHorizIcon />
              //   </div>
              // }
            >
              <div className={platterStyle.count_text_check}>
                {props.platterMembers[0].displayName +
                  " 외 " +
                  (props.platterMembers.length - 1) +
                  " 명"}
              </div>
            </Button>
          )}

          <Popover
            onClose={handleClose}
            id={id}
            open={popoverOpen}
            //open={false}
            anchorEl={popOverAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "visible",
              },
            }}
            className={classes.popover}
          >
            <div className={platterStyle.attend_popover}>
              <div
                className={classNames({
                  [platterStyle.list_container]: true,
                  [platterStyle.list_container_basic]: true,
                })}
              >
                <div className={platterStyle.list_container_padding_top} />
                {!!props.platterMembers &&
                  !!props.platterMembers[0] &&
                  props.platterMembers.map((user: UserView) => (
                    <div key={user.id} className={platterStyle.user_info}>
                      <div className={platterStyle.user_info_text}>
                        {user.displayName}
                      </div>

                      {!checking && (
                        <Button
                          className={classes.delete_button}
                          onClick={() => {
                            setPlatterMembers(
                              props.platterMembers.filter(
                                (it: UserView) => it.id !== user.id
                              )
                            );
                          }}
                        >
                          <div className={platterStyle.minus_container}>
                            <div className={platterStyle.minus}></div>
                          </div>
                        </Button>
                      )}
                    </div>
                  ))}
                <div className={platterStyle.list_container_padding_top} />
              </div>
            </div>
          </Popover>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Autocomplete
        id="users-search"
        style={{ width: 300 }}
        multiple
        value={props.platterMembers}
        onChange={(event, newValue) => {
          props.setPlatterMembers(newValue);
        }}
        options={props.collectionMembers}
        renderInput={(params) => {
          return (
            <InputBase
              className={platterStyle.input_option_container}
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
            <div className={platterStyle.search_attend_user_item}>
              <Avatar
                alt={option.displayName}
                src={option.imageUrl}
                className={platterStyle.avatar}
              />

              <div className={platterStyle.user_info}>
                <div className={platterStyle.name_text}>
                  {option.displayName}
                </div>
                <div className={platterStyle.user_info_text}>
                  삼성전자, 과장
                </div>
              </div>
            </div>
          </Fragment>
        )}
        classes={{ popper: classes.popover }}
      />
      {attendedUser()}
    </Fragment>
  );
}
