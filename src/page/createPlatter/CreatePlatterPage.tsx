import React, { Fragment, useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import PlatterEditor, {
  PlatterEditorProps,
  PlatterData,
} from "../../components/platter/PlatterEditor";
import PlatterToolBar from "../../components/platter/PlatterToolBar";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import clsx from "clsx";
import DialogContent from "@material-ui/core/DialogContent";
import queryString from "query-string";
import { UserView } from "../../services/user.service";

export interface CreatePlatterPageProps {
  collectionMembers: UserView[];
  createPlatter(data: any): Promise<void>;
}

enum BlockType {
  SUB_HEADER = "SUB_HEADER",
  TEXT = "TEXT",
  IMAGES = "IMAGES",
  FILES = "FILES",
}

function toBlockType(type: string): BlockType {
  console.log(type);
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

export default function CreatePlatterPage(props: CreatePlatterPageProps) {
  const { pathname, search } = useLocation();
  const [editorRef, setEditorRef] = useState(null);
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
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState<UserView[]>([]);
  const createPlatter = async () => {
    try {
      await props.createPlatter({
        title,
        ccs: members.map((it) => it.id),
        blocks: (await (editorRef as any).save()).blocks.map((it: any) => {
          return {
            type: toBlockType(it.type),
            content: it.data.text || "",
            attaches: it.data.files || [],
          };
        }),
      });
      handleClose();
    } catch {}
  };
  return (
    <Fragment>
      <PlatterToolBar
        collectionMembers={props.collectionMembers}
        createPlatter={createPlatter}
        members={members}
        setMembers={setMembers}
        editorRef={editorRef}
      />
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
        <DialogContent style={{ minHeight: 1300 }}>
          <PlatterEditor
            id="CREATING"
            editorRef={editorRef}
            setEditorRef={setEditorRef}
            changeTitle={setTitle}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const paperStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: 100,
    },
  })
);

export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const classes = paperStyles();

  return <Paper {...props} className={clsx(inherited, classes.paper)} />;
}
