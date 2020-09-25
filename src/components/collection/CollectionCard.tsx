import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export interface CollectionData {
  id: number;
  collectionType: CollectionType;
  serviceType: string;
  title: string;
  imageUrl: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  pinned: boolean;
  status: CollectionStatus;
}

export enum CollectionType {
  PROJECT,
  TEAM,
}

export enum CollectionStatus {
  DRAFT,
  REQUEST_PROGRESS,
  DENIED,
  IN_PROGRESS,
  DONE,
}

export interface CollectionCardProps extends CollectionCardFunctions {
  data: CollectionData;
  viewType: 'NORMAL' | 'WIDE';
}

export interface CollectionCardFunctions {
  onClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}

const useStyles = makeStyles((viewType: 'NORMAL' | 'WIDE') => createStyles({
  root: {
    width: viewType === 'NORMAL' ? 300 : 500,
  },
  media: {
    height: 0,
    paddingTop: viewType === 'NORMAL' ? '100%' : '62.25%',
  },
}))

export default function CollectionCard(props: CollectionCardProps) {
  const [pinned, setPinned] = useState(props.data.pinned)
  const viewType = props.viewType;
  const classes = useStyles(viewType)
  const data = props.data;
  const notificationCount = data.notificationCount;
  const onClick = async () => props.onClick(props.data);
  const pinCollection = async (event: any) => {
    event.stopPropagation();
    await props.pinCollection(props.data.id);
    setPinned(true);
  }
  const unpinCollection = async (event: any) => {
    event.stopPropagation()
    await props.unpinCollection(props.data.id);
    setPinned(false);
  }

  return (
    <Card className={classes.root} onClick={onClick}>
      <Typography>{data.serviceType}</Typography>
      <CardHeader title={data.title} />
      {notificationCount > 0 && (
        <Typography>{notificationCount}</Typography>
      )}
      {pinned
        ? <Button onClick={unpinCollection}>고정해제</Button>
        : <Button onClick={pinCollection}>고정</Button>
      }
      {data.imageUrl && (
        <CardMedia
          image={data.imageUrl}
          className={classes.media}
        />
      )}
    </Card>
  )
}
