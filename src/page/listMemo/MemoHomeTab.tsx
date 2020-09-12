import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import MemoCard from "../../components/memo/list/memoCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import memoStyle from "./MemoHomeTab.module.scss";

export interface MemoHomeTabProps {}

export default function MemoHomeTab(props: MemoHomeTabProps) {
  const collection1 = {
    id: 0,
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection2 = {
    id: 2,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection3 = {
    id: 3,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection4 = {
    id: 4,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection5 = {
    id: 5,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const testCollections = [
    collection1,
    collection2,
    collection1,
    collection2,
    collection1,
    collection2,
  ];

  const history = useHistory();
  const onCollectionClick = (data: CollectionData) => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //컬렉션에 포함된 메모를 확인하는 페이지로 이동
    history.push(path);
  };
  const onMemoClick = () => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //메모로 이동
    //history.push(path);
  };

  return (
    <div>
      {/* <CollectionTab /> */}
      <div className={memoStyle.create_memo_container}>
        <div className={memoStyle.drag_drop_container}></div>
      </div>
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
    <Card>
      <div className={memoStyle.header_container}>
        <div className={memoStyle.text}>컬렉션에 포함된 메모 모아보기</div>
        <div className={memoStyle.sort_menu}>
          <p>전체보기</p>
        </div>
      </div>
      <div className={memoStyle.divider} />
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
    </Card>
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
    <div className={memoStyle.requesting_memo_container}>
      <div className={memoStyle.header_container}>
        <div className={memoStyle.text}>
          {isRequesting ? "내가 요청한 메모" : "요청 받은 메모"}
        </div>
        <div className={memoStyle.sort_menu}>
          <p>전체보기</p>
        </div>
      </div>
      <div className={memoStyle.divider} />
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
  );
}
