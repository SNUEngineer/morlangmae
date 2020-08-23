import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Platter, { PlatterProps } from '../../components/collection/Platter';
import { useLocation, useHistory } from 'react-router-dom';
import Thread, { ThreadProps } from '../../components/thread/Thread';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import clsx from 'clsx';

export interface EditPlatterPageProps extends PlatterProps, ThreadProps {

}

export default function EditPlatterPage(props: EditPlatterPageProps) {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleClose = () => {
    history.replace(pathname)
  }
  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open
      PaperComponent={PaperComponent}
      onClose={handleClose}
    >
      <Platter editable {...props} />
      <Thread {...props} />
    </Dialog>
  )
}

const paperStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: 250,
    },
  })
)

export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const classes = paperStyles();

  return (
    <Paper {...props} className={clsx(inherited, classes.paper)} />
  )
}
