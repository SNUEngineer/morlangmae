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

export interface EditPlatterPageProps extends PlatterProps, ThreadProps {}

export default function EditPlatterPage(props: EditPlatterPageProps) {
  // const { pathname } = useLocation();
  const history = useHistory();
  // const handleClose = () => {
  //   history.replace(pathname)
  // }
  const [scrollTop, setScrollTop] = useState(0);
  const [threadScrollTop, setThreadScrollTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const boardContainerEl = useRef<any>(null);
  const threadContainerEl = useRef<any>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  useLayoutEffect(() => {
    function updateScrollPosition() {
      if (!!boardContainerEl.current) {
        // console.log(
        //   "winSCroll afa " +
        //     JSON.stringify(boardContainerEl.current.getBoundingClientRect())
        // );
        setScrollTop(-boardContainerEl.current.getBoundingClientRect().y);
        console.log("----------------");
        console.log(window.pageYOffset);
        console.log(boardContainerEl.current.scrollTop);
        console.log("----------------");
        if (
          threadContainerEl.current.getBoundingClientRect().y - 30 <
          window.innerHeight
        ) {
          console.log("우와우와!! 침범");
          window.scrollTo(0, 0);
        }
      }
      if (!!threadContainerEl.current) {
        setThreadScrollTop(threadContainerEl.current.getBoundingClientRect().y);
      }
    }

    function updateSize() {
      setWindowHeight(window.innerHeight);
      if (!!boardContainerEl.current) {
      }
      if (threadScrollTop < windowHeight) {
        // thread 영역 침범
        console.log("에러에러!!! 스레드 영역 침범!");
      }
    }
    //window.addEventListener("scroll", updateScrollPosition, false);
    window.addEventListener("scroll", (_) => updateScrollPosition(), true);
    window.addEventListener("resize", (_) => updateSize(), true);
    updateSize();
    updateScrollPosition();
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("resize", updateSize);
    };
  }, [boardContainerEl, threadContainerEl, window]);

  const cards = useCallback(() => {
    console.log("에러에러!!! 스레드 영역 침범!asdf");
    if (threadScrollTop < windowHeight) {
      // thread 영역 침범
      console.log("에러에러!!! 스레드 영역 침범!");
    }
  }, [threadScrollTop, windowHeight]);

  const onScrollHandler = (event) => {
    console.log("sadfasd " + event.pageY);
  };

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
        <div
          className={editStyle.board_container}
          ref={boardContainerEl}
          onScroll={(event) => {
            onScrollHandler(event);
          }}
        >
          <div className={editStyle.container}>
            <div className={editStyle.platter_container}>
              <Platter editable {...props} />
            </div>
            <div className={editStyle.thread_container} ref={threadContainerEl}>
              <Thread {...props} />
            </div>
            <div className={editStyle.fixed_menu_button}>
              <div className={editStyle.editor_button}>에디터</div>
              <div className={editStyle.platter_button}>플레터</div>
              <div className={editStyle.thread_button}>스레드</div>
            </div>
          </div>
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
