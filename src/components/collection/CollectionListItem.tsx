import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {
  CollectionData,
  CollectionStatus,
  CollectionType,
} from "./CollectionCard";

export interface CollectionListItemProps {
  data: CollectionData;
  onClick(data: CollectionData): Promise<void>;
}

export default function CollectionListItem(props: CollectionListItemProps) {
  const data = props.data;
  const statusCodeToString = (status: CollectionStatus) => {
    switch (status) {
      case CollectionStatus.DRAFT:
        return "초안";
      case CollectionStatus.REQUEST_PROGRESS:
        return "승인 대기";
      case CollectionStatus.IN_PROGRESS:
        return "승인";
    }
  };
  const collectionTypeToString = (collectionType: CollectionType) => {
    switch (collectionType) {
      case CollectionType.PROJECT:
        return "프로젝트";
      case CollectionType.TEAM:
        return "팀";
    }
  };
  const onClick = () => props.onClick(data);

  return (
    <ListItem onClick={onClick}>
      <ListItemAvatar>
        <Avatar variant="rounded" alt={data.title} src={data.imageUrl} />
      </ListItemAvatar>
      <ListItemText primary={data.title} />
      <ListItemText primary={collectionTypeToString(data.collectionType)} />
      <ListItemText primary={statusCodeToString(data.status)} />
      <ListItemText primary={data.createdDate} />
    </ListItem>
  );
}
