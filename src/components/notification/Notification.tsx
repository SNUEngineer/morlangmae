import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export interface NotificationData {
  id: number;
  type: "COLLECTION" | "PLATTER" | "MEMO";
  cause: string;
  createdDate: Date;
  sentBy: NotificationSender;
}

export interface NotificationSender {
  imageUrl: string;
  displayName: string;
}

export interface NotificationProps {
  notification: NotificationData;
  onClick(notificationData: NotificationData): Promise<void>;
}

export default function Notification(props: NotificationProps) {
  const notification = props.notification;
  const sender = notification.sentBy;
  const onClick = () => props.onClick(notification);

  return (
    <ListItem onClick={onClick}>
      {notification.type}
      {notification.cause}
      {notification.createdDate}
      <ListItemAvatar>
        <Avatar alt={sender.displayName} src={sender.imageUrl} />
      </ListItemAvatar>
      {sender.displayName}
    </ListItem>
  );
}
