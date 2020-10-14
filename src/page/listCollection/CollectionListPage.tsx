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
  const collection1 = {
    id: 0,
    title: "3분기 마케팅 전략",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x6001.jpgafaf",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
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
    collection1,
    collection2,
    collection3,
    collection4,
    collection5,
    collection2,
    collection1,
    collection2,
    collection3,
    collection4,
    collection5,
    collection2,
  ];
  const history = useHistory();
  return (
    <div className={collectionStyle.tab_container}>
      {/* <CollectionTab /> */}

      {/* <div className={collectionStyle.member_header_margin}>
        <div className={collectionStyle.divider} />
      </div> */}
      <CollectionCardList
        // myCollections={myCollections}
        myCollections={testCollections}
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
    switch (collectionSortType) {
      case "MY":
        return (
          <Header
            title={"나의 컬렉션 리스트"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );
      case "COMPANY":
        return (
          <Header
            title={"회사 아카이브"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );

      case "RECENT":
        return (
          <Header
            title={"최근 조회한 컬렉션"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );

      case "HOT":
        return (
          <Header
            title={"이번달 인기있는 컬렉션"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );

      case "OFTEN":
        return (
          <Header
            title={"즐겨찾는 컬렉션"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );
      case "FORUSER":
        return (
          <Header
            title={"김기연님을 위한 컬렉션"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );
      case "BINGE":
        return (
          <Header
            title={"모아보기"}
            handleChange={handleChange}
            filter={filter}
            subMenuType={"filter"}
          />
        );
    }
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
