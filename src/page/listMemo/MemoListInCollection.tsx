// @ts-nocheck
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CollectionData } from "../../components/collection/CollectionCard";
import MemoCard from "../../components/memo/list/memoCard";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import memoStyle from "./MemoHomeTab.module.scss";
import Header from "../../components/layout/Header/Header";
import { MemoView } from "../../services/memo.service";
export interface MemoListTabInCollectionProps {
  collectionId: number;
  memos: Promise<MemoView[]>;
  goBack: Promise<void>;
  onMemoClick(data: MemoView): Promise<void>;
  onCollectionClick(): Promise<void>;
  collection: CollectionData;
}

export default function MemoListInCollectionTab(
  props: MemoListTabInCollectionProps
) {
  const collection1 = {
    id: 0,
    title: "3분기 마케팅 전략",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "마케팅",
    createdDate: "8월 10일",
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection2 = {
    id: 2,
    title: "플랜비 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection3 = {
    id: 3,
    title: "SW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection4 = {
    id: 4,
    title: "KW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection5 = {
    id: 5,
    title: "프로케어 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const testCollections = [
    collection1,
    collection2,
    collection3,
    collection4,
    collection5,
    collection2,
  ];

  const history = useHistory();

  return (
    <div className={memoStyle.list_tab_container}>
      {/* <CollectionTab /> */}
      <MyMemoList
        memos={props.memos}
        onMemoClick={props.onMemoClick}
        collection={props.collection}
        onCollectionClick={props.onCollectionClick}
      />
    </div>
  );
}

export interface MyMemoListProps {
  memos: MemoView[];
  onMemoClick(data: MemoView): Promise<void>;
  onCollectionClick(): Promise<void>;
  collection: CollectionData;
}

export function MyMemoList(props: MyMemoListProps) {
  const { memos, onMemoClick, onCollectionClick, collection } = props;
  const [filter, setFilter] = useState<string>("ALL");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  const options = [
    {
      value: "ALL",
      text: "전체",
    },
    {
      value: "IN_PROGRESS",
      text: "진행",
    },
    {
      value: "DONE",
      text: "완료",
    },
  ];
  const imageStyle = useCallback(() => {
    if (!collection) {
      return "";
    }
    if (!!collection.imageUrl) {
      return {
        backgroundImage: "url(" + collection.imageUrl + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else {
      return {
        backgroundImage:
          "url(https://www.solidbackgrounds.com/images/3840x2160/3840x2160-dark-gray-solid-color-background.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    }
  }, [collection]);
  return (
    <div className={memoStyle.memo_in_collection_container}>
      <div className={memoStyle.header_container}>
        <div className={memoStyle.text}>{"나의 메모 리스트"}</div>
      </div>
      <div className={memoStyle.divider} />
      <div className={memoStyle.split}>
        <div
          className={memoStyle.collection_title_image}
          onClick={onCollectionClick}
        >
          <div className={memoStyle.image} style={imageStyle()}></div>
        </div>
        <div className={memoStyle.list_container}>
          <div className={memoStyle.service_type}>{"컨설팅"}</div>
          <Header
            title={collection?.title}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
            options={options}
          />

          <div className={memoStyle.list_container_divider} />
          <div className={memoStyle.scroll_container}>
            {memos.map((item) => {
              return (
                <div className={memoStyle.list_item_container}>
                  <MemoCard
                    key={item.key}
                    data={item}
                    viewType={"IN_COLLECTION"}
                    onClick={onMemoClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
