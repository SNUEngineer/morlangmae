import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CreateCollectionPage from './CreateCollectionPage';
import { createCollection, getServiceTypes, CreateDraftCollectionRequest } from '../../services/collection.service';

export default function CreateCollectionPageContainer() {
  const [serviceTypes, setServiceTypes] = useState<string[]>([])
  const history = useHistory();

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const serviceTypes = await getServiceTypes();
      setServiceTypes(serviceTypes);
    }
    fetchServiceTypes();
  }, [])

  const handleCreateCollection = async (request: CreateDraftCollectionRequest): Promise<void> => {
    const id = await createCollection(request)
    history.push(`/collections/edit/${id}`)
  }

  return (
    <CreateCollectionPage createCollection={handleCreateCollection} serviceTypes={serviceTypes} /> 
  )
}