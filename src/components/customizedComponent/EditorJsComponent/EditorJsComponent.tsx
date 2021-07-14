// @ts-nocheck
import React, { useState, useRef, useCallback, useEffect } from "react";

import { EDITOR_JS_TOOLS } from "../../editor/tools";
import editorStyle from "./EditorJsComponent.module.scss";
import EditorJs from "react-editor-js";

enum BlockType {
  HEADER = "HEADER",
  SUB_HEADER = "SUB_HEADER",
  TEXT = "TEXT",
  IMAGES = "IMAGES",
  FILES = "FILES",
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

function viewToData(view: BlockView) {
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
export interface EditorJsComponentProps {
  progress: "CREATING" | "EDITING" | "VIEWING" | "TASKING";
  type: string;
  data?;
  editorRef: any;
  setEditorRef: any;
  disableEditing?: boolean;
}
export default function EditorJsComponent(props: EditorJsComponentProps) {
  const [data] = useState({
    id: props.data?.id,
    blocks: props.data?.blocks,
  });
  const { type } = props;
  const editorContainer = useRef();
  const [editorRef, setEditorRef] = useState(null);
  useEffect(() => {
    if (!!editorRef?.current) {
      console.log("ㅠㅠㅠㅠㅎㅎㅎㅎㅎ");
      editorRef.current.style.color = "red";
    }
    console.log("ㅠㅠㅠㅠ");
  }, [editorRef]);
  const holderId = useCallback(() => {
    if (!!data?.id) {
      switch (type) {
        case "comment":
          return `editor-comment-${data.id}`;
        case "option":
          return `editor-option-${data.id}`;
        case "task":
          return `editor-task-${data.id}`;
      }
    } else {
      //임시 아이디
      const tempId = Date.now();
      switch (type) {
        case "comment":
          return `editor-comment-${tempId}`;
        case "option":
          return `editor-option-${tempId}`;
        case "task":
          return `editor-task-${tempId}`;
      }
    }
  }, [type, data]);
  const onReady = useCallback(() => {
    const blocks = document.getElementById(holderId());
    if (blocks) {
      if (props.disableEditing) {
        blocks.style.pointerEvents = "none";
      } else {
        blocks.style.pointerEvents = "";
      }
    }
  }, [holderId, props.disableEditing]);
  const editorComponent = useCallback(() => {
    const editorData = {
      blocks: data?.blocks?.map((it) => viewToData(it)) || [],
    };
    const config = {
      minHeight: 10,
    };
    return (
      <div ref={editorContainer}>
        <EditorJs
          holder={holderId()}
          instanceRef={setEditorRef}
          tools={EDITOR_JS_TOOLS as any}
          data={editorData}
          onReady={onReady}
          config={config}
          minHeight={10}
        >
          <div id={holderId()} className={editorStyle.test} />
        </EditorJs>
      </div>
    );
  }, [data, holderId, onReady, setEditorRef]);

  onReady();

  return <div>{editorComponent()}</div>;
}
