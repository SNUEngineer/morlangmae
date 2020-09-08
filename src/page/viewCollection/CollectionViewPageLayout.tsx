import React, { useState, Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { useLocation, useHistory } from 'react-router-dom';
import Collection, { CollectionProps } from '../../components/collection/Collection';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import clsx from 'clsx';

export interface CollectionViewPageProps extends CollectionProps {
  hiddenToolbar?: boolean;
  createPlatter: any;
}

export default function CollectionViewPage(props: CollectionViewPageProps) {
  const [editable, setEditable] = useState(false)
  const { pathname } = useLocation();
  const history = useHistory();
  const handleClose = () => {
    history.replace(pathname)
  }
  return (
    <Fragment>
      {!props.hiddenToolbar &&
        (<ToolBar editable={editable} setEditable={setEditable} createPlatter={props.createPlatter} />)
      }
      <Dialog
        fullWidth
        maxWidth="lg"
        open
        PaperComponent={PaperComponent}
        onClose={handleClose}>
        {/* <DialogContent> */}
        <Collection {...props} />
        {/* </DialogContent> */}
      </Dialog>
    </Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1000,
      top: 64,
    },
  })
)

const paperStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      top: 200,
    },
  })
)

export function PaperComponent(props: PaperProps) {
  const inherited = props.className
  const classes = paperStyles()
  return (
    <Paper {...props} className={clsx(inherited, classes.paper)} />
  )
}

export function ToolBar(props: any) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Switch
          checked={props.editable}
          onChange={() => props.setEditable(!props.editable)}
          name="collection-mode"
        />
        # Platter Search
        # Sort
        <Button onClick={props.createPlatter} color="primary" variant="contained">+</Button>
      </Toolbar>
    </AppBar>
  )
}
