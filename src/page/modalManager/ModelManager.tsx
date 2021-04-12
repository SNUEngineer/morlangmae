// @ts-nocheck
import React, { Fragment, useEffect, useCallback } from "react";
import CollectionViewPageContainer from "../viewCollection/CollectionViewPageContainer";
import CreatePlatterPageContainer from "../createPlatter/CreatePlatterPageContainer";
import EditPlatterPageContainer from "../editPlatter/EditPlatterPageContainer";
import { useAsync } from "react-async";
import { searchUsers, UserView, getMe } from "../../services/user.service";
import {
  getCollection,
  CollectionDetail,
  editCollection,
} from "../../services/chatting.service";
import {
  getPlatters,
  createPlatter,
  PlatterView,
} from "../../services/platter.service";

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

interface ModalManagerProps {
  collectionId?: number;
  platterId?: number | "CREATING";
}

export default function ModalManager(props: ModalManagerProps) {
  // hideToolbar 를 사용해야하는 이유...?
  const { data, reload } = useAsync({
    promiseFn: getData,
    collectionId: props.collectionId,
  });

  if (data) {
    console.log("datadata view page " + JSON.stringify(data));
    return (
      <Fragment>
        {props.collectionId && (
          <CollectionViewPageContainer
            collectionId={props.collectionId}
            hideToolbar={Boolean(props.platterId)}
            data={data}
            reload={reload}
          />
        )}
        {!!props.platterId && (
          <PlatterModalView
            platterId={props.platterId}
            collectionId={props.collectionId}
            reload={reload}
          ></PlatterModalView>
        )}
      </Fragment>
    );
  }
  return null;
}

function PlatterModalView(props: any) {
  const platterPage = useCallback(() => {
    if (!!props.platterId) {
      if (props.platterId === "CREATING") {
        return (
          <CreatePlatterPageContainer
            collectionId={props.collectionId as number}
            reload={props.reload}
          />
        );
      } else {
        console.log("edit platter page container " + props.platterId);
        return (
          <EditPlatterPageContainer
            platterId={props.platterId as number}
            reload={props.reload}
          />
        );
      }
    }
    return <div></div>;
  }, [props.platterId, props.collectionId, props.reload]);
  return platterPage();
}
