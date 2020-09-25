import React, { Fragment, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

interface PlatterToolBarProps {
  editorRef: any;
}

export default function ParagraphButton(props: PlatterToolBarProps) {
  const classes = popOverStyles()
  const { editorRef } = props

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'paragraph-button' : undefined;
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const deleteIfEmpty = async (index: number) => {
    const data = await editorRef.save(index);
    const block = data.blocks[index];
    console.log(data.blocks, index);
    if (block === undefined || block.data.text === '') {
      editorRef.blocks.delete(index);
    }
  }
  const addHeader = async () => {
    const index = editorRef.blocks.getCurrentBlockIndex();
    editorRef.blocks.insert('header', { text: '', level: 2 })
    editorRef.blocks.insert('header', { text: '', level: 3 })
    editorRef.blocks.insert('paragraph', { text: '' })
    deleteIfEmpty(index)
  }
  const addSubheader = async () => {
    const index = editorRef.blocks.getCurrentBlockIndex();
    editorRef.blocks.insert('header', { text: '', level: 3 })
    editorRef.blocks.insert('paragraph', { text: '' })
    deleteIfEmpty(index)
  }

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClick}>문단으로 추가</Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} className={classes.popover}>
        <Button variant="outlined" onClick={addHeader}>헤더</Button>
        <Button variant="outlined" onClick={addSubheader}>서브헤더</Button>
      </Popover>
    </Fragment>
  )
}

const popOverStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      zIndex: `${theme.zIndex.drawer + 10001} !important` as any,
    },
  })
);
