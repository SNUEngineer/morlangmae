// @ts-nocheck
import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import PlatterEditor, {
  PlatterEditorProps,
  PlatterData,
} from "../../components/platter/PlatterEditor";
import Dialog from "../../components/customizedComponent/PlatterDialog/Dialog";
import Platter, { PlatterProps } from "../../components/task/Platter";
import { useLocation, useHistory } from "react-router-dom";
import Thread, { ThreadProps } from "../../components/thread/Thread";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import editStyle from "./editPlatterPage.module.scss";
import classNames from "classnames";
import { Link, Element } from "react-scroll";
import { MessageData } from "../../components/thread/Message";
import DialogContent from "@material-ui/core/DialogContent";
import PlatterToolBar from "../../components/platter/PlatterToolBar";
import { UserView } from "../../services/user.service";
import queryString from "query-string";

enum BlockType {
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

export interface EditPlatterPageProps extends PlatterProps, ThreadProps {
  platter: PlatterData;
  messages: MessageData[];
  collectionMembers: UserView[];
  //ccs 관리를 위한 컬렉션에 소속된 멤버 목록
  editPlatter(data: any): Promise<void>;
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageData[]>;
  onClose: Promise<void>;
  addCcs: Promise<void>;
  removeCcs: Promise<void>;
}

export default function EditPlatterPage(props: EditPlatterPageProps) {
  const [openThread, setOpenThread] = useState(false);
  const [openPlatter, setOpenPlatter] = useState(true);
  const boardContainerEl = useRef<any>(null);
  const threadContainerEl = useRef<any>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [editorRef, setEditorRef] = useState(null);
  const [isEditing, setEditing] = useState(false);
  // const { pathname, search } = useLocation();
  const pathname = "";
  const search = "";
  const history = useHistory();
  const handleClose = () => {
    const query = queryString.parse(search);
    delete query.platterId;
    history.replace({
      pathname,
      search: queryString.stringify(query),
    });
  };
  const handleEditPlatter = async () => {
    try {
      await props.editPlatter({
        title,
        blocks: (await (editorRef as any).save()).blocks.map((it: any) => {
          console.log(
            "it.data.filesit.data.files " + JSON.stringify(it.data.files)
          );
          return {
            type: toBlockType(it.type),
            content: it.data.text || "aa",
            attaches: it.data.files || ["aafafa"],
          };
        }),
      });
      props.platter?.members?.forEach((member) => {
        if (!members?.includes(member)) {
          props.removeCcs(member.id);
        }
      });
      members?.forEach((member) => {
        if (!props.platter?.members?.includes(member)) {
          props.addCcs(member.id);
        }
      });

      await handleClose();
    } catch {}
  };

  const onScrollHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const clickThreadButton = useCallback(() => {
    //thread 버튼 클릭시, 아래로 이동하면서 화면 고정.
    if (!openThread) {
      if (!!boardContainerEl.current) {
        setOpenThread(true);
        setEditing(false);
        //화면 스크롤 후 고정을 위한 딜레이.
        setTimeout(() => setOpenPlatter(false), 400);
      }
    }
  }, [openThread]);
  const clickPlatterButton = useCallback(() => {
    setOpenPlatter(true);
    setTimeout(() => setOpenThread(false), 200);
  }, []);
  const rootEl = useRef();
  const onRendered = () => {
    if (rootEl?.current) {
      const current = rootEl.current as any;
      current.style.zIndex = 1310;
    }
  };
  const [title, setTitle] = useState(props.platter.title);
  const [members, setMembers] = useState(props.platter.members);
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xl"
        fullScreen={fullScreen}
        open
        onRendered={onRendered}
        PaperComponent={PaperComponent}
        onClick={props.onClose}
      >
        <Element
          name="test7"
          id="containerElement"
          className={classNames({
            [editStyle.board_container]: true,
            [editStyle.board_container_thread_closed]: !openThread,
            [editStyle.board_container_thread_opened]: openThread,
          })}
          ref={boardContainerEl}
          onScroll={onScrollHandler}
        >
          <div
            className={classNames({
              [editStyle.container]: true,
              [editStyle.container_thread_closed]: !openThread,
              [editStyle.container_thread_opened]: openThread,
            })}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Element name="threadContainer">
              <div
                className={classNames({
                  [editStyle.thread_container]: true,
                  [editStyle.thread_container_closed]: !openThread,
                  [editStyle.thread_container_opened]: openThread,
                })}
                ref={threadContainerEl}
              >
                <Thread
                  messages={props.messages}
                  sendMessage={props.sendMessage}
                  loadMessages={props.loadMessages}
                />
              </div>
            </Element>
          </div>
        </Element>
        <div className={editStyle.fixed_menu_button}>
          {/* platter와 thread 이동 버튼 */}
          <Link
            activeClass="active"
            to="firstInsideContainer22"
            spy={true}
            smooth={true}
            duration={250}
            containerId="containerElement"
            style={{ display: "inline-block", margin: "8px" }}
            onClick={() => {
              clickPlatterButton();
              setEditing(true);
            }}
          >
            <div className={editStyle.button_container}>
              <div className={editStyle.icon_container}>
                <img className={editStyle.editor_icon} alt={"icon"} />
              </div>
              <div className={editStyle.text}>에디터</div>
            </div>
          </Link>

          <Link
            activeClass="active"
            to="firstInsideContainer"
            spy={true}
            smooth={true}
            duration={250}
            containerId="containerElement"
            style={{ display: "inline-block", margin: "8px" }}
            onClick={() => {
              clickPlatterButton();
              setEditing(false);
            }}
          >
            <div className={editStyle.button_container}>
              <div className={editStyle.icon_container}>
                <img className={editStyle.platter_icon} alt={"icon"} />
              </div>
              <div className={editStyle.text}>플레터</div>
            </div>
          </Link>

          <Link
            activeClass="active"
            to="threadContainer"
            spy={true}
            smooth={true}
            duration={250}
            containerId="containerElement"
            style={{ display: "inline-block", margin: "8px" }}
            onClick={() => {
              clickThreadButton();
            }}
          >
            <div className={editStyle.button_container}>
              <div className={editStyle.icon_container}>
                <img className={editStyle.thread_icon} alt={"icon"} />
              </div>
              <div className={editStyle.text}>스레드</div>
            </div>
          </Link>
        </div>
      </Dialog>
    </div>
  );
}

const paperStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: 0,
    },
  })
);

export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const classes = paperStyles();

  return <Paper {...props} className={clsx(inherited, classes.paper)} />;
}
