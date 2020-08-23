import React from 'react';
import CollectionCardList, { CollectionCardListProps } from '../../components/collection/CollectionCardList'
import { CollectionCardProps } from '../../components/collection/CollectionCard';

export interface MyCollectionTabProps {
  collections: CollectionCardProps[];
}

export default function MyCollectionTab(props: MyCollectionTabProps) {
  return (
    <div>
      <CollectionCardList title="My Collections" collections={props.collections} />
    </div>
  )  
}
