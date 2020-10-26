// @ts-nocheck
import React, { Fragment, useEffect, useCallback } from "react";
import CollectionViewPageContainer from "../viewCollection/CollectionViewPageContainer";
import CreatePlatterPageContainer from "../createPlatter/CreatePlatterPageContainer";
import EditPlatterPageContainer from "../editPlatter/EditPlatterPageContainer";

interface ModalManagerProps {
  collectionId?: number;
  platterId?: number | "CREATING";
}

export default function ModalManager(props: ModalManagerProps) {
  // hideToolbar 를 사용해야하는 이유...?

  return (
    <Fragment>
      {props.collectionId && (
        <CollectionViewPageContainer
          collectionId={props.collectionId}
          hideToolbar={Boolean(props.platterId)}
        />
      )}
      {!!props.platterId && (
        <PlatterView
          platterId={props.platterId}
          collectionId={props.collectionId}
          reload={props.reload}
        ></PlatterView>
      )}
    </Fragment>
  );
}

function PlatterView(props: any) {
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
