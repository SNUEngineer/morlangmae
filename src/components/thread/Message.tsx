import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import messageStyle from "./message.module.scss";

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
    <div className={messageStyle.message}>
      <div className={messageStyle.avatar}>
        <Avatar alt={props.sender.displayName} src={props.sender.imageUrl} />
      </div>
      <div className={messageStyle.content_container}>
        <div className={messageStyle.name_container}>
          <div className={messageStyle.name_text}>
            {props.sender.displayName}
          </div>
          <div className={messageStyle.time_text}>{props.sentAt}</div>
        </div>
        <div className={messageStyle.content}>{props.content}</div>
      </div>
    </div>
  );
}
