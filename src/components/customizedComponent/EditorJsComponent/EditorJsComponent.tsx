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
  parentType: string;
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
  const { parentType } = props;
  const editorContainer = useRef();
  const [editorRef, setEditorRef] = useState(null);
  useEffect(() => {
    if (!!editorRef?.current) {
      editorRef.current.style.color = "red";
    }
  }, [editorRef]);
  const holderId = useCallback(() => {
    const id = !!data?.id ? data.id : Date.now();
    switch (parentType) {
      case "comment":
        return `editor-comment-${id}`;
      case "option":
        return `editor-option-${id}`;
      case "task":
        return `editor-task-${id}`;
      case "todo":
        return `editor-todo-${id}`;
    }
  }, [parentType, data]);
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
