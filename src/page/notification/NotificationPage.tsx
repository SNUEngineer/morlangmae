// @ts-nocheck
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
import Header from "../../components/layout/Header/Header";

interface NotificationDataAndCursor {
  data: NotificationData[];
  cursor?: string;
  isPage: boolean;
}

interface NotificationPageProps {
  goBack(): Promise<void>;
  showAll(): Promise<void>;
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

  const [notifications, setNotifications] = useState<NotificationData[]>(
    //notification, //props.initialNotifications.data, //test시 notification
    props.initialNotifications.data
  );
  const [cursor, setCursor] = useState<string | undefined>(
    props.initialNotifications.cursor
  );
  const onGetMoreNotifications = async () => {
    console.log(
      "흠흠 fetchMore={onGetMoreNotifications}fetchMore={onGetMoreNotifications} "
    );
    const res = await props.getMoreNotifications(cursor);
    setNotifications([...notifications, ...res.data]);
    setCursor(res.cursor);
  };

  return (
    <div>
      {props.isPage && (
        <div>
          <div className={notiStyle.navigation}>
            <div className={notiStyle.back_text}>{"< 이전으로"}</div>
          </div>
          <Button onClick={props.goBack}>이전으로</Button>

          <div className={notiStyle.container}>
            <Header title={"알림"} subMenuType={"none"} />

            <div className={notiStyle.list_container}>
              <List>
                <NotificationList
                  notifications={notifications}
                  onClick={props.onNotificationClick}
                  fetchMore={onGetMoreNotifications}
                />
                {/* {cursor && (
                  <ListItem onClick={onGetMoreNotifications}>...</ListItem>
                )} */}
              </List>
            </div>
          </div>
        </div>
      )}
      {!props.isPage && (
        <div className={notiStyle.popover_container}>
          <Button onClick={props.showAll}>알림 전체보기</Button>
          <List>
            <NotificationList
              notifications={notifications}
              onClick={props.onNotificationClick}
              fetchMore={onGetMoreNotifications}
            />
            {cursor && (
              <ListItem onClick={onGetMoreNotifications}>...</ListItem>
            )}
          </List>
        </div>
      )}
    </div>
  );
}
