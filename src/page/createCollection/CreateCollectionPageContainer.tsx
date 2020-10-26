// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import CreateCollectionPage from "./CreateCollectionPage";
import {
  createCollection,
  getServiceTypes,
  CreateDraftCollectionRequest,
} from "../../services/collection.service";
import { useLocation } from "react-router-dom";
import { COLLECTION_EDIT } from "../../common/paths";

export default function CreateCollectionPageContainer(props) {
  const { currentPath } = props;
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const history = useHistory();
  const { pathname, search } = useLocation();
  useEffect(() => {
    const fetchServiceTypes = async () => {
      const serviceTypes = await getServiceTypes();
      setServiceTypes(serviceTypes);
    };
    fetchServiceTypes();
  }, []);

  const handleCreateCollection = useCallback(
    async (request: CreateDraftCollectionRequest): Promise<void> => {
      console.log("lets create collection!! " + JSON.stringify(request));
      const id = await createCollection(request);

      history.push(`/collections/created?editingId=${id}`);
    },
    []
  );

  return (
    <CreateCollectionPage
      createCollection={handleCreateCollection}
      serviceTypes={serviceTypes}
    />
  );
}
