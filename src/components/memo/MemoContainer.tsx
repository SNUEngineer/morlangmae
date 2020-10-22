// @ts-nocheck
import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import Memo from "./Memo";
import { useAsync } from "react-async";
// import Menu, { Item as MenuItem, Divider } from "rc-menu";

async function getData({ memoId, isCreating }: any) {
  if (!isCreating) {
    const memo = await getMemo(memoId);
    const memoItem = await getMemoItem(memoId);
    const memoItemThread = await getMemoItemThread(memoId);
    return {
      memo: memo,
      memoItem: memoItem,
      memoItemThread: memoItemThread,
    };
  }
  return;
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

  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
    memoId: memoId,
    isCreating: isCreating,
  });
  //fileurl은 memo id를 갖고 오거나, 직접 생성을 통해 만들어짐.

  const memoData = useCallback(() => {
    if (isCreating) {
      //여기에서 파일 변환하기.
      const creatingData = {
        originFileUrl: props.creatingFileUrl,
        fileUrl: props.creatingFileUrl,
      };
      return creatingData;
    } else {
      return data.memo;
    }
  }, [isCreating, data, props.creatingFileUrl]);

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
