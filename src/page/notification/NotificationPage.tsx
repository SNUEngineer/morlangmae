import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Notification, {
  NotificationData,
} from "../../components/notification/Notification";
import NotificationList from "../../components/notification/NotificationList";
import notiStyle from "./notificationPage.module.scss";

interface NotificationDataAndCursor {
  data: NotificationData[];
  cursor?: string;
}

interface NotificationPageProps {
  //getMoreNotifications(cursor?: string): Promise<NotificationDataAndCursor>;
  //onNotificationClick(notificationData: NotificationData): Promise<void>;
}

export default function NotificationPage(props: NotificationPageProps) {
  const sender = {
    id: 0,
    displayName: "송병근",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
  };

  const notification = {
    id: 10,
    type: "COLLECTION",
    cause: "hello",
    target: 0,
    read: false,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  const [notifications, setNotifications] = useState<NotificationData[]>([
    notification,
  ]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  //   const onGetMoreNotifications = async () => {
  //     const res = await props.getMoreNotifications(cursor);

  // setNotifications([...notifications, ...res.data]);
  //     setCursor(res.cursor)

  const notification1 = {
    id: 0,
    type: "COLLECTION",
    cause: "hello",
    target: 0,
    read: false,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  const notification2 = {
    id: 2,
    type: "PLATTER",
    cause: "hello hi hi",
    target: 0,
    read: false,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  const notification3 = {
    id: 3,
    type: "MEMO",
    cause: "hello hi hi 33333",
    target: 0,
    read: true,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  useEffect(() => {
    setNotifications([notification1, notification2, notification3]);
    setCursor(0);
  }, []);

  return (
    <div className={notiStyle.container}>
      <div className={notiStyle.page_title_container}>
        <div className={notiStyle.page_title}>알림</div>
        <div className={notiStyle.divider}></div>
      </div>

      <div className={notiStyle.list_container}>
        <List>
          {/* {notifications.map((notification) => {
            return (
              <Notification
                key={notification.id}
                notification={notification}
                onClick={props.onNotificationClick}
              />
              
            );
          })} */}
          <NotificationList
            notifications={notifications}
            onClick={props.onNotificationClick}
          />
          {/* <ListItem onClick={onGetMoreNotifications}>...</ListItem> */}
        </List>
      </div>
    </div>
  );
}
