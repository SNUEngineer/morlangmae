import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemLink from '../../components/ListItemLink';
import { COLLECTION_LIST_MY_COLLECTION, COLLECTION_LIST_CREATED, COLLECTION_LIST } from '../../common/paths';

export default function CollectionTab() {
  return (
    <div>
      <Typography>
        Collection
      </Typography>
      <List>
        <ListItemLink to={COLLECTION_LIST_MY_COLLECTION} primary="나의 컬렉션" />
        <ListItemLink to={COLLECTION_LIST} primary="탐색" />
        <ListItemLink to={COLLECTION_LIST_CREATED} primary="생성" />
      </List>
    </div>
  )
}
