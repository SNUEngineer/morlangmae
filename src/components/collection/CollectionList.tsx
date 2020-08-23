import React, { Fragment } from 'react';
import CollectionListItem, { CollectionListItemProps } from './CollectionListItem';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

export interface CollectionListProps {
  title: string
  collections: CollectionListItemProps[]
}

export default function CollectionList(props: CollectionListProps) {
  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider />
      <List>
        {props.collections.map((collection: CollectionListItemProps) => {
          return (
            <CollectionListItem key={collection.id} {...collection} />
          )
        })}
      </List>
    </Card>
  );
}
