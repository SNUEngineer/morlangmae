import React, { useState } from "react";
import EditorJs from "react-editor-js";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { EDITOR_JS_TOOLS } from "../editor/tools";
import { UserView } from "../../services/user.service";
import Typography from "@material-ui/core/Typography";
import { BlockView } from "../../services/platter.service";
import TextField from "@material-ui/core/TextField";
import platterStyle from "./platter.module.scss";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export interface PlatterProps {
  id: number;
  title?: string;
  blocks: BlockView[];
  editable?: boolean;
  createdBy: UserView;
  createdDate: Date;
}

export default function Platter(props: PlatterProps) {
  const holderId = `platter-view-${props.id}`;
  const onReady = () => {
    if (!props.editable) {
      const blocks = document.getElementById(holderId);
      if (blocks) {
        blocks.style.pointerEvents = "none";
      }
      const tools = document.querySelectorAll(".ce-toolbar");
      tools.forEach((it: any) => (it.style.display = "none"));
    }
  };
  const [editorRef, setEditorRef] = useState<any>(null);

  const injectRef = (instance: any) => {
    setEditorRef(instance);
  };
  const onClick = async () => {
    if (editorRef) {
      console.log(await editorRef.save());
    }
  };
  const blocks = {
    time: new Date().getTime(),
    blocks: [{ type: "paragraph", data: { text: "hi" } }],
  };
  const test = {
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    companyId: "World Plus CNC",
    createdDate: "오전 9:05, 8월 8일 생성",
    subtitle: "현지인 들이 추천하는",
    title: "1차 기획 회의",
  };
  const options = ["참여중인 인원 관리", "수정하기"];
  const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[1]);
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
    const classes = useStyles();
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
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={options[0]} />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick(options[1])}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={options[1]} />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  return (
    <div className={platterStyle.platter_container}>
      <div className={platterStyle.align_container}>
        <a href={`#platter-${props.id}`}>Platter</a>
        {/* <Typography>{props.createdDate}</Typography>
      <Avatar alt={props.createdBy.displayName} src={props.createdBy.imageUrl} />
      <Typography>{props.createdBy.displayName}</Typography>
      <Typography>{props.createdBy.companyId}</Typography> */}
        <div className={platterStyle.dot_menu_container}>
          <div className={platterStyle.dot_menu}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) => {
                handleClickOpen();
                setMenuCoordinates(event.target.getBoundingClientRect());
              }}
            >
              ...
            </Button>
            <DotMenuDialog
              selectedValue={selectedValue}
              menuCoordinates={menuCoordinates}
              open={open}
              onClose={handleClose}
            />
          </div>
        </div>

        <div className={platterStyle.platter_info_container}>
          <div className={platterStyle.title_container}>
            <TextField
              className={platterStyle.subtitle}
              required
              defaultValue={test.subtitle}
              fullWidth
              id="title"
              name="title"
            />
            <TextField
              className={platterStyle.title}
              required
              defaultValue={test.title}
              fullWidth
              id="title"
              name="title"
            />
          </div>

          <div className={platterStyle.writer_container}>
            <Typography className={platterStyle.date_text}>
              {test.createdDate}
            </Typography>

            <div className={platterStyle.profile_container}>
              <Avatar
                alt={test.displayName}
                src={test.imageUrl}
                className={platterStyle.avatar}
              />
              <div className={platterStyle.name_text_container}>
                <Typography className={platterStyle.name_text}>
                  {test.displayName}
                </Typography>
                <Typography className={platterStyle.company_text}>
                  {test.companyId}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={platterStyle.editor_container}>
          <EditorJs
            holder={holderId}
            data={blocks}
            instanceRef={injectRef}
            onReady={onReady}
            tools={EDITOR_JS_TOOLS}
          >
            <div id={holderId} />
          </EditorJs>
        </div>
        <Button onClick={onClick}>Give me data</Button>
      </div>
    </div>
  );
}
