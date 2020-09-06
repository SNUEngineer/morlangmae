import React from 'react';
import CollectionCardList from '../../components/collection/CollectionCardList'
import { CollectionCardProps } from '../../components/collection/CollectionCard';
import CollectionTab from './CollectionTab';

export interface SearchCollectionTabProps {
  // attendedCollections: CollectionListProps;
  // recentSearchedCollections: CollectionListProps;
  // recommendedArchivedCollections: CollectionListProps;
  companyCollections: CollectionCardProps[];
}

export default function SearchCollectionTab(props: SearchCollectionTabProps) {
  return (
    <div>
      <CollectionTab />
      <CollectionCardList title="내가 참여중인 컬렉션" collections={props.companyCollections} />
      <CollectionCardList title="현재 사내 진행 컬렉션" collections={props.companyCollections} />
    </div>
  )
}
