//@ts-nocheck
import React from "react";
import Notification, { NotificationData } from "./Notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import notiStyle from "./notification.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

interface NotificationListProps {
  notifications?: NotificationData[];
  onNotificationClick(notificationData: NotificationData): Promise<void>;
  fetchMore(): Promise<void>;
  //onViewAllNotifications(): Promise<void>;
}

export default function NotificationList(props: NotificationListProps) {
  const notificationList = props.notifications
    ?.slice(0, 7)
    .map((notification, index) => {
      return (
        <div className={notiStyle.list_container}>
          <Notification
            key={notification.id}
            notification={notification}
            onClick={props.onNotificationClick}
          />
          {props.notifications?.length !== index + 1 && (
            <div className={notiStyle.divider}></div>
          )}
        </div>
      );
    });

  return (
    <List>
      <InfiniteScroll
        dataLength={props.notifications?.length}
        next={props.fetchMore}
        hasMore={true}
        loader={<h4>로딩 중</h4>}
      >
        {notificationList}
      </InfiniteScroll>
      {/* <ListItem onClick={props.onViewAllNotifications}>View all</ListItem> */}
    </List>
  );
}
