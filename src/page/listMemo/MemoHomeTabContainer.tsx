// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import { MemoView, getTemporariesMemos } from "../../services/memo.service";
import { CollectionView } from "../../services/collection.service";
import { MemoData, createMemo } from "../../services/memo.service";
import { CollectionData } from "../../components/collection/CollectionCard";
import { MEMO_WORK_STATION } from "../../common/paths";
import MemoHomeTab from "./MemoHomeTab";
import { uploadFile } from "../../services/file.service";
import { getMe } from "../../services/user.service";
import { useLocation, useHistory } from "react-router-dom";
async function getHomeMemos() {
  const data = await Promise.all([
    getTemporariesMemos(),
    getCollcetionsForMemos(),
    getRequestingMemos(),
    getRequestedMemos(),
    getMyMemos(),
  ]);

  const temporariesMemos = data[0].map((it) => viewToData(it));
  const collectionsForMemos = data[1].map((it) => viewToCollectionData(it));
  const requestingMemos = data[2].map((it) => viewToData(it));
  const requestedMemos = data[3].map((it) => viewToData(it));
  const myMemos = data[4].map((it) => viewToData(it));

  return {
    temporariesMemos, //내꺼에서 초안 상태인거 //
    collectionsForMemos, //
    requestingMemos, //
    requestedMemos, // url
    myMemos, //
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
const history = useHistory();
const { pathname, search } = useLocation();
const handleDrop = async (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.dataTransfer.files.length !== 1) {
    console.error("Unexpected file");
  } else {
    const res = await uploadFile(e.dataTransfer.files[0]);
    const me = await getMe();
    const request = {
      title: "10월 24일 오후 10시에 생성된 메모입니다.",
      fileUrl: res.uri,
      collectionId: 11,
      sharedUserIds: [me.id],
    };
    const memoId = await createMemo(request);
    history.push(`${pathname}?memoId=${memoId}`);
  }
};

export default function MemoHomeTabContainer(props: MemoHomeTabContainerProps) {
  const { data } = useAsync({
    promiseFn: getHomeMemos,
  });

  if (data) {
    return (
      <Fragment>
        <MemoHomeTab handleDrop={handleDrop} />
      </Fragment>
    );
  }

  return null;
}
