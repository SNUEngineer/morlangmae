// @ts-nocheck
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useAsync } from "react-async";
import {
  getCompanyCollections,
  CollectionView,
  pinCollection,
  unpinCollection,
} from "../../services/collection.service";
import { CollectionData } from "../../components/chatting/CollectionCard";
import { COLLECTION_LIST, COLLECTION_LIST_COMPANY } from "../../common/paths";
import CompanyCollectionPage from "./CompanyCollectionPage";
import ModalManager from "../modalManager/ModelManager";

interface CompanyCollectionPageConatinerProps {
  collectionId?: number;
  platterId?: number | "CREATING";
}

async function getMyCollections() {
  const data = await getCompanyCollections();

  return data.map((it) => viewToData(it));
}

function viewToData(view: CollectionView): CollectionData {
  return {
    ...view,
    notificationCount: 0,
    pinned: false,
  };
}

export default function CompanyCollectionPageContainer(
  props: CompanyCollectionPageConatinerProps
) {
  const history = useHistory();

  const { data } = useAsync({
    promiseFn: getMyCollections,
  });

  const onCollectionClick = async (data: CollectionData) => {
    const path = `${COLLECTION_LIST_COMPANY}?collectionId=${data.id}`;
    history.push(path);
  };

  const goBack = async () => {
    history.push(`${COLLECTION_LIST}`);
  };

  if (data) {
    return (
      <Fragment>
        <CompanyCollectionPage
          companyCollections={data}
          onClick={onCollectionClick}
          goBack={goBack}
          pinCollection={pinCollection}
          unpinCollection={unpinCollection}
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
