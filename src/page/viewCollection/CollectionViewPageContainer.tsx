import React, { useState, useEffect } from 'react';
import CollectionViewPage from './CollectionViewPage';
import { getCollection, CollectionDetail } from '../../services/collection.service';
import { getPlatters, createPlatter } from '../../services/platter.service'

export interface CollectionViewPageContainerProps {
  hiddenToolbar?: boolean;
  collectionId: number;
}

export default function CollectionViewPageContainer(props: CollectionViewPageContainerProps) {
  const [collection, setCollection] = useState<CollectionDetail | null>(null)
  const [platters, setPlatters] = useState<any[]>([])
  const handleCreatePlatter = async () => {
    await createPlatter(props.collectionId)
  }

  useEffect(() => {
    const fetchCollection = async () => {
      const collection = await getCollection(props.collectionId);
      setCollection(collection);
    }
    const fetchPlatters = async () => {
      const platters = await getPlatters(props.collectionId)
      setPlatters(platters)
    }
    fetchCollection();
    fetchPlatters();
  }, [])

  if (collection) {
    return (
      <CollectionViewPage hiddenToolbar={props.hiddenToolbar} {...collection} createPlatter={handleCreatePlatter} platters={platters} />
    )
  }

  return (
    <div />
  )
}
