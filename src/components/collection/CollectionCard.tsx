import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

export interface CollectionCardProps {
  id: number;
  fullWidth?: boolean;
  title: string;
  serviceType: string;
  imageUrl: string;
  notificationCount?: number;
  onClick?(): Promise<void>;
}

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: '62.25%',
  },
});

export default function CollectionCard(props: CollectionCardProps) {
  const classes = useStyles(props);
  const history = useHistory();
  const handleClick = () => {
    history.push(`collections?id=${props.id}`)
  }

  return (
    <Card className={classes.root} onClick={handleClick}>
      <Typography>{props.serviceType}</Typography>
      <CardHeader title={props.title} />
      {props.imageUrl && (
        <CardMedia
          image={props.imageUrl}
          className={classes.media}
        />
      )}
    </Card>
  )
}
