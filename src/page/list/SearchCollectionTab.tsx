// @ts-nocheck
import React, { useCallback } from "react";
import CollectionTab from "./CollectionTab";

import CarouselList from "../../components/customizedComponent/Carousel/CarouselList";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import CollectionCard, {
  CollectionData,
  CollectionCardFunctions,
} from "../../components/task/TaskCard";
import { GridCollectionCardList } from "../../components/task/GridCollectionCardList";
import collectionStyle from "./myCollectionTab.module.scss";
import Header from "../../components/layout/Header/Header";
import Button from "@material-ui/core/Button";

export interface SearchCollectionTabProps {
  serviceCollections: CollectionData[];
  hotCollections: CollectionData[]; //가장 많이 조회된 컬렉션
  recentlyViewedCollections: CollectionData[];
  companyCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
  viewAllCompanyCollection(): Promise<void>; //회사에 저장된 모든 컬렉션 목록으로 이동
}

export default function SearchCollectionTab(props: SearchCollectionTabProps) {
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
  ];

  const functions = {
    onClick: props.onCollectionClick,
    pinCollection: props.pinCollection,
    unpinCollection: props.unpinCollection,
  };

  return (
    <div className={collectionStyle.tab_container}>
      <ForUserCollectionCardList
        usersCollections={props.serviceCollections}
        {...functions}
      />
      <OftenFoundCollectionCardList
        oftenCollections={testCollections} //backend에서 아직 제작되지 않은 분류 기준
        {...functions}
      />
      <PopularCollectionCardList
        popularCollections={props.hotCollections}
        {...functions}
      />
      <RecentCollectionCardList
        recentCollections={props.recentlyViewedCollections}
        {...functions}
      />
      <CompanyCollectionCardList
        companyCollections={props.companyCollections}
        {...functions}
      />
    </div>
  );
}

export interface ForUserCollectionCardListProps
  extends CollectionCardFunctions {
  usersCollections: CollectionData[];
}

export function ForUserCollectionCardList(
  props: ForUserCollectionCardListProps
) {
  const usersCollections = useCallback(() => {
    let collections = props.usersCollections;
    while (collections.length < 4) {
      //carousel 최소 기준인 4개가 안될 경우 빈칸으로 채워서 ui가 무너지지않게 방지
      collections = collections.concat(null);
    }
    return collections;
  }, [props.usersCollections]);

  return (
    <div>
      <Header title={"김기연님을 위한 컬렉션"} subMenuType={"none"} />
      <div className={collectionStyle.collection_list_container}>
        <Grid container>
          {props.usersCollections.length > 0 && (
            <CarouselList showItems={3.15}>
              {/* 한번에 3.15만큼의 item을 보여줌. (다음 item 약간 노출) */}
              {usersCollections().map((item, index) => {
                return (
                  <div className={collectionStyle.for_user_list_item_container}>
                    <CollectionCard
                      // key={item.key}
                      key={index}
                      data={item}
                      viewType={"CAROUSEL"}
                      // 세개 짜리 카로셀을 위한 맞춤 layout.
                      onClick={props.onClick}
                      pinCollection={props.pinCollection}
                      unpinCollection={props.unpinCollection}
                    />
                  </div>
                );
              })}
            </CarouselList>
          )}
        </Grid>
      </div>
    </div>
  );
}

export interface OftenFoundCollectionCardListProps
  extends CollectionCardFunctions {
  oftenCollections: CollectionData[];
}

export function OftenFoundCollectionCardList(
  props: OftenFoundCollectionCardListProps
) {
  const oftenCollections = useCallback(() => {
    let collections = props.oftenCollections;
    while (collections.length < 4) {
      collections = collections.concat(null);
    }
    return collections;
  }, [props.oftenCollections]);

  return (
    <div className={collectionStyle.often_collection_container}>
      <Header title={"즐겨찾는 컬렉션"} subMenuType={"none"} />

      <div className={collectionStyle.collection_list_container}>
        <Grid container>
          {props.oftenCollections.length > 0 && (
            <CarouselList showItems={2.15} slideItems={2}>
              {oftenCollections().map((item, index) => {
                return (
                  <div
                    className={collectionStyle.often_found_list_item_container}
                  >
                    <CollectionCard
                      key={index}
                      data={item}
                      viewType={"CAROUSEL_TWO"}
                      // 두개 짜리 카로셀을 위한 맞춤 layout.
                      onClick={props.onClick}
                      pinCollection={props.pinCollection}
                      unpinCollection={props.unpinCollection}
                    />
                  </div>
                );
              })}
            </CarouselList>
          )}
        </Grid>
      </div>
    </div>
  );
}

export interface PopularCollectionCardListProps
  extends CollectionCardFunctions {
  popularCollections: CollectionData[];
}

export function PopularCollectionCardList(
  props: PopularCollectionCardListProps
) {
  const popularCollections = useCallback(() => {
    let collections = props.popularCollections;
    while (collections.length < 4) {
      collections = collections.concat(null);
    }
    return collections;
  }, [props.popularCollections]);
  return (
    <div className={collectionStyle.popular_collection_container}>
      <Header title={"이번달 인기있는 컬렉션"} subMenuType={"none"} />

      <div className={collectionStyle.collection_list_container}>
        <Grid container>
          {props.popularCollections.length > 0 && (
            <CarouselList showItems={3.15}>
              {popularCollections().map((item, index) => {
                return (
                  <div
                    className={collectionStyle.often_found_list_item_container}
                  >
                    <CollectionCard
                      key={index}
                      data={item}
                      viewType={"CAROUSEL"}
                      // 세개 짜리 카로셀을 위한 맞춤 layout.
                      onClick={props.onClick}
                      pinCollection={props.pinCollection}
                      unpinCollection={props.unpinCollection}
                    />
                  </div>
                );
              })}
            </CarouselList>
          )}
        </Grid>
      </div>
    </div>
  );
}

export interface RecentCollectionCardListProps extends CollectionCardFunctions {
  recentCollections: CollectionData[];
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
    .slice(0, 4) //가장 최근 방문한 컬렉션 4개만 노출
    .map((collections: CollectionData[], index) => {
      return (
        <div className={collectionStyle.my_collection_list_container}>
          <GridCollectionCardList
            key={index}
            collections={collections}
            onClick={props.onClick}
            pinCollection={props.pinCollection}
            unpinCollection={props.unpinCollection}
            viewType={"SMALL_LIST"}
            columnCount={columnCount}
          />
        </div>
      );
    });

  return (
    <div className={collectionStyle.recent_collection_container}>
      <Header title={"최근 조회한 컬렉션"} subMenuType={"none"} />
      <div className={collectionStyle.collection_list_container}>
        <Grid container>{recentCollectionCards}</Grid>
      </div>
    </div>
  );
}

export interface CompanyCollectionCardListProps
  extends CollectionCardFunctions {
  companyCollections: CollectionData[];
  viewAllCompanyCollection(): Promise<void>;
}

export function CompanyCollectionCardList(
  props: CompanyCollectionCardListProps
) {
  const companyCollections = props.companyCollections.slice(0, 8);

  return (
    <div className={collectionStyle.company_collection_container}>
      <Header
        title={"회사 아카이브"}
        subMenuType={"goToAll"}
        type={"COMPANY"}
      />

      <div className={collectionStyle.collection_list_container}>
        <GridCollectionCardList
          collections={companyCollections.slice(0, 2)}
          onClick={props.onClick}
          pinCollection={props.pinCollection}
          unpinCollection={props.unpinCollection}
          columnCount={2}
        />
        <GridCollectionCardList
          collections={companyCollections.slice(2, 5)}
          onClick={props.onClick}
          pinCollection={props.pinCollection}
          unpinCollection={props.unpinCollection}
          columnCount={3}
        />
        <GridCollectionCardList
          collections={companyCollections.slice(5, 8)}
          onClick={props.onClick}
          pinCollection={props.pinCollection}
          unpinCollection={props.unpinCollection}
          columnCount={3}
        />
      </div>

      <div className={collectionStyle.go_to_all_company}>
        <div className={collectionStyle.align_container}>
          <div className={collectionStyle.text}>회사내 컬렉션 더보기 </div>

          <div className={collectionStyle.icon_container}>
            <img className={collectionStyle.icon} alt={"icon"} />
          </div>
        </div>
      </div>
      <Button onClick={props.viewAllCompanyCollection}>전체보기</Button>
    </div>
  );
}
