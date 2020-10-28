// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getNotifications,
  readNotification,
} from "../../services/notification.service";
import NotificationPage from "./NotificationPage";
import { NotificationData } from "../../components/notification/Notification";
import { useAsync } from "react-async";
import { NOTIFICATION } from "../../common/paths";
async function getData() {
  return await getNotifications();
}

export default function NotificationPageContainer(props: any) {
  const { isPage } = props;
  const history = useHistory();
  const { data } = useAsync({
    promiseFn: getData,
  });

  const getMoreNotifications = async (cursor?: string) => {
    let index = 0;

    if (cursor) {
      index = Number(cursor);
    }
    console.log(
      "indexindexindexindexindex " + index + "   " + JSON.stringify(data)
    );
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

  const goBack = async () => {
    history.goBack();
  };
  const showAll = async () => {
    history.push(`${NOTIFICATION}`);
  };

  if (data) {
    const initialNotifications = {
      data: data?.notifications.slice(0, 7) || [],
      cursor: data?.notifications?.length
        ? data.notifications.length > 7
          ? String(7)
          : undefined
        : undefined,
    };

    return (
      <div>
        <NotificationPage
          goBack={goBack}
          showAll={showAll}
          initialNotifications={initialNotifications}
          getMoreNotifications={getMoreNotifications}
          onNotificationClick={clickNotification}
          isPage={isPage}
        />
      </div>
    );
  }

  return null;
}
