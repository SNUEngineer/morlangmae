import React from 'react';
import CollectionList, { CollectionListProps } from '../../components/collection/CollectionList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CollectionListItemProps } from '../../components/collection/CollectionListItem';

export interface CreateCollectionTabProps {
  collections: CollectionListItemProps[];
}

export default function CreateCollectionTab(props: CreateCollectionTabProps) {
  return (
    <div>
      <CollectionList title="Create Collections" collections={props.collections} />
      <Grid container>
        <Grid item>
          <Button variant="contained">
            <Link to="/collections/create">
              {"Create"}
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
