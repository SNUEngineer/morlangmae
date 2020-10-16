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

async function getData() {
  const data = await getMyCollections();
  return data.map((it) => viewToData(it));
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
  const handleClick = async (data: CollectionData) => {
    if (data.status === CollectionStatus.DRAFT) {
      // FIXME: change to constant path
      history.push(`/collections/edit/${data.id}`);
    } else if (data.status === CollectionStatus.REQUEST_PROGRESS) {
      // do nothing
    } else {
      history.push(`${COLLECTION_LIST_CREATED}?collectionId=${data.id}`);
    }
  };

  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
  });

  if (data) {
    return (
      <Fragment>
        <CreateCollectionTab
          collections={data}
          onCollectionClick={handleClick}
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
