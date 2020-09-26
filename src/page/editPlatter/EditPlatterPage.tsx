import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import PlatterEditor, {
  PlatterEditorProps,
  PlatterData,
} from "../../components/platter/PlatterEditor";
import Dialog from "../../components/customizedComponent/PlatterDialog/Dialog";
import Platter, { PlatterProps } from "../../components/collection/Platter";
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
import Fab from "@material-ui/core/Fab";

export interface EditPlatterPageProps extends PlatterProps, ThreadProps {
  platter: PlatterData;
  messages: MessageData[];
  collectionMembers: UserView[];
  editPlatter(data: any): Promise<void>;
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageData[]>;
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
  const { pathname, search } = useLocation();
  const history = useHistory();
  const handleClose = () => {
    const query = queryString.parse(search);
    delete query.platterId;
    history.replace({
      pathname,
      search: queryString.stringify(query),
    });
  };

  const onScrollHandler = (event) => {
    console.log("Asdfasdfffsf");
    event.preventDefault();
    event.stopPropagation();
  };
  const clickThreadButton = useCallback(() => {
    if (!openThread) {
      if (!!boardContainerEl.current) {
        setOpenThread(true);
        setTimeout(() => setOpenPlatter(false), 400);
      }
    }
  }, [openThread]);
  const clickPlatterButton = useCallback(() => {
    setOpenPlatter(true);
    setTimeout(() => setOpenThread(false), 400);
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
  const setEditing = () => {
    props.setEditing(true);
  };
  const unsetEditing = () => {
    props.setEditing(false);
  };

  return (
    <div>
      {isEditing && (
        <PlatterToolBar
          collectionMembers={props.collectionMembers}
          setMembers={setMembers}
          members={members}
          editorRef={editorRef}
        />
      )}

      <Dialog
        fullWidth
        maxWidth="xl"
        fullScreen={fullScreen}
        open
        onRendered={onRendered}
        PaperComponent={PaperComponent}

        //onClose={handleClose}
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
          >
            <Element
              name="firstInsideContainer"
              style={{
                marginBottom: "200px",
              }}
            >
              <div
                className={classNames({
                  [editStyle.platter_container]: true,
                  [editStyle.platter_container_closed]: !openPlatter,
                  [editStyle.platter_container_opened]: openPlatter,
                })}
              >
                <PlatterEditor
                  disableEditing={!isEditing}
                  title={title}
                  changeTitle={setTitle}
                  id={props.platter.id}
                  data={props.platter}
                  editorRef={editorRef}
                  setEditorRef={setEditorRef}
                />
              </div>
            </Element>

            <Element name="threadContainer" style={{}}>
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

            <div className={editStyle.fixed_menu_button}>
              <Link
                activeClass="active"
                to="firstInsideContainer22"
                spy={true}
                smooth={true}
                duration={250}
                containerId="containerElement"
                style={{ display: "inline-block", margin: "20px" }}
                onClick={() => {
                  clickPlatterButton();
                  setEditing();
                }}
              >
                에디터
              </Link>

              <Link
                activeClass="active"
                to="firstInsideContainer"
                spy={true}
                smooth={true}
                duration={250}
                containerId="containerElement"
                style={{ display: "inline-block", margin: "20px" }}
                onClick={() => {
                  clickPlatterButton();
                  unsetEditing();
                }}
              >
                플레터
              </Link>

              <Link
                activeClass="active"
                to="threadContainer"
                spy={true}
                smooth={true}
                duration={250}
                containerId="containerElement"
                style={{ display: "inline-block", margin: "20px" }}
                onClick={() => {
                  clickThreadButton();
                }}
              >
                스레드
              </Link>
            </div>
          </div>
        </Element>
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
