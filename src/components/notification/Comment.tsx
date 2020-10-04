import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import commentStyle from "./comment.module.scss";
import classNames from "classnames";

export interface CommentData {
  sentBy: NotificationSender;
  comment: string;
}

export interface NotificationSender {
  imageUrl: string;
  displayName: string;
}

export interface CommentProps {
  comment: CommentData;
}

export default function Comment(props: CommentProps) {
  const comment = props.comment;
  const sender = comment.sentBy;
  const commentString = comment.comment;
  const onClick = () => props.onClick(notification);

  return (
    <div className={commentStyle.comment_container}>
      <div className={commentStyle.content_container}>
        <div className={commentStyle.info}>
          <div className={commentStyle.avatar_container}>
            <div className={commentStyle.avatar}>
              <Avatar alt={sender.displayName} src={sender.imageUrl} />
            </div>
          </div>
          <div className={commentStyle.name_text}>{sender.displayName}</div>
        </div>
        <div className={commentStyle.content}>
          <div className={commentStyle.where_text}>나이키 교육 컨설팅</div>
          <div className={commentStyle.comment_text}>{commentString}</div>
        </div>
      </div>
    </div>
  );
}
