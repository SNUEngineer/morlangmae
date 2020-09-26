import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
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

export interface EditPlatterPageProps extends PlatterProps, ThreadProps {
  platter: PlatterData;
  messages: MessageData[];
  collectionMembers: UserView[];
  editPlatter(data: any): Promise<void>;
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageData[]>;
}

export default function EditPlatterPage(props: EditPlatterPageProps) {
  // const { pathname } = useLocation();
  const history = useHistory();
  // const handleClose = () => {
  //   history.replace(pathname)
  // }
  const [openThread, setOpenThread] = useState(false);
  const [openPlatter, setOpenPlatter] = useState(true);

  const boardContainerEl = useRef<any>(null);
  const threadContainerEl = useRef<any>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xl"
        fullScreen={fullScreen}
        open
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
                <Platter editable {...props} />
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
                <Thread {...props} />
              </div>
            </Element>

            <div className={editStyle.fixed_menu_button}>
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
