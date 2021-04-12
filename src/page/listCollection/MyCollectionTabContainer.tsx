// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import {
  getCollections,
  CollectionView,
  getPinnedCollections,
  pinCollection,
  unpinCollection,
} from "../../services/collection.service";
import MyCollectionTab from "./MyCollectionTab";
import { useHistory } from "react-router-dom";
import { CollectionData } from "../../components/chatting/CollectionCard";
import { COLLECTION_LIST_MY_COLLECTION } from "../../common/paths";
import ModalManager from "../modalManager/ModelManager";

async function getMyCollections() {
  const data = await Promise.all([getPinnedCollections(), getCollections()]);

  const pinned = data[0].map((it) => viewToData(it));
  pinned.forEach((it) => (it.pinned = true));
  const myCollections = data[1]
    .filter((it) => pinned.every((it2) => it.id !== it2.id)) //핀에 걸려있는 거라면 제외하는...
    .map((it) => viewToData(it));

  return {
    pinned,
    myCollections,
    helpfulCollections: data[1].map((it) => viewToData(it)),
  };
}

function viewToData(view: CollectionView): CollectionData {
  return {
    ...view,
    notificationCount: 0,
    pinned: false,
  };
}

interface MyCollectionTabContainerProps {
  collectionId?: number;
  platterId?: number;
}

export default function MyCollectionTabContainer(
  props: MyCollectionTabContainerProps
) {
  const history = useHistory();

  const { data, reload, error, isLoading } = useAsync({
    promiseFn: getMyCollections,
  });

  const onCollectionClick = async (data: CollectionData) => {
    const path = `${COLLECTION_LIST_MY_COLLECTION}?collectionId=${data.id}`;
    history.push(path);
  };

  if (data) {
    return (
      <Fragment>
        <MyCollectionTab
          pinned={data.pinned}
          myCollections={data.myCollections}
          helpfulCollections={data.helpfulCollections}
          onCollectionClick={onCollectionClick}
          pinCollection={pinCollection}
          unpinCollection={unpinCollection}
          reloadData={reload}
        />
      </Fragment>
    );
  }

  return null;
}
