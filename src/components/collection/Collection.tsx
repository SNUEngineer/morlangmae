import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Platter, { PlatterProps } from './Platter';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { UserView } from '../../services/user.service';

export interface CollectionProps {
  id: number;
  title: string;
  imageUrl: string;
  members: UserView[];
  platters: PlatterProps[];
  editable?: boolean;
}

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '62.25%',
    width: '100%'
  },
  root: {
    overflowY: 'scroll',
  },
})

export default function Collection(props: CollectionProps) {
  const classes = useStyles()
  const platters = props.platters.map((platterProps: PlatterProps) => {
    return (
      <Platter key={platterProps.id} {...platterProps} />
    )
  })

  return (
    <Card className={classes.root}>
      <CardMedia
        image={props.imageUrl}
        className={classes.media}
      />
      {/* <AvatarGroup> */}
        {/* {props.members.map((member: UserView) => ( */}
          {/* <Avatar key={member.id} alt={member.displayName} src={member.imageUrl} /> */}
        {/* ))} */}
      {/* </AvatarGroup> */}
      {platters}
    </Card>
  )
}
