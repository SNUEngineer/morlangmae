import React, { Fragment } from "react";
import CollectionViewPageContainer from "../viewCollection/CollectionViewPageContainer";
import CreatePlatterPageContainer from "../createPlatter/CreatePlatterPageContainer";
import EditPlatterPageContainer from "../editPlatter/EditPlatterPageContainer";

interface ModalManagerProps {
  collectionId?: number;
  platterId?: number | "CREATING";
}

export default function ModalManager(props: ModalManagerProps) {
  return (
    <Fragment>
      {props.collectionId && (
        <CollectionViewPageContainer
          collectionId={props.collectionId}
          hideToolbar={Boolean(props.platterId)}
        />
      )}
      {props.platterId &&
        (props.platterId === "CREATING" ? (
          <CreatePlatterPageContainer
            collectionId={props.collectionId as number}
          />
        ) : (
          <EditPlatterPageContainer platterId={props.platterId as number} />
        ))}
    </Fragment>
  );
}