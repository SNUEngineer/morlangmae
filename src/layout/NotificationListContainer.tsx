import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NotificationList from "../components/notification/NotificationList";
import {
  getNotifications,
  readNotification,
} from "../services/notification.service";
import { NotificationData } from "../components/notification/Notification";
import { NOTIFICATION } from "../common/paths";
import { useAsync } from "react-async";

export default function NotificationListContainer(props: any) {
  const history = useHistory();
  const { data } = useAsync({
    promiseFn: getNotifications,
  });

  const getMoreNotifications = async (cursor?: string) => {
    let index = 0;
    if (cursor) {
      index = Number(cursor);
    }
    return {
      data: data?.notifications.slice(index, index + 7) || [],
      cursor: data?.notifications?.length
        ? data.notifications.length > index + 7
          ? String(index + 7)
          : undefined
        : undefined,
    };
  };

  const clickNotification = async (notification: NotificationData) => {
    await readNotification(notification.id);
  };

  const viewAllNotifications = async () => {
    props.close();
    history.push(NOTIFICATION);
  };

  if (data) {
    return (
      <NotificationList
        notifications={data.notifications}
        onNotificationClick={clickNotification}
        onViewAllNotifications={viewAllNotifications}
      />
    );
  }

  return null;
}
