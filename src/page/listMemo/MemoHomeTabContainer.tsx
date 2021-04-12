// @ts-nocheck
import React, { Fragment } from "react";
import { useAsync } from "react-async";
import {
  MemoView,
  getRecentlyViewCollections,
  getRequestedMemos,
  MemoData,
  createMemo,
  getMyMemos,
} from "../../services/memo.service";
import { CollectionView } from "../../services/chatting.service";
import { CollectionData } from "../../components/chatting/ChattingCard";
import { MEMO_WORK_STATION } from "../../common/paths";
import MemoHomeTab from "./MemoHomeTab";
import { uploadFile } from "../../services/file.service";
import { getMe } from "../../services/user.service";
import { useLocation, useHistory } from "react-router-dom";
async function getHomeMemos() {
  const data = await Promise.all([
    getRecentlyViewCollections(),
    getRequestedMemos(),
    getMyMemos(),
    //getCollections(),
    //getTemporariesMemos(), //최근 알림 메모
    //getRequestingMemos(), //요청
  ]);

  console.log("data[0]data[0]data[0] " + JSON.stringify(data[0]));

  // const recentMemos = data[0].map((it) => viewToData(it));
  // const requestedMemos = data[1].map((it) => viewToData(it));

  // const myMemos = data[2].map((it) => viewToData(it));
  // return {
  //   temporariesMemos, //내꺼에서 초안 상태인거 //
  //   collectionsForMemos, //
  //   requestingMemos, //
  //   requestedMemos, // url
  //   myMemos, //
  // };
  return { recents: data[0], requested: data[1], myMemos: data[2] };
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
  const handleTestClick = async (e: any) => {
    console.log("handleTestClick");
    const me = await getMe();
    const request = {
      title: "10월 24일 오후 10시에 생성된 메모입니다. ddds",
      fileUrl:
        "https://github.com/wojtekmaj/react-pdf/files/2930577/compressed.tracemonkey-pldi-09.pdf",
      collectionId: 1,
      sharedUserIds: [me.id],
    };
    const memoId = await createMemo(request);
    console.log("memoIdmemoId " + memoId);
    history.push(`${pathname}?memoId=${memoId}`);
  };
  const onMemoClick = (data: MemoView) => {
    history.push(`${pathname}?memoId=${data.id}`);
  };

  const { data } = useAsync({
    promiseFn: getHomeMemos,
  });

  if (data) {
    console.log(
      "data.recentMemosdata.recentMemos " + JSON.stringify(data.recents)
    );
    return (
      <Fragment>
        <MemoHomeTab
          handleDrop={handleDrop}
          handleTestClick={handleTestClick}
          onMemoClick={onMemoClick}
          recentMemos={data?.recents}
          requestedMemos={data?.requested}
          myMemos={data?.myMemos}
        />
      </Fragment>
    );
  }

  return null;
}
