// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAsync } from "react-async";
import EditCollectionPage from "./EditCollectionPage";
import { uploadFile } from "../../services/file.service";
import { searchUsers, UserView, getMe } from "../../services/user.service";
import {
  editCollection,
  progress,
  requestProgress,
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
  const { pathname, search } = useLocation();
  const collectionId = props.collectionId;
  console.log("ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ111 " + collectionId);
  const onClose = async () => {
    history.replace(pathname);
  };
  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
    collectionId: collectionId,
  });

  async function handleEditCollection(
    collection: any,
    approver?: UserView,
    draftSave?: boolean
  ) {
    const draftSaving = !!draftSave ? draftSave : false;

    const userView = await getMe();
    try {
      //내가 승인권자면 자동으로 허용. 아니면 에러 캐칭됨.
      await progress(collection.id);
    } catch (e) {
      console.log("progress 에러");
    }
    if (draftSaving) {
      await editCollection(collection.id, {
        title: collection.title,
        imageUrl: collection.imageUrl,
        memberIds: collection.members.map((it: UserView) => it.id),
        startDate: new Date(collection.startDate),
        endDate: new Date(collection.endDate),
      });
    } else {
      //승인 시.
      await editCollection(collection.id, {
        title: collection.title,
        imageUrl: collection.imageUrl,
        memberIds: collection.members.map((it: UserView) => it.id),
        startDate: new Date(collection.startDate),
        endDate: new Date(collection.endDate),
      });
      try {
        await requestProgress(collection.id, approver.id);
      } catch (e) {
        console.log("requestProgress 에러");
      }

      history.push(COLLECTION_LIST);
    }

    history.push(COLLECTION_LIST);
  }
  console.log("ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ3333 ");
  if (error) {
    //history.push(COLLECTION_LIST);
  }

  if (data) {
    return (
      <EditCollectionPage
        collectionDetail={data[0]}
        users={data[1]}
        uploadImage={uploadFile}
        editCollection={handleEditCollection}
        serviceTypes={data[2]}
        // onClose={onClose}
      />
    );
  }

  return null;
}
