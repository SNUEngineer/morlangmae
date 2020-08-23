import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export interface MessageProps {
  content: string;
  sentAt: Date;
  sender: MessageSender;
}

interface MessageSender {
  id: number;
  displayName: string;
  imageUrl: string;
}

export default function Message(props: MessageProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={props.sender.displayName} src={props.sender.imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={props.content}
        secondary={
          <React.Fragment>
            {props.sender.displayName + ' - '}
            {/* <time dateTime={props.sentAt.toISOString()}> */}
              {/* {props.sentAt.toLocaleTimeString()} */}
            {/* </time> */}
            {props.sentAt}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
