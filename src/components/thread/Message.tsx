//@ts-nocheck
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import messageStyle from "./message.module.scss";

export interface MessageProps {
  messageData: MessageData;
}

export interface MessageData {
  content: string;
  sentAt: Date;
  sender: MessageSender;
  attaches?: string[];
}

interface MessageSender {
  id: number;
  displayName: string;
  imageUrl: string;
}

export default function Message(props: MessageProps) {
  const messageData = props.messageData;
  return (
    <div className={messageStyle.message}>
      <div className={messageStyle.avatar}>
        <Avatar
          alt={messageData.sender.displayName}
          src={messageData.sender.imageUrl}
        />
      </div>
      <div className={messageStyle.content_container}>
        <div className={messageStyle.name_container}>
          <div className={messageStyle.name_text}>
            {messageData.sender.displayName}
          </div>
          <div className={messageStyle.time_text}>{messageData.sentAt}</div>
        </div>
        <div className={messageStyle.content}>
          {messageData.content.content}
        </div>
      </div>
    </div>
  );
}
