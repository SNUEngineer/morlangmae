// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import { MemoView, getTemporariesMemos } from "../../services/memo.service";
import { CollectionView } from "../../services/collection.service";
import { MemoData } from "../../components/memo/list/memoCard";
import { useHistory } from "react-router-dom";
import { CollectionData } from "../../components/collection/CollectionCard";
import { MEMO_WORK_STATION } from "../../common/paths";
import MemoHomeTab from "./MemoHomeTab";

async function getHomeMemos() {
  const data = await Promise.all([
    getTemporariesMemos(),
    getCollcetionsForMemos(),
    getRequestingMemos(),
    getRequestedMemos(),
    getMyMemos(),
  ]);

  const temporariesMemos = data[0].map((it) => viewToData(it));
  const collcetionsForMemos = data[1].map((it) => viewToCollectionData(it));
  const requestingMemos = data[2].map((it) => viewToData(it));
  const requestedMemos = data[3].map((it) => viewToData(it));
  const myMemos = data[4].map((it) => viewToData(it));

  return {
    temporariesMemos,
    collcetionsForMemos,
    requestingMemos,
    requestedMemos,
    myMemos,
  };
}

function viewToData(view: MemoView): MemoData {
  return {
    ...view,
    notificationCount: 0,
  };
}

function viewToCollectionData(view: CollectionView): CollectionData {
  return {
    ...view,
    notificationCount: 0,
    pinned: false,
  };
}

interface MemoHomeTabContainerProps {
  collectionId?: number;
  platterId?: number;
}

export default function MemoHomeTabContainer(props: MemoHomeTabContainerProps) {
  const history = useHistory();
  const { data } = useAsync({
    promiseFn: getHomeMemos,
  });
  const onDropFile = async (fileUrl: string) => {
    const path = `${MEMO_WORK_STATION}?fileUrl=${fileUrl}`;
    history.push(path);
  };

  if (data) {
    return (
      <Fragment>
        <MemoHomeTab onDropFile={onDropFile} />
      </Fragment>
    );
  }

  return null;
}
