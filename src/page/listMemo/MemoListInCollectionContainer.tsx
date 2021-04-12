// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import { MemoView, getTemporariesMemos } from "../../services/memo.service";
import {
  CollectionView,
  getCollection,
} from "../../services/chatting.service";
import {
  MemoData,
  createMemo,
  getCollectionMemos,
} from "../../services/memo.service";
import { CollectionData } from "../../components/chatting/ChattingCard";
import { MEMO_WORK_STATION } from "../../common/paths";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";

import MemoListInCollection from "./MemoListInCollection";
async function getMemosInCollection({ collectionId }: any) {
  const data = await Promise.all([
    getCollectionMemos(collectionId),
    getCollection(collectionId),
  ]);

  console.log("satatatatat 3333 " + JSON.stringify(data));

  const memos = data[0];
  const collection = data[1];
  return {
    memos: memos,
    collection: collection,
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
  const { data } = useAsync({
    promiseFn: getMemosInCollection,
    collectionId: props.collectionId,
  });
  const history = useHistory();
  const { pathname, search } = useLocation();
  const goBack = async () => {
    history.goBack();
  };
  const onCollectionClick = () => {
    history.push(`${pathname}?collectionId=${props.collectionId}`);
  };
  const onMemoClick = (data: MemoView) => {
    history.push(`${pathname}?memoId=${data.id}`);
  };

  if (data) {
    return (
      <Fragment>
        <Button onClick={goBack}>뒤로가기</Button>

        <MemoListInCollection
          collectionId={props.collectionId}
          memos={data.memos}
          collection={data.collection}
          onMemoClick={onMemoClick}
          onCollectionClick={onCollectionClick}
        />
      </Fragment>
    );
  }

  return null;
}
