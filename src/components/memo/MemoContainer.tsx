// @ts-nocheck
import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import Memo from "./Memo";
import { useAsync } from "react-async";
// import Menu, { Item as MenuItem, Divider } from "rc-menu";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";

async function getData({ memoId, query }: any) {
  if (!!query) {
    if (!!query.fileUrl && query.fileUrl.length > 0) {
      //fileurl이 존재
      return;
    }
  }

  const memo = await getMemo(memoId);
  const memoItem = await getMemoItem(memoId);
  const memoItemThread = await getMemoItemThread(memoId);
  return {
    memo: memo,
    memoItem: memoItem,
    memoItemThread: memoItemThread,
  };
}
export interface MemoContainerProps {
  memoId: number;
  isCreating: boolean;
  creatingFileUrl?: string;
}

export default function MemoContainer(props: EditCollectionPageContainerProps) {
  const { memoId, isCreating } = props;
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const history = useHistory();
  const { pathname, search } = useLocation();
  const query = queryString.parse(search);
  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
    memoId: memoId,
    search: query,
  });
  //fileurl은 memo id를 갖고 오거나, 직접 생성을 통해 만들어짐.

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
    return data.memo;
  }, [data, query]);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const serviceTypes = await getServiceTypes();
      setServiceTypes(serviceTypes);
    };
    fetchServiceTypes();
  }, []);

  return (
    <Memo
      isCreating={props.isCreating}
      memoData={memoData()}
      memoItemDatas={data.memoItem}
      memoItemThreadDatas={data.memoItemThread}
    />
  );
}
