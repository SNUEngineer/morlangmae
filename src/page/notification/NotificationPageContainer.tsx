import React, { useState, useEffect } from "react";
import {
  getNotifications,
  readNotification,
} from "../../services/notification.service";
import NotificationPage from "./NotificationPage";
import { NotificationData } from "../../components/notification/Notification";

export default function NotificationPageContainer() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNotifications();
      //
      setNotifications(notifications.notifications);
    };
    fetchNotifications();
  }, []);

  const getMoreNotifications = async (cursor?: string) => {
    let index = 0;
    if (cursor) {
      index = Number(cursor);
    }
    return {
      data: notifications.slice(index, index + 7),
      cursor: notifications.length > index + 7 ? String(index + 7) : undefined,
    };
  };

  const clickNotification = async (notification: NotificationData) => {
    await readNotification(notification.id);
  };

  return (
    <NotificationPage
      getMoreNotifications={getMoreNotifications}
      onNotificationClick={clickNotification}
    />
  );
}
