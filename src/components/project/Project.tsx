import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export interface ProjectProps {
  title: string;
  imageUrl: string;
  projectId: string;
  handleClick?: any;
}

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 345,
    backgroundImage: (props: ProjectProps) => `url('${props.imageUrl}')`,
    backgroundPosition: 'center center',
  },
  action: {
    with: '100%',
    height: '100%',
    display: 'flex',
  },
  typo: {
    alignSelf: 'flex-end',
  },
});

export default function Project(props: ProjectProps) {
  const classes = useStyles(props);

  return (
    <Card className={classes.root} id={props.projectId}>
      <CardActionArea className={classes.action} onClick={props.handleClick}>
        <CardContent className={classes.typo}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
