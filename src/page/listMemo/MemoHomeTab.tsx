// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import MemoCard from "../../components/memo/list/memoCard";
import Grid from "@material-ui/core/Grid";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import memoStyle from "./MemoHomeTab.module.scss";
import CarouselList from "../../components/customizedComponent/Carousel/CarouselList";
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
    history.push(`/memos/collections/${data.id}`);
  };
  const onMemoClick = () => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //메모로 이동
    //history.push(path);
  };

  return (
    <div className={memoStyle.tab_container}>
      <div className={memoStyle.create_memo_container}>
        <div className={memoStyle.drag_drop_container}></div>
      </div>

      <TempMemoList memos={testCollections} onMemoClick={onMemoClick} />
      <MemoInCollectionCardList
        collections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <RequestMemoList
        memos={testCollections}
        onMemoClick={onMemoClick}
        isRequesting={true}
      />
      <RequestMemoList
        memos={testCollections}
        onMemoClick={onMemoClick}
        isRequesting={false}
      />
    </div>
  );
}

export interface MemoInCollectionCardListProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function MemoInCollectionCardList(props: MemoInCollectionCardListProps) {
  const { collections, onCollectionClick } = props;
  return (
    <div className={memoStyle.binge_container}>
      <Header title={"컬렉션에 포함된 메모 모아보기"} subMenuType={"goToAll"} />
      <div className={memoStyle.memo_list_container}>
        <GridCollectionCardList
          collections={collections.slice(0, 2)}
          onClick={onCollectionClick}
          columnCount={2}
        />
        <GridCollectionCardList
          collections={collections.slice(2, 5)}
          onClick={onCollectionClick}
          columnCount={3}
        />
      </div>
    </div>
  );
}

export interface RequestMemoListProps {
  memos: CollectionData[];
  onMemoClick(data: CollectionData): Promise<void>;
  isRequesting: boolean;
}

export function RequestMemoList(props: RequestMemoListProps) {
  const { memos, onMemoClick, isRequesting } = props;
  const slicedMemo = memos.slice(0, 4);
  return (
    <div className={memoStyle.request_container}>
      <Header
        title={isRequesting ? "내가 요청한 메모" : "요청 받은 메모"}
        subMenuType={"requestMemo"}
      />
      <div className={memoStyle.memo_list_container}>
        <Grid container>
          {slicedMemo.map((item) => {
            return (
              <div className={memoStyle.list_item_container}>
                <MemoCard
                  key={item.key}
                  data={item}
                  viewType={"LIST"}
                  onClick={onMemoClick}
                />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export interface TempMemoListProps {
  memos: CollectionData[];
  onMemoClick(data: CollectionData): Promise<void>;
}

export function TempMemoList(props: TempMemoListProps) {
  const { memos, onMemoClick } = props;
  return (
    <div className={memoStyle.temp_container}>
      <Header title={"임시 저장중인 메모"} subMenuType={"goToAll"} />
      <div className={memoStyle.memo_list_container}>
        <Grid container>
          <CarouselList showItems={3}>
            {memos.map((item) => {
              return (
                <div className={memoStyle.list_item_container}>
                  <MemoCard
                    key={item.key}
                    data={item}
                    viewType={"TEMP"}
                    onClick={onMemoClick}
                  />
                </div>
              );
            })}
          </CarouselList>
        </Grid>
      </div>
    </div>
  );
}
