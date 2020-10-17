// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useAsync } from "react-async";
import CollectionViewPage from "./CollectionViewPage";
import {
  getCollection,
  CollectionDetail,
} from "../../services/collection.service";
import {
  getPlatters,
  createPlatter,
  PlatterView,
} from "../../services/platter.service";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { PlatterData } from "../../components/platter/PlatterEditor";

export interface CollectionViewPageContainerProps {
  collectionId: number;
  hideToolbar?: boolean;
}

async function getData({ collectionId }: any) {
  const data = await Promise.all([
    getCollection(collectionId),
    getPlatters(collectionId),
  ]);
  console.log("collectionId " + JSON.stringify(data[0]));

  return {
    collection: data[0],
    platters: data[1].map((it) => viewToData(it)),
  };
}

function viewToData(view: PlatterView): PlatterData {
  return {
    ...view,
  };
}

export default function CollectionViewPageContainer(
  props: CollectionViewPageContainerProps
) {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const onClose = async () => {
    console.log("onCloseonCloseonClose");
    history.replace(pathname);
  };
  const { data, reload } = useAsync({
    promiseFn: getData,
    collectionId: props.collectionId,
  });

  const handleCreatePlatter = async () => {
    const query = queryString.parse(search);
    query.platterId = "CREATING";
    history.push({
      pathname: pathname,
      search: queryString.stringify(query),
    });
  };

  const onPlatterClick = async (data: PlatterData) => {
    const query = queryString.parse(search);
    query.platterId = String(data.id);
    history.push({
      pathname: pathname,
      search: queryString.stringify(query),
    });
  };

  if (data) {
    return (
      <CollectionViewPage
        hideToolbar={props.hideToolbar}
        createPlatter={handleCreatePlatter}
        collectionDetail={data.collection}
        platters={data.platters}
        onPlatterClick={onPlatterClick}
        onClose={onClose}
      />
    );
  }

  return null;
}
