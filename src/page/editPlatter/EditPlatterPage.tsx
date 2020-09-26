import React, { Fragment, useState, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import PlatterEditor, {
  PlatterEditorProps,
  PlatterData,
} from "../../components/platter/PlatterEditor";
import { useLocation, useHistory } from "react-router-dom";
import Thread, { ThreadProps } from "../../components/thread/Thread";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import clsx from "clsx";
import { MessageData } from "../../components/thread/Message";
import DialogContent from "@material-ui/core/DialogContent";
import PlatterToolBar from "../../components/platter/PlatterToolBar";
import { UserView } from "../../services/user.service";
import queryString from "query-string";
import Fab from "@material-ui/core/Fab";

export interface EditPlatterPageProps {
  platter: PlatterData;
  messages: MessageData[];
  collectionMembers: UserView[];
  editPlatter(data: any): Promise<void>;
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageData[]>;
}

export default function EditPlatterPage(props: EditPlatterPageProps) {
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
    <Fragment>
      {isEditing && (
        <PlatterToolBar
          collectionMembers={props.collectionMembers}
          setMembers={setMembers}
          members={members}
          editorRef={editorRef}
        />
      )}
      <Dialog
        ref={rootEl}
        disableEnforceFocus
        fullWidth
        maxWidth="lg"
        open
        onRendered={onRendered}
        PaperComponent={PaperComponent}
        onClose={handleClose}
      >
        <DialogContent style={{ minHeight: 950 }}>
          <PlatterEditor
            disableEditing={!isEditing}
            title={title}
            changeTitle={setTitle}
            id={props.platter.id}
            data={props.platter}
            editorRef={editorRef}
            setEditorRef={setEditorRef}
          />
          <Thread
            messages={props.messages}
            sendMessage={props.sendMessage}
            loadMessages={props.loadMessages}
          />
          <FloatingButtons setEditing={setEditing} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const paperStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      maxHeight: 950,
      top: 100,
    },
  })
);

export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const classes = paperStyles();

  return <Paper {...props} className={clsx(inherited, classes.paper)} />;
}

const fabsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: 500,
      right: 150,
    },
    fabWrapper: {
      margin: 10,
    },
  })
);

function FloatingButtons(props: any) {
  const classes = fabsStyles();

  const setEditing = () => {
    props.setEditing(true);
  };
  const unsetEditing = () => {
    props.setEditing(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.fabWrapper}>
        <Fab onClick={unsetEditing}>플래터</Fab>
      </div>
      <div className={classes.fabWrapper}>
        <Fab onClick={setEditing}>에디터</Fab>
      </div>
      <div className={classes.fabWrapper}>
        <Fab>스레드</Fab>
      </div>
    </div>
  );
}
