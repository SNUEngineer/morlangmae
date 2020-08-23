import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';

export interface CollectionListItemProps {
  id: number;
  title: string;
  collectionType: string;
  createdDate: Date;
  status: string;
  imageUrl: string;
  notificationCount?: number;
  onClick?(): Promise<void>;
}

export default function CollectionListItem(props: CollectionListItemProps) {
  const history = useHistory();
  const handleClick = () => {
    if (props.status === 'DRAFT') {
      history.push(`collections/edit/${props.id}`)
    } else {
      history.push(`collections?id=${props.id}`)
    }
  }

  return (
    <ListItem onClick={handleClick}>
      <ListItemAvatar>
        <Avatar variant="rounded" alt={props.title} src={props.imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={props.title}
      />
      <ListItemText
        primary={props.collectionType}
      />
      <ListItemText
        primary={props.status}
      />
      <ListItemText
        primary={props.createdDate}
      />
    </ListItem>
  )
}
