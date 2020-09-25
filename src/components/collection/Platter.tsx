import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { EDITOR_JS_TOOLS } from '../editor/tools';
import { UserView } from '../../services/user.service';
import Typography from '@material-ui/core/Typography';
import { BlockView } from '../../services/platter.service';
import TextField from '@material-ui/core/TextField';
import { PlatterData, viewToData } from '../platter/PlatterEditor';

export interface PlatterProps {
  id: number;
  platterData: PlatterData;
  editable?: boolean;
  onClick(data: PlatterData): Promise<void>;
}

export default function Platter(props: PlatterProps) {
  const holderId = `platter-view-${props.id}`;
  const platterData = props.platterData;
  const onReady = () => {
    const blocks = document.getElementById(holderId)
    if (blocks) {
      blocks.style.pointerEvents = "none";
    }
    const tools = document.querySelectorAll('.ce-toolbar');
    tools.forEach((it: any) => it.style.display = "none")
  }
  const data = {
    blocks: platterData.blocks.map(it => viewToData(it))
  }
  const onClick = async () => {
    console.log(props.editable)
    if (props.editable) {
      props.onClick(platterData)
    }
  }
  return (
    <div id={`platter-${props.id}`} onClick={onClick}>
      <Typography>{platterData.createdDate}</Typography>
      <Avatar alt={platterData.createdBy.displayName} src={platterData.createdBy.imageUrl} />
      <Typography>{platterData.createdBy.displayName}</Typography>
      <Typography>{platterData.createdBy.companyId}</Typography>
      <Typography>{platterData.title}</Typography>
      <EditorJs
        holder={holderId}
        data={data}
        onReady={onReady}
        tools={EDITOR_JS_TOOLS as any}
      >
        <div id={holderId} />
      </EditorJs>
    </div>
  )
}
