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
import memoStyle from "./bingeMemoTab.module.scss";

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
    collection2,
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
      <BingeMemoInCollectionCardList
        collections={testCollections}
        onCollectionClick={onCollectionClick}
      />
    </div>
  );
}

export interface BingeMemoInCollectionCardListProps {
  myCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function BingeMemoInCollectionCardList(
  props: BingeMemoInCollectionCardListProps
) {
  const collections = props.collections;
  const [filter, setFilter] = useState<string>("ALL");
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
        <div className={memoStyle.my_collection_list_container}>
          <GridCollectionCardList
            key={index}
            collections={collections}
            onClick={props.onCollectionClick}
            columnCount={columnCount}
          />
        </div>
      );
    }
  );

  return (
    <Card>
      <div className={memoStyle.header_container}>
        <div className={memoStyle.text}>나의 컬렉션 리스트</div>
        <div className={memoStyle.sort_menu}>
          <Select value={filter} onChange={handleChange}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="IN_PROGRESS">진행</MenuItem>
            <MenuItem value="DONE">완료</MenuItem>
          </Select>
        </div>
      </div>
      <Divider />
      <Grid container>{collectionCards}</Grid>
    </Card>
  );
}
