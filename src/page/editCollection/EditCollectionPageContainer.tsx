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
    searchUsers(undefined), //이용자 추가를 위한 검색을 위한 전체 사용자 목록 데이터
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
      history.push(COLLECTION_LIST);
      return;
    } catch (e) {
      console.log("progress 에러");
    }
    //여기에 IN PROGRESS 일 경우 대응 추가.

    if (draftSaving) {
      //draft save 시, 승인권자에게 요청없이 초안 내용만 업데이트
      await editCollection(collection.id, {
        title: collection.title,
        imageUrl: collection.imageUrl,
        memberIds: collection.members.map((it: UserView) => it.id),
        startDate: new Date(collection.startDate),
        endDate: new Date(collection.endDate),
      });
    } else {
      //초안 내용 업데이트와 동시에, 승인 요청 보냄. (draft = request progress)
      //사용자가 승인권자인 경우, 컬렉션이 승인 됨. (request progress = in progress)
      await editCollection(collection.id, {
        title: collection.title,
        //imageUrl: collection.imageUrl,
        imageUrl:
          "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg/satellite-image-of-globe.jpg/metofficegovuk%3AheroLarge",
        memberIds: collection.members.map((it: UserView) => it.id),
        collectionType: "TEAM",
        // startDate: new Date(collection.startDate),
        // endDate: new Date(collection.endDate),
        startDate: new Date(0),
        endDate: new Date(1801968593191),
        requestee: approver.id,
        requestComment: "수락 부탁드립니다.",
      });
      try {
        await requestProgress(collection.id);
      } catch (e) {
        console.log("requestProgress 에러");
      }

      history.push(COLLECTION_LIST);
    }

    history.push(COLLECTION_LIST);
  }
  if (error) {
    //history.push(COLLECTION_LIST);
  }

  if (data) {
    console.log("collectionDetail  " + JSON.stringify(data[0]));
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
