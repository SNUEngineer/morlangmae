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
  // sendMessage,
  // getMemo,
  // getMemoItem,
  // getMemoItemThread,
  editMemoItems,
  editMemo,
  addMemoItems,
} from "../../services/memo.service";
const getMemoData = async ({ memoId }: any) => {
  const me = await getMe();
  // const memo = await getMemo(memoId);
  // const memoItem = await getMemoItem(memoId);
  // const memoItemThread = await getMemoItemThread(memoId).messages;
  const testMemo = {
    id: 1,
    collection_id: 10,
    title: "첫 메모",
    fileUrl:
      "https://github.com/wojtekmaj/react-pdf/files/2930577/compressed.tracemonkey-pldi-09.pdf",
    createdBy: 10,
  };
  return {
    me: me,
    memo: testMemo,
    // memoItem: memoItem,
    // memoItemThread: memoItemThread,
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

  //fileurl은 memo id를 갖고 오거나, 직접 생성을 통해 만들어짐.
  const handleEditMemo = async (memoData: MemoData) => {};
  const handleAddMemoItem = async (
    itemDatas: MemoItemData[],
    memoId: number
  ) => {
    try {
      await addMemoItems(itemDatas, memoId);
      reload();
    } catch {}
  };
  const handleEditMemoItems = async (itemDatas: MemoItemData[]) => {
    try {
      await editMemoItems(itemDatas);
      reload();
    } catch {}
  };
  const writeMessage = async (message: any) => {
    await sendMessage(props.platterId, message);
  };
  const memoData = useCallback(() => {
    if (!!query) {
      //console.log("query.fileUrl "+query.fileUrl);
      if (!!query.fileUrl && query.fileUrl.length > 0) {
        const creatingData = {
          originFileUrl: query.fileUrl,
          fileUrl: query.fileUrl,
        };
        return creatingData;
      }
    }
    return data.memo;
  }, [data, query]);

  if (!!data) {
    return (
      <MemoWorkstation
        memoData={memoData()}
        memoItemDatas={data?.memoItem}
        memoItemThreadDatas={data?.memoItemThread}
        myData={data.me}
        writeMessage={writeMessage}
        handleEditMemo={handleEditMemo}
        handleEditMemoItems={handleEditMemoItems}
        handleAddMemoItem={handleAddMemoItem}
        onClose={onClose}
      />
    );
  }
  return null;
}
