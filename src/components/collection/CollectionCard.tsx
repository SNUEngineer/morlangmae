import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export interface CollectionData {
  id: number;
  serviceType: string;
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  pinned: boolean;
  status: string;
}

export interface CollectionCardProps {
  data: CollectionData;
  viewType: 'NORMAL' | 'WIDE';
  onClick(data: CollectionData): Promise<void>;
}

const useStyles = makeStyles((viewType: 'NORMAL' | 'WIDE') => createStyles({
  root: {
    width: viewType == 'NORMAL' ? 300 : 500,
  },
  media: {
    height: 0,
    paddingTop: viewType == 'NORMAL' ? '100%' : '62.25%',
  },
}))

export default function CollectionCard(props: CollectionCardProps) {
  const viewType = props.viewType;
  const classes = useStyles(viewType)
  const data = props.data;
  const notificationCount = data.notificationCount;
  const onClick = () => props.onClick(props.data);

  return (
    <Card className={classes.root} onClick={onClick}>
      <Typography>{data.serviceType}</Typography>
      <CardHeader title={data.title} />
      {notificationCount > 0 && (
        <Typography>{notificationCount}</Typography>
      )}
      {data.imageUrl && (
        <CardMedia
          image={data.imageUrl}
          className={classes.media}
        />
      )}
    </Card>
  )
}
