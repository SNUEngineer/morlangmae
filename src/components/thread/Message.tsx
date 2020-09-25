import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export interface MessageProps {
  messageData: MessageData;
}

export interface MessageData {
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
  const messageData = props.messageData
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={messageData.sender.displayName} src={messageData.sender.imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={messageData.content}
        secondary={
          <React.Fragment>
            {messageData.sender.displayName + ' - '}
            {/* <time dateTime={props.sentAt.toISOString()}> */}
              {/* {props.sentAt.toLocaleTimeString()} */}
            {/* </time> */}
            {messageData.sentAt}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
