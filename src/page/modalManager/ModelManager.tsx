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

  const platterPage = useCallback(() => {
    if (!!props.platterId) {
      if (props.platterId === "CREATING") {
        return (
          <CreatePlatterPageContainer
            collectionId={props.collectionId as number}
          />
        );
      } else {
        console.log("edit platter page container " + props.platterId);
        return (
          <EditPlatterPageContainer platterId={props.platterId as number} />
        );
      }
    }
    return <div></div>;
  }, [props.platterId, props.collectionId]);
  return (
    <Fragment>
      {props.collectionId && (
        <CollectionViewPageContainer
          collectionId={props.collectionId}
          hideToolbar={Boolean(props.platterId)}
        />
      )}
      {platterPage()}
    </Fragment>
  );
}
