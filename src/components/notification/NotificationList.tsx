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
  onClose(): Promise<void>;
  isPage: boolean;
  //onViewAllNotifications(): Promise<void>;
}

export default function NotificationList(props: NotificationListProps) {
  return (
    <div
      id={"notificationScroll"}
      className={notiStyle.notification_scroll_div}
    >
      <InfiniteScroll
        //dataLength={props.notifications?.length}
        dataLength={props.notifications?.length}
        next={() => {
          console.log("nextnextnextnext");
          props.fetchMore();
        }}
        hasMore={true}
        loader={<h4>로딩 중</h4>}
        scrollableTarget={props.isPage ? "pageScroller" : "notificationScroll"}
      >
        {props.notifications?.map((notification, index) => {
          return (
            <div className={notiStyle.list_container}>
              <Notification
                key={notification.id}
                notification={notification}
                onClick={props.onNotificationClick}
                onClose={props.onClose}
              />
              {props.notifications?.length !== index + 1 && (
                <div className={notiStyle.divider}></div>
              )}
            </div>
          );
        })}
        {/* <ListItem onClick={props.onViewAllNotifications}>View all</ListItem> */}
      </InfiniteScroll>
    </div>
  );
}
