import React from "react";
import CollectionCardList from "../../components/collection/CollectionCardList";
import CollectionTab from "./CollectionTab";
import collectionStyle from "./myCollectionTab.module.scss";
import CarouselList from "../../components/customizedComponent/Carousel/CarouselList";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
export interface SearchCollectionTabProps {
  // attendedCollections: CollectionListProps;
  // recentSearchedCollections: CollectionListProps;
  // recommendedArchivedCollections: CollectionListProps;
  companyCollections: CollectionCardProps[];
}

export default function SearchCollectionTab(props: SearchCollectionTabProps) {
  const collection1 = {
    id: 0,
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트",
    createdDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
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
    collection3,
    collection4,
    collection5,
    collection1,
    collection2,
    collection3,
    collection4,
    collection5,
  ];
  const onCollectionClick = (data: CollectionData) => {};

  return (
    <div>
      {/* <CollectionTab /> */}
      <ForUserCollectionCardList
        helpfulCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <OftenFoundCollectionCardList
        oftenCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <PopularCollectionCardList
        popularCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <RecentCollectionCardList
        recentCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <CompanyCollectionCardList
        companyCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
    </div>
  );
}

export interface ForUserCollectionCardListProps {
  helpfulCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function ForUserCollectionCardList(
  props: ForUserCollectionCardListProps
) {
  const helpfulCollections = props.helpfulCollections;

  return (
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>김기연님을 위한 컬렉션</div>
      </div>
      <Divider />
      <Grid container>
        <CarouselList showItems={3.1}>
          {helpfulCollections.map((item) => {
            return (
              <div className={collectionStyle.helpful_list_item_container}>
                <CollectionCard
                  key={item.key}
                  data={item}
                  viewType={"WIDE"}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </CarouselList>
      </Grid>
    </div>
  );
}

export interface OftenFoundCollectionCardListProps {
  oftenCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function OftenFoundCollectionCardList(
  props: OftenFoundCollectionCardListProps
) {
  const oftenCollections = props.oftenCollections;

  return (
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>즐겨 찾는 컬렉션</div>
      </div>
      <Divider />
      <Grid container>
        <CarouselList showItems={3.1}>
          {oftenCollections.map((item) => {
            return (
              <div className={collectionStyle.often_found_list_item_container}>
                <CollectionCard
                  key={item.key}
                  data={item}
                  viewType={"WIDE"}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </CarouselList>
      </Grid>
    </div>
  );
}

export interface PopularCollectionCardListProps {
  popularCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function PopularCollectionCardList(
  props: PopularCollectionCardListProps
) {
  const popularCollections = props.popularCollections;

  return (
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>이번 달 인기있는 컬렉션</div>
      </div>
      <Divider />
      <Grid container>
        <CarouselList showItems={3.1}>
          {popularCollections.map((item) => {
            return (
              <div className={collectionStyle.often_found_list_item_container}>
                <CollectionCard
                  key={item.key}
                  data={item}
                  viewType={"WIDE"}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </CarouselList>
      </Grid>
    </div>
  );
}

export interface RecentCollectionCardListProps {
  recentCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function RecentCollectionCardList(props: RecentCollectionCardListProps) {
  const recentCollections = props.recentCollections;
  const filteredCollections = recentCollections;

  let columnList = [];
  let recentCollectionsGrid = [];
  const columnCount = 2; // 반응에 따라 4개 이상으로 늘어날 경우 자동으로 배열.
  filteredCollections.forEach((element) => {
    columnList.push(element);
    if (columnList.length >= columnCount) {
      recentCollectionsGrid.push(columnList);
      columnList = [];
    }
  });
  const recentCollectionCards = recentCollectionsGrid
    .slice(0, 4)
    .map((collections: CollectionData[], index) => {
      return (
        <div className={collectionStyle.my_collection_list_container}>
          <GridCollectionCardList
            key={index}
            collections={collections}
            onClick={props.onCollectionClick}
            viewType={"SMALL_LIST"}
            columnCount={columnCount}
          />
        </div>
      );
    });

  return (
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>최근 조회한 컬렉션</div>
      </div>
      <Divider />
      <Grid container>{recentCollectionCards}</Grid>
    </div>
  );
}

export interface CompanyCollectionCardListProps {
  companyCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function CompanyCollectionCardList(
  props: CompanyCollectionCardListProps
) {
  const companyCollections = props.companyCollections.slice(0, 8);

  return (
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>회사 아카이브</div>
        <div className={collectionStyle.sort_menu}>
          <p>전체보기</p>
        </div>
      </div>
      <div className={collectionStyle.divider} />
      <GridCollectionCardList
        collections={companyCollections.slice(0, 2)}
        onClick={props.onCollectionClick}
        columnCount={2}
      />
      <GridCollectionCardList
        collections={companyCollections.slice(2, 5)}
        onClick={props.onCollectionClick}
        columnCount={3}
      />
      <GridCollectionCardList
        collections={companyCollections.slice(5, 8)}
        onClick={props.onCollectionClick}
        columnCount={3}
      />

      <div className={collectionStyle.go_to_all_company}>
        <p>회사내 컬렉션 더보기 {">"}</p>
      </div>
    </div>
  );
}
