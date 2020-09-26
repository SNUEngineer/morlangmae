import React, { useState, useEffect, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Notification, {
  NotificationData,
} from "../../components/notification/Notification";
import NotificationList from "../../components/notification/NotificationList";
import notiStyle from "./notificationPage.module.scss";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface NotificationDataAndCursor {
  data: NotificationData[];
  cursor?: string;
}

interface NotificationPageProps {
  goBack(): Promise<void>;
  initialNotifications: NotificationDataAndCursor;
  getMoreNotifications(cursor?: string): Promise<NotificationDataAndCursor>;
  onNotificationClick(notificationData: NotificationData): Promise<void>;
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
    props.initialNotifications.data, //test시 notification
  ]);
  const [cursor, setCursor] = useState<string | undefined>(
    props.initialNotifications.cursor
  );
  const onGetMoreNotifications = async () => {
    const res = await props.getMoreNotifications(cursor);
    setNotifications([...notifications, ...res.data]);
    setCursor(res.cursor);
  };
  const notification1 = {
    id: 0,
    type: "COLLECTION",
    cause: "새로운 컬렉션 생성 요청",
    target: 0,
    read: false,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  const notification2 = {
    id: 2,
    type: "PLATTER",
    cause: "컬렉션 생성 요청이 승인됨",
    target: 0,
    read: false,
    createdDate: "오전 9:17",
    sentBy: sender,
  };
  const notification3 = {
    id: 3,
    type: "MEMO",
    cause: "메모가 생성됨",
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
    <div>
      <div className={notiStyle.navigation}>
        <div className={notiStyle.back_text}>{"< 이전으로"}</div>
      </div>
      <Button onClick={props.goBack}>이전으로</Button>
      <Typography>알림</Typography>
      <div className={notiStyle.container}>
        <div className={notiStyle.header_container}>
          <div className={notiStyle.text}>알림</div>
        </div>
        <div className={notiStyle.divider} />

        <div className={notiStyle.list_container}>
          <List>
            <NotificationList
              notifications={notifications}
              onClick={props.onNotificationClick}
            />
            {cursor && (
              <ListItem onClick={onGetMoreNotifications}>...</ListItem>
            )}
          </List>
        </div>
      </div>
    </div>
  );
}
