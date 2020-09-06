import React from 'react';
import Notification, { NotificationData } from './Notification';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

interface NotificationListProps {
  notifications: NotificationData[];
  onNotificationClick(notificationData: NotificationData): Promise<void>;
  onViewAllNotifications(): Promise<void>;
}

export default function NotificationList(props: NotificationListProps) {
  const notifications = props.notifications.map(notification => {
    return (
      <Notification
        key={notification.id}
        notification={notification}
        onClick={props.onNotificationClick}
      />
    )
  })

  return (
    <List>
      {notifications}
      <ListItem onClick={props.onViewAllNotifications}>
        View all
      </ListItem>
    </List>
  )
}