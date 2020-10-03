import React from "react";
import Notification, { NotificationData } from "./Notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import notiStyle from "./notification.module.scss";

interface NotificationListProps {
  notifications: NotificationData[];
  onNotificationClick(notificationData: NotificationData): Promise<void>;
  //onViewAllNotifications(): Promise<void>;
}

export default function NotificationList(props: NotificationListProps) {
  console.log("props.notifications " + JSON.stringify(props.notifications));
  const notifications = props.notifications
    .slice(0, 7)
    .map((notification, index) => {
      return (
        <div className={notiStyle.list_container}>
          <Notification
            key={notification.id}
            notification={notification}
            onClick={props.onNotificationClick}
          />
          {props.notifications.length !== index + 1 && (
            <div className={notiStyle.divider}></div>
          )}
        </div>
      );
    });

  return (
    <List>
      {notifications}
      {/* <ListItem onClick={props.onViewAllNotifications}>View all</ListItem> */}
    </List>
  );
}
