// @ts-nocheck
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import notiStyle from "./notification.module.scss";
import Comment from "./Comment";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import classNames from "classnames";

export interface NotificationData {
  id: number;
  type: "COLLECTION" | "PLATTER" | "MEMO";
  comment: string;
  cause: string;
  createdDate: Date;
  sentBy: NotificationSender;
}

export interface NotificationSender {
  imageUrl: string;
  displayName: string;
}

export interface NotificationProps {
  notification: NotificationData;
  onClick(notificationData: NotificationData): Promise<void>;
}

export default function Notification(props: NotificationProps) {
  const { notification } = props;
  const sender = notification.sentBy;
  const comment = notification.comment;
  const onClick = () => props.onClick(notification);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      list_item: {
        padding: "0px",
      },
    })
  );
  const classes = useStyles();

  if (!!comment) {
    const commentData = {
      sentBy: sender,
      comment: comment,
    };
    return (
      <ListItem onClick={onClick} className={classes.list_item}>
        <div
          className={classNames({
            [notiStyle.notification_container]: true,
            [notiStyle.notification_container_pop_over]: false,
            [notiStyle.notification_container_page]: true,
          })}
        >
          <div className={notiStyle.type_container}>
            <img
              className={classNames({
                [notiStyle.icon]: true,
                [notiStyle.collection_icon]: true,
                [notiStyle.platter_icon]: false,
                [notiStyle.memo_icon]: false,
              })}
              alt={"icon"}
            />
            <div className={notiStyle.text}>{notification.type}</div>
          </div>

          <div className={notiStyle.comment_content_container}>
            <div className={notiStyle.header}>
              <div className={notiStyle.content}>
                <div className={notiStyle.cause_text}>{notification.cause}</div>
              </div>
              <div className={notiStyle.info}>
                <div className={notiStyle.created_at}>
                  {notification.createdDate}
                </div>
              </div>
            </div>

            <Comment
              className={notiStyle.content_container}
              comment={commentData}
            />
          </div>
        </div>
      </ListItem>
    );
  }
  return (
    <ListItem onClick={onClick} className={classes.list_item}>
      <div
        className={classNames({
          [notiStyle.notification_container]: true,
          [notiStyle.notification_container_pop_over]: false,
          [notiStyle.notification_container_page]: true,
        })}
      >
        <div className={notiStyle.type_container}>
          <img
            className={classNames({
              [notiStyle.icon]: true,
              [notiStyle.collection_icon]: true,
              [notiStyle.platter_icon]: false,
              [notiStyle.memo_icon]: false,
            })}
            alt={"icon"}
          />
          <div className={notiStyle.text}>{notification.type}</div>
        </div>

        <div className={notiStyle.content_container}>
          <div className={notiStyle.content}>
            <div className={notiStyle.cause_text}>{notification.cause}</div>
            <div className={notiStyle.where_text}>나이키 교육 컨설팅</div>
          </div>
          <div className={notiStyle.info}>
            <div className={notiStyle.created_at}>
              {notification.createdDate}
            </div>
            <div className={notiStyle.avatar_container}>
              <div className={notiStyle.avatar}>
                <Avatar alt={sender.displayName} src={sender.imageUrl} />
              </div>
            </div>
            <div className={notiStyle.name_text}>{sender.displayName}</div>
          </div>
        </div>
      </div>
    </ListItem>
  );
}
