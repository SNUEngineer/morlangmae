import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { EDITOR_JS_TOOLS } from '../editor/tools';
import { UserView } from '../../services/user.service';
import Typography from '@material-ui/core/Typography';
import { BlockView } from '../../services/platter.service';
import TextField from '@material-ui/core/TextField';

export interface PlatterProps {
  id: number;
  title?: string;
  blocks: BlockView[];
  editable?: boolean;
  createdBy: UserView;
  createdDate: Date;
}

export default function Platter(props: PlatterProps) {
  const holderId = `platter-view-${props.id}`
  const onReady = () => {
    if (!props.editable) {
      const blocks = document.getElementById(holderId)
      if (blocks) {
        blocks.style.pointerEvents = "none";
      }
      const tools = document.querySelectorAll('.ce-toolbar');
      tools.forEach((it: any) => it.style.display = "none")
    }
  }
  const [editorRef, setEditorRef] = useState<any>(null)
  const injectRef = (instance: any) => {
    setEditorRef(instance)
  }
  const onClick = async () => {
    if (editorRef) {
      console.log(await editorRef.save())
    }
  }
  const blocks = {time: new Date().getTime(), blocks: [{type: 'paragraph', data: {text: 'hi'}}]}

  return (
    <div>
      <a href={`#platter-${props.id}`}>Platter</a>
      <Typography>{props.createdDate}</Typography>
      <Avatar alt={props.createdBy.displayName} src={props.createdBy.imageUrl} />
      <Typography>{props.createdBy.displayName}</Typography>
      <Typography>{props.createdBy.companyId}</Typography>
      <TextField
        required
        defaultValue={props.title}
        fullWidth
        id="title"
        name="title"
      />
      <EditorJs
        holder={holderId}
        data={blocks}
        instanceRef={injectRef}
        onReady={onReady}
        tools={EDITOR_JS_TOOLS}
      >
        <div id={holderId} />
      </EditorJs>
      <Button onClick={onClick}>Give me data</Button>
    </div>
  )
}
