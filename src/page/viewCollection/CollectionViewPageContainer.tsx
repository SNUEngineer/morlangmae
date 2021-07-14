// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useAsync } from "react-async";
import CollectionViewPage from "./CollectionViewPage";
import {
  getCollection,
  CollectionDetail,
  editCollection,
} from "../../services/task.service";
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
  data;
  reload;
}

export default function CollectionViewPageContainer(
  props: CollectionViewPageContainerProps
) {
  const { pathname, search } = useLocation();
  const { data } = props;
  const history = useHistory();
  const onClose = async () => {
    console.log("onCloseonCloseonClose");
    history.replace(pathname);
  };

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
    await props.reload();
  }

  const reloading = async () => {
    await props.reload();
  };

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
