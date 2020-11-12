// @ts-nocheck
import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import MemoWorkstation from "./MemoWorkstation";
import { useAsync } from "react-async";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { getMe } from "../../services/user.service";

import {
  MemoData,
  MemoItemData,
  MemoItemThreadData,
  getMemo,
  editMemoItem,
  addMemoItem,
  deleteMemoItem,
  addSharingMember,
  deleteSharingMember,
  editMemoTitle,
  editMemoComment,
  sendMessage,
} from "../../services/memo.service";
import { getCollection } from "../../services/collection.service";
const getMemoData = async ({ memoId }: any) => {
  const me = await getMe();
  const memo = await getMemo(memoId);
  const memeThread = await getMemo(memoId);
  // const collectionData = await getCollection(collectionId);
  const collectionData = {
    members: [
      {
        id: 1,
        displayName: "송병근",
      },
      {
        id: 2,
        displayName: "송병근22",
      },
    ],
  };
  console.log("memomemodatatata " + JSON.stringify(memo.data));
  return {
    me: me,
    memo: memo.data,
    collectionData: collectionData,
  };
};

export interface MemoWorkstationContainerProps {
  memoId: number;
  isCreating: boolean;
  creatingFileUrl?: string;
}

export default function MemoWorkstationContainer(
  props: MemoWorkstationContainerProps
) {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const query = queryString.parse(search);
  const memoId = query.memoId;
  const { data, reload, error, isLoading } = useAsync({
    promiseFn: getMemoData,
    memoId: memoId,
  });
  const onClose = async () => {
    history.replace(pathname);
  };

  // //fileurl은 memo id를 갖고 오거나, 직접 생성을 통해 만들어짐.
  const handleEditMemo = async (memoData: MemoData) => {
    if (!data) {
      return;
    }
    const originMemoData = data.memo;
    try {
      editMemoTitle(memoData);
    } catch {}
    try {
      editMemoComment(memoData);
    } catch {}
    try {
      memoData?.members?.forEach((it) => {
        if (!originMemoData?.includes(it.id)) {
          addSharingMember(memoData, it.id);
        }
      });
      originMemoData?.members?.forEach((it) => {
        if (!memoData?.includes(it.id)) {
          deleteSharingMember(memoData, it.id);
        }
      });
    } catch {}
    reload();
  };
  const handleMemoItems = async (itemDatas: MemoItemData[], type: string) => {
    switch (type) {
      case "ADD":
        try {
          await itemDatas.forEach((it) => addMemoItem(it, memoId));
          reload();
        } catch {}
        return;
      case "EDIT":
        try {
          await itemDatas.forEach((it) => editMemoItem(it, memoId));
          reload();
        } catch {}
        return;
      case "DELETE":
        try {
          await itemDatas.forEach((it) => deleteMemoItem(it));
          reload();
        } catch {}
        return;
    }
  };

  const writeMessage = async (itemId, message: any) => {
    await sendMessage(itemId, message);
    reload();
  };
  const memoData = useCallback(() => {
    if (!!query) {
      if (!!query.fileUrl && query.fileUrl.length > 0) {
        const creatingData = {
          originFileUrl: query.fileUrl,
          fileUrl: query.fileUrl,
        };
        return creatingData;
      }
    }
    let resultMemoData = data.memo;
    resultMemoData.memoItems.forEach((it) => {
      try {
        const jsonString = it.metadata;
        const replaced = jsonString.replace(/\\/g, "");
        let trimmed = replaced;

        if (trimmed.startsWith('"')) {
          trimmed = trimmed.substr(1);
        }
        if (trimmed.endsWith('"')) {
          trimmed = trimmed.substr(0, trimmed.length - 1);
        }
        const resultData = JSON.parse(trimmed);
        it.metadata = resultData;
      } catch (e) {}
    });
    return data.memo;
  }, [data, query]);
  if (!!data) {
    //metadata 부분을 json으로 변환하기.
    console.log("data.memodata.memodata.memo " + JSON.stringify(data.memo));
    return (
      <MemoWorkstation
        memoData={memoData()}
        memoItemDatas={data?.memo?.memoItem}
        myData={data.me}
        writeMessage={writeMessage}
        handleEditMemo={handleEditMemo}
        handleMemoItems={handleMemoItems}
        onClose={onClose}
        collectionData={data?.collectionData}
        sendMessage={sendMessage}
      />
    );
  }
  return null;
}
