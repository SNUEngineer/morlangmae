import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Notification, { NotificationData } from '../../components/notification/Notification';

interface NotificationDataAndCursor {
  data: NotificationData[];
  cursor?: string;
}

interface NotificationPageProps {
  getMoreNotifications(cursor?: string): Promise<NotificationDataAndCursor>
  onNotificationClick(notificationData: NotificationData): Promise<void>;
}

export default function NotificationPage(props: NotificationPageProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const onGetMoreNotifications = async () => {
    const res = await props.getMoreNotifications(cursor);
    setNotifications([...notifications, ...res.data]);
    setCursor(res.cursor)
  }

  return (
    <List>
      {notifications.map(notification => {
        return (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={props.onNotificationClick}
          />
        )
      })}
      <ListItem onClick={onGetMoreNotifications}>
        ...
      </ListItem>
    </List>
  );
}
