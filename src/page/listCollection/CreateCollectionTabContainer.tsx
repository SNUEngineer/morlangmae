// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import {
  getMyCollections,
  CollectionView,
} from "../../services/collection.service";
import CreateCollectionTab from "./CreateCollectionTab";
import {
  CollectionData,
  CollectionStatus,
} from "../../components/collection/CollectionCard";
import { useHistory } from "react-router-dom";
import { COLLECTION_CREATE, COLLECTION_LIST_CREATED } from "../../common/paths";
import ModalManager from "../modalManager/ModelManager";
import { getMe } from "../../services/user.service";
async function getData() {
  const data = await getMyCollections();
  const collections = data.map((it) => viewToData(it));
  const me = await getMe();
  return { collections: collections, myData: me };
}

function viewToData(view: CollectionView): CollectionData {
  return {
    ...view,
    notificationCount: 0,
    pinned: false,
  };
}

interface CreateCollectionTabContainerProps {
  collectionId?: number;
  platterId?: number;
}

export default function CreateCollectionTabContainer(
  props: CreateCollectionTabContainerProps
) {
  const history = useHistory();
  const handleClick = async (collectionData: CollectionData) => {
    if (collectionData.status === CollectionStatus.DRAFT) {
      // FIXME: change to constant path
      history.push(`/collections/created?editingId=${collectionData.id}`);
    } else if (collectionData.status === CollectionStatus.REQUEST_PROGRESS) {
      if (data.myData.id === collectionData.approver) {
        history.push(`/collections/created?editingId=${collectionData.id}`);
      }
    } else {
      history.push(
        `${COLLECTION_LIST_CREATED}?collectionId=${collectionData.id}`
      );
    }
  };

  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
  });
  // const { myData, myError, myIsLoading } = useAsync({
  //   promiseFn: getMyId,
  // });
  if (data) {
    return (
      <Fragment>
        <CreateCollectionTab
          collections={data.collections}
          onCollectionClick={handleClick}
          myId={data.myData.id}
        />
        <ModalManager
          collectionId={props.collectionId}
          platterId={props.platterId}
        />
      </Fragment>
    );
  }
  return null;
}
