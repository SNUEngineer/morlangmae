import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAsync } from "react-async";
import EditCollectionPage from "./EditCollectionPage";
import { uploadFile } from "../../services/file.service";
import { searchUsers, UserView } from "../../services/user.service";
import {
  editCollection,
  progress,
  getCollection,
  getServiceTypes,
} from "../../services/collection.service";
import { COLLECTION_LIST } from "../../common/paths";

export interface EditCollectionPageContainerProps {
  collectionId: number;
}

async function getData({ collectionId }: any) {
  return await Promise.all([
    getCollection(collectionId),
    searchUsers(undefined),
    getServiceTypes(),
  ]);
}

export default function EditCollectionPageContainer(
  props: EditCollectionPageContainerProps
) {
  const history = useHistory();
  const collectionId = props.collectionId;

  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
    collectionId: collectionId,
  });

  async function handleEditCollection(collection: any) {
    await editCollection(collection.id, {
      title: collection.title,
      imageUrl: collection.imageUrl,
      memberIds: collection.members.map((it: UserView) => it.id),
      startDate: new Date(collection.startDate),
      endDate: new Date(collection.endDate),
    });
    try {
      await progress(collection.id);
    } catch (e) {}
    history.push(COLLECTION_LIST);
  }

  if (error) {
    history.push(COLLECTION_LIST);
  }

  if (data) {
    return (
      <EditCollectionPage
        collectionDetail={data[0]}
        users={data[1]}
        uploadImage={uploadFile}
        editCollection={handleEditCollection}
        serviceTypes={data[2]}
      />
    );
  }

  return null;
}
