import React from 'react';
import CollectionList from '../../components/collection/CollectionList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { CollectionListItemProps } from '../../components/collection/CollectionListItem';
import CollectionTab from './CollectionTab';
import { COLLECTION_CREATE } from '../../common/paths';
import { CollectionData } from '../../components/collection/CollectionCard';

export interface CreateCollectionTabProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export default function CreateCollectionTab(props: CreateCollectionTabProps) {
  return (
    <div>
      <CollectionTab />
      <CollectionList title="Create Collections" collections={props.collections} onCollectionClick={props.onCollectionClick} />
      <Grid container>
        <Grid item>
          <Button variant="contained">
            <Link to={COLLECTION_CREATE}>
              Create
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
