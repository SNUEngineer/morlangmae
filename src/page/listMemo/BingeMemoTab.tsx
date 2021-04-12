// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/chatting/ChattingCard";
import { GridCollectionCardList } from "../../components/chatting/GridCollectionCardList";
import memoStyle from "./MemoHomeTab.module.scss";
import Header from "../../components/layout/Header/Header";
export interface MemoHomeTabProps {}

export default function MemoHomeTab(props: MemoHomeTabProps) {
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
  const onCollectionClick = (data: CollectionData) => {
    history.push(`/memos-in-collections/${data.id}`);
  };
  const onMemoClick = () => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //메모로 이동
    //history.push(path);
  };

  return (
    <div className={memoStyle.tab_container}>
      <BingeMemoInCollectionCardList
        collections={testCollections}
        onCollectionClick={onCollectionClick}
      />
    </div>
  );
}

export interface BingeMemoInCollectionCardListProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function BingeMemoInCollectionCardList(
  props: BingeMemoInCollectionCardListProps
) {
  const collections = props.collections;
  const [filter, setFilter] = useState<string>("ALL");
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
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  const filteredCollections = collections.filter((data: CollectionData) => {
    return filter === "ALL" || data.status === filter;
  });

  let columnList = [];
  let collectionsGrid = [];
  const columnCount = 3; // 반응에 따라 4개 이상으로 늘어날 경우 자동으로 배열.
  let index = 0;
  filteredCollections.forEach((element) => {
    columnList.push(element);
    index++;
    if (index === filteredCollections.length) {
      while (columnList.length < columnCount) {
        columnList.push(null);
      }
    }
    if (columnList.length >= columnCount) {
      collectionsGrid.push(columnList);
      columnList = [];
    }
  });
  const collectionCards = collectionsGrid.map(
    (collections: CollectionData[], index) => {
      return (
        <GridCollectionCardList
          key={index}
          collections={collections}
          onClick={props.onCollectionClick}
          columnCount={columnCount}
        />
      );
    }
  );

  return (
    <div className={memoStyle.binge_collection_container}>
      <Header
        title={"모아보기"}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
      <div className={memoStyle.memo_list_container}>{collectionCards}</div>
      {/* collection card 클릭시 해당 컬렉션에 포함된 memo가 한번에 보이는 memos in collection 페이지로 이동 */}
    </div>
  );
}
