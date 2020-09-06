import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItemLink from '../components/ListItemLink'
import PersonIcon from '@material-ui/icons/Person';
import CollectionsIcon from '@material-ui/icons/Collections';
import NoteIcon from '@material-ui/icons/Note';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
)

export default function Drawer() {
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>
        <ListItemLink to="/collections" primary="컬렉션" icon={<CollectionsIcon />} />
        <ListItemLink to="/memos" primary="메모" icon={<NoteIcon />} />
        <ListItemLink to="/persona" primary="프로필" icon={<PersonIcon />} />
      </List>
      <Divider />
    </MuiDrawer>
  );
}
