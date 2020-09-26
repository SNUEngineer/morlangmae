import React, { useState, useEffect, Fragment } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Notification, {
  NotificationData,
} from "../../components/notification/Notification";
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
  const [notifications, setNotifications] = useState<NotificationData[]>(
    props.initialNotifications.data
  );
  const [cursor, setCursor] = useState<string | undefined>(
    props.initialNotifications.cursor
  );
  const onGetMoreNotifications = async () => {
    const res = await props.getMoreNotifications(cursor);
    setNotifications([...notifications, ...res.data]);
    setCursor(res.cursor);
  };

  return (
    <Fragment>
      <Button onClick={props.goBack}>이전으로</Button>
      <Typography>알림</Typography>
      <List>
        {notifications.map((notification) => {
          return (
            <Notification
              key={notification.id}
              notification={notification}
              onClick={props.onNotificationClick}
            />
          );
        })}
        {cursor && <ListItem onClick={onGetMoreNotifications}>...</ListItem>}
      </List>
    </Fragment>
  );
}
