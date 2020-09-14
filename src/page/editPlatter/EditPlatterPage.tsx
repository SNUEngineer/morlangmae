import React from "react";
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xl"
        fullScreen={fullScreen}
        open
        PaperComponent={PaperComponent}
        className={editStyle.dialog}
        classes={{
          paper: {
            position: "relative",
            overflowY: "auto",
            backgroundColor: "red",
          },
        }}

        //onClose={handleClose}
      >
        window.pageYOffset
        <div className={editStyle.board_container}>
          <div className={editStyle.container}>
            <div className={editStyle.platter_container}>
              <Platter editable {...props} />
            </div>
            <div className={editStyle.thread_container}>
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
