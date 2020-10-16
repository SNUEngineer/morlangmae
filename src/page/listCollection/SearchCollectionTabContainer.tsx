// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import {
  CollectionView,
  pinCollection,
  unpinCollection,
  getCompanyCollections,
  getServiceCollections,
  getHotCollections,
  getRecentlyViewCollections,
  getPinnedCollections,
} from "../../services/collection.service";
import { useHistory } from "react-router-dom";
import { CollectionData } from "../../components/collection/CollectionCard";
import { COLLECTION_LIST, COLLECTION_LIST_COMPANY } from "../../common/paths";
import SearchCollectionTab from "./SearchCollectionTab";
import ModalManager from "../modalManager/ModelManager";

async function getMyCollections() {
  const data = await Promise.all([
    getServiceCollections(),
    getHotCollections(),
    getRecentlyViewCollections(),
    getCompanyCollections(),
    getPinnedCollections(),
  ]);

  const pinnedIds = data[4].map((it) => it.id);
  const serviceCollections = data[0].map((it) => viewToData(it));
  serviceCollections
    .filter((it) => pinnedIds.some((it2) => it.id === it2))
    .forEach((it) => (it.pinned = true));
  const hotCollections = data[1].map((it) => viewToData(it));
  hotCollections
    .filter((it) => pinnedIds.some((it2) => it.id === it2))
    .forEach((it) => (it.pinned = true));
  const recentlyViewedCollections = data[2].map((it) => viewToData(it));
  recentlyViewedCollections
    .filter((it) => pinnedIds.some((it2) => it.id === it2))
    .forEach((it) => (it.pinned = true));
  const companyCollections = data[3].map((it) => viewToData(it));
  companyCollections
    .filter((it) => pinnedIds.some((it2) => it.id === it2))
    .forEach((it) => (it.pinned = true));

  return {
    serviceCollections,
    hotCollections,
    recentlyViewedCollections,
    companyCollections,
  };
}

function viewToData(view: CollectionView): CollectionData {
  return {
    ...view,
    notificationCount: 0,
    pinned: false,
  };
}

interface SearchCollectionTabContainerProps {
  collectionId?: number;
  platterId?: number;
}

export default function SearchCollectionTabContainer(
  props: SearchCollectionTabContainerProps
) {
  const history = useHistory();

  const { data } = useAsync({
    promiseFn: getMyCollections,
  });

  const onCollectionClick = async (data: CollectionData) => {
    const path = `${COLLECTION_LIST}?collectionId=${data.id}`;
    history.push(path);
  };

  const goCompanyCollection = async () => {
    history.push(COLLECTION_LIST_COMPANY);
  };

  if (data) {
    return (
      <Fragment>
        <SearchCollectionTab
          serviceCollections={data.serviceCollections}
          hotCollections={data.hotCollections}
          recentlyViewedCollections={data.recentlyViewedCollections}
          companyCollections={data.companyCollections}
          onCollectionClick={onCollectionClick}
          pinCollection={pinCollection}
          unpinCollection={unpinCollection}
          viewAllCompanyCollection={goCompanyCollection}
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
