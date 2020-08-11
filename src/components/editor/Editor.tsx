import React from 'react';
import EditorJs from 'react-editor-js';
import { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools';

function Editor() {
  let _data: OutputData = {
    time: 1556098174501,
    blocks: [
      {
        type: "header",
        data: {
          text: "Editor.js",
          level: 2
        }
      }
    ]
  };
  return (
    <EditorJs data={_data} tools={EDITOR_JS_TOOLS} />
  );
}

export default Editor;
