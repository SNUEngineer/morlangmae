// @ts-nocheck
import React, { useState, useEffect, Fragment } from "react";
import CollectionListPage from "./CollectionListPage";
import {
  getCollections,
  getHotCollections,
  getRecentlyViewCollections,
  getCompanyCollections,
  getMyCollections,
  getServiceCollections,
  CollectionView,
  pinCollection,
  unpinCollection,
} from "../../services/collection.service";
import ModalManager from "../modalManager/ModelManager";
import { COLLECTION_LIST_PAGE } from "../../common/paths";
import { useHistory, useLocation } from "react-router-dom";
import { useAsync } from "react-async";

async function getListCollections(type: string) {
  //onst type = type.type;
  switch (type.type) {
    case "FOR_USER":
      const collections = await getServiceCollections();
      return collections;
    case "HOT":
      const collections2 = await getHotCollections();
      return collections2;
    case "RECENT":
      const collections3 = await getRecentlyViewCollections();
      return collections3;
    case "COMPANY":
      const collections4 = await getCompanyCollections();
      return collections4;
    case "MY":
      const collections5 = await getCollections();
      return collections5;
    case "BINGE":
      const collections6 = await getCollections();
      return collections6;
  }
}
export interface CollectionListPageContainerProps {}

export default function CollectionListPageContainer(
  props: CollectionListPageContainerProps
) {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [type, setType] = useState("COMPANY");
  useEffect(() => {
    const startI = pathname.indexOf("all") + 3;
    const targetString = pathname.substring(startI, pathname.length);
    const types = ["FOR_USER", "HOT", "RECENT", "COMPANY", "MY", "BINGE"];
    types.forEach((item) => {
      if (targetString.includes(item)) {
        console.log("itemitem " + item);
        setType(item);
      }
    });
  }, [pathname]);
  const { data, reload, error, isLoading } = useAsync({
    promiseFn: getListCollections,
    type: type,
  });

  const onCollectionClick = async (data: CollectionData) => {
    const path = `${COLLECTION_LIST_PAGE}?collectionId=${data.id}`;

    history.push(path);
  };
  console.log("datadata eafsdf " + type);
  if (data) {
    return (
      <Fragment>
        <CollectionListPage
          collections={data}
          onCollectionClick={onCollectionClick}
          pinCollection={pinCollection}
          unpinCollection={unpinCollection}
          reloadData={reload}
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
