// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useAsync } from "react-async";
import CollectionViewPage from "./CollectionViewPage";
import {
  getCollection,
  CollectionDetail,
  editCollection,
} from "../../services/collection.service";
import {
  getPlatters,
  createPlatter,
  PlatterView,
} from "../../services/platter.service";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { PlatterData } from "../../components/platter/PlatterEditor";
import { searchUsers, UserView, getMe } from "../../services/user.service";
export interface CollectionViewPageContainerProps {
  collectionId: number;
  hideToolbar?: boolean;
}

async function getData({ collectionId }: any) {
  const data = await Promise.all([
    getCollection(collectionId),
    getPlatters(collectionId),
    searchUsers(undefined),
  ]);

  return {
    collection: data[0],
    platters: data[1].map((it) => viewToData(it)),
    users: data[2],
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

  async function handleEditCollection(collection: any) {
    await editCollection(collection.id, {
      title: collection.title,
      imageUrl: collection.imageUrl,
      memberIds: collection.members.map((it: UserView) => it.id),
      startDate: new Date(collection.startDate),
      endDate: new Date(collection.endDate),
    });
    await reload();
  }

  const reloading = async () => {
    console.log("reloading ");
  };
  if (data) {
    console.log("reloading !!!#!#!#! " + JSON.stringify(data));
    return (
      <CollectionViewPage
        hideToolbar={props.hideToolbar}
        createPlatter={handleCreatePlatter}
        collectionDetail={data.collection}
        platters={data.platters}
        users={data.users}
        onPlatterClick={onPlatterClick}
        onClose={onClose}
        editCollectionFn={handleEditCollection}
        reloadData={reloading}
      />
    );
  }

  return null;
}
