import React, { useState, useEffect } from 'react';
import CollectionPage from './CollectionPage';
import { getCollections, getCompanyCollections, CollectionView, getMyCollections } from '../../services/collection.service'

export interface CollectionPageContainerProps {
  collectionId?: number;
  platterId?: number;
}

export default function CollectionPageContainer(props: CollectionPageContainerProps) {
  const [collections, setCollections] = useState<CollectionView[]>([]);
  const [companyCollections, setCompanyCollections] = useState<CollectionView[]>([]);
  const [myCollections, setMyCollections] = useState<CollectionView[]>([]);
  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getCollections();
      setCollections(collections);
    };
    const fetchCompanyCollections = async () => {
      const companyCollections = await getCompanyCollections();
      setCompanyCollections(companyCollections)
    };
    const fetchMyCollections = async () => {
      const myCollections = await getMyCollections();
      setMyCollections(myCollections);
    }
    fetchCollections();
    fetchCompanyCollections();
    fetchMyCollections();
  }, []);
  return (
    <CollectionPage
      collectionId={props.collectionId}
      platterId={props.platterId}
      myCollectionTabPrpos={{ collections: collections }}
      searchCollectionTabProps={{ companyCollections: companyCollections }}
      createCollectionTabProps={{ collections: myCollections }}
    />
  )
}
