import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationList from '../components/notification/NotificationList';
import { getNotifications, readNotification } from '../services/notification.service';
import { NotificationData } from '../components/notification/Notification';
import { NOTIFICATION } from '../common/paths';

export default function NotificationListContainer() {
  const history = useHistory()
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  useEffect(() => {
    const fetchNotifcations = async () => {
      const notifications = await getNotifications();
      setNotifications(notifications.notifications)
    }
  }, []);

  const viewAllNotifications = async () => {
    history.push(NOTIFICATION)
  }
  const clickNotificaiton = async (notification: NotificationData) => {
    await readNotification(notification.id)
  }

  return (
    <NotificationList
      notifications={notifications}
      onNotificationClick={clickNotificaiton}
      onViewAllNotifications={viewAllNotifications}
    />
  )
}
