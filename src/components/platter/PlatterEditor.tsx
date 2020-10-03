import React, { useState, Fragment, useEffect } from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../editor/tools";
import { UserView } from "../../services/user.service";
import { BlockView } from "../../services/platter.service";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Popover from "@material-ui/core/Popover";
import ParagraphButton from "./ParagraphButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import Avatar from "@material-ui/core/Avatar";
import platterStyle from "./PlatterEditor.module.scss";

export interface PlatterEditorProps {
  id: number | "CREATING";
  data?: PlatterData;
  title?: string;
  changeTitle(title: string): void;
  editorRef: any;
  setEditorRef: any;
  disableEditing?: boolean;
}

export interface PlatterData {
  id: number;
  title: string;
  blocks: BlockView[];
  createdBy: UserView;
  createdDate: Date;
  members: UserView[];
}

enum BlockType {
  HEADER = "HEADER",
  SUB_HEADER = "SUB_HEADER",
  TEXT = "TEXT",
  IMAGES = "IMAGES",
  FILES = "FILES",
}

function toBlockType(type: string): BlockType {
  switch (type) {
    case "paragraph":
      return BlockType.TEXT;
    case "header":
      return BlockType.SUB_HEADER;
    case "images":
      return BlockType.IMAGES;
    case "files":
      return BlockType.FILES;
    default:
      return BlockType.TEXT;
  }
}

function typeToString(type: BlockType): string {
  switch (type) {
    case BlockType.TEXT:
      return "paragraph";
    case BlockType.SUB_HEADER:
      return "header";
    case BlockType.IMAGES:
      return "images";
    case BlockType.FILES:
      return "files";
    default:
      return "paragraph";
  }
}

export function viewToData(view: BlockView) {
  if (view.type === BlockType.TEXT) {
    return {
      type: "paragraph",
      data: {
        text: view.content,
      },
    };
  } else if (
    view.type === BlockType.HEADER ||
    view.type === BlockType.SUB_HEADER
  ) {
    return {
      type: "header",
      data: {
        text: view.content,
      },
    };
  } else if (view.type === BlockType.IMAGES) {
    return {
      type: "images",
      data: {
        files: view.attaches,
      },
    };
  }

  return {
    type: typeToString(view.type as BlockType),
    data: view.content,
  };
}

function dataToView() {}

export default function PlatterEditor(props: PlatterEditorProps) {
  const [data] = useState({
    title: props.data?.title,
    blocks: props.data?.blocks,
  });
  const holderId = `platter-editor-${props.id}`;
  const changeTitle = async (event: any) => {
    props.changeTitle(event.target.value);
  };

  const onReady = () => {
    const blocks = document.getElementById(holderId);
    if (blocks) {
      if (props.disableEditing) {
        blocks.style.pointerEvents = "none";
      } else {
        blocks.style.pointerEvents = "";
      }
    }
    const tools = document.querySelectorAll(".ce-toolbar");
    const inlineTools = document.querySelectorAll(".ce-inline-toolbar");
    tools.forEach((it: any) => (it.style.display = "none"));
    inlineTools.forEach((it: any) => (it.style.display = "none"));
  };
  onReady();
  const editorData = {
    blocks: data?.blocks?.map((it) => viewToData(it)) || [],
  };

  const [top, setTop] = useState<number | undefined>(0);

  window.addEventListener("focus", (ev) => {
    // console.log(document.activeElement?.classList)
    if (document.activeElement?.classList.contains("cdx-block")) {
      setTop(document.activeElement?.getBoundingClientRect().top);
    }
  });

  const test = {
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    companyId: "World Plus CNC",
    createdDate: "오전 9:05, 8월 8일 생성",
    subtitle: "현지인 들이 추천하는",
    title: "1차 기획 회의",
  };
  const options = ["참여중인 인원 관리", "수정하기", "되돌아보기"];
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
  return (
    <div className={platterStyle.platter_container}>
      <FloatingToolbar top={top} />
      <div className={platterStyle.align_container}>
        <a href={`#platter-${props.id}`}>Platter</a>
        {/* <Typography>{props.createdDate}</Typography>
      <Avatar alt={props.createdBy.displayName} src={props.createdBy.imageUrl} />
      <Typography>{props.createdBy.displayName}</Typography>
      <Typography>{props.createdBy.companyId}</Typography> */}
        <div className={platterStyle.dot_menu_container}>
          <div className={platterStyle.dot_menu}>
            <FloatingMenu options={options} />
          </div>
        </div>

        <div className={platterStyle.platter_info_container}>
          <div className={platterStyle.title_container}>
            <TextField
              disabled={props.disableEditing}
              required
              defaultValue={data.title}
              onChange={changeTitle}
              fullWidth
              id="title"
              name="title"
              InputProps={{ classes }}
            />
            <TextField
              className={platterStyle.title}
              required
              defaultValue={test.title}
              fullWidth
              id="title"
              name="title"
              InputProps={{ classes }}
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
            instanceRef={props.setEditorRef}
            tools={EDITOR_JS_TOOLS as any}
            data={editorData}
            onReady={onReady}
          >
            <div id={holderId} />
          </EditorJs>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      top: (props: any) => props.top,
    },
  })
);

export function FloatingToolbar(props: any) {
  const { editorRef, top } = props;
  const classes = useStyles(props);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "floating-toolbar-button" : undefined;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <Fab className={classes.fab} onClick={handleClick}>
        +
      </Fab>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <ParagraphButton editorRef={editorRef} />
      </Popover>
    </Fragment>
  );
}
