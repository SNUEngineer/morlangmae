// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import Grid from "@material-ui/core/Grid";
import { unpinCollection } from "../../services/collection.service";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import collectionStyle from "./CollectionListPage.module.scss";
import Header from "../../components/layout/Header/Header";

// import Slider from "../../components/customizedComponent/Carousel";

export interface CollectionListPageProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
  collectionSortType: string;
}

export default function CollectionListPage(props: CollectionListPageProps) {
  const {
    collections,
    onCollectionClick,
    pinCollection,
    collectionSortType,
  } = props;

  return (
    <div className={collectionStyle.tab_container}>
      {/* <CollectionTab /> */}

      {/* <div className={collectionStyle.member_header_margin}>
        <div className={collectionStyle.divider} />
      </div> */}
      <CollectionCardList
        // myCollections={myCollections}
        myCollections={collections}
        onCollectionClick={onCollectionClick}
        pinCollection={pinCollection}
        unpinCollection={unpinCollection}
      />
    </div>
  );
}

export interface CollectionCardListProps {
  myCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}

export function CollectionCardList(props: CollectionCardListProps) {
  const myCollections = props.myCollections;
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
  const filteredCollections = myCollections.filter((data: CollectionData) => {
    return filter === "ALL" || data.status.toString() === filter;
  });
  let columnList = [];
  let collectionsGrid = [];
  let index = 0;
  const columnCount = 3; // 반응에 따라 4개 이상으로 늘어날 경우 자동으로 배열.
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
        <div className={collectionStyle.my_collection_list_container}>
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

  const headerSorted = () => {
    // const collectionSortType = props.collectionSortType;
    const collectionSortType = "COMPANY";
    const title = (type) => {
      switch (type) {
        case "MY":
          return "나의 컬렉션 리스트";
        case "COMPANY":
          return "회사 아카이브";
        case "RECENT":
          return "최근 조회한 컬렉션";
        case "HOT":
          return "이번달 인기있는 컬렉션";
        case "OFTEN":
          return "자주 조회한 컬렉션";
        case "FOR_USER":
          return "ㅇㅇㅇ님을 위한 컬렉션";
        case "BINGE":
          return "모아보기";
      }
    };

    return (
      <Header
        title={title(collectionSortType)}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
    );
  };

  return (
    <div className={collectionStyle.collection_container}>
      {headerSorted()}

      <div className={collectionStyle.collection_list_container}>
        <Grid container>{collectionCards}</Grid>
      </div>
    </div>
  );
}
