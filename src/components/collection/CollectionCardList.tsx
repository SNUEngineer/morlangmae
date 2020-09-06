import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CollectionCard, { CollectionCardProps } from './CollectionCard';
import Divider from '@material-ui/core/Divider';

export interface CollectionCardListProps {
  title: string;
  collections: CollectionCardProps[];
}

function rowCollections(collections: CollectionCardProps[]) {
  return collections.map((props: CollectionCardProps) => {
    return (
      <CollectionCard key={props.data.id} {...props} />
    )
  });
}

export default function CollectionCardList(props: CollectionCardListProps) {
  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider />
      <Grid container>
        {rowCollections(props.collections)}
      </Grid>
    </Card>
  )
}
