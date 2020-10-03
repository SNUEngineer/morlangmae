import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import notiStyle from "./notification.module.scss";

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
      <div className={notiStyle.notification_container}>
        <div className={notiStyle.type_container}>
          <div className={notiStyle.icon}></div>
          <div className={notiStyle.text}>{notification.type}</div>
        </div>

        <div className={notiStyle.content_container}>
          <div className={notiStyle.content}>
            <div className={notiStyle.cause_text}>{notification.cause}</div>
            <div className={notiStyle.where_text}>나이키 교육 컨설팅</div>
          </div>
          <div className={notiStyle.info}>
            <div className={notiStyle.created_at}>
              {notification.createdDate}
            </div>
            <div className={notiStyle.avatar}>
              <Avatar alt={sender.displayName} src={sender.imageUrl} />
            </div>
            <div className={notiStyle.name_text}>{sender.displayName}</div>
          </div>
        </div>
      </div>
    </ListItem>
  );
}
