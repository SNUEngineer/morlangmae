import React from 'react';
import CollectionCardList from '../../components/collection/CollectionCardList'
import { CollectionCardProps } from '../../components/collection/CollectionCard';

export interface SearchCollectionTabProps {
  // attendedCollections: CollectionListProps;
  // recentSearchedCollections: CollectionListProps;
  // recommendedArchivedCollections: CollectionListProps;
  companyCollections: CollectionCardProps[];
}

export default function SearchCollectionTab(props: SearchCollectionTabProps) {
  return (
    <div>
      <CollectionCardList title="Company Collections" collections={props.companyCollections} />
    </div>
  )
}
