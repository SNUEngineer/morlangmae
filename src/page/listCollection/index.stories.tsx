import React from "react";
import CollectionPage from "./CollectionPage";
import CollectionTab from "./CollectionTab";
import MyCollectionTab from "./MyCollectionTab";
import CreateCollectionTab from "./CreateCollectionTab";
import SearchCollectionTab from "./SearchCollectionTab";

import PinnedCollectionCardList from "./PinnedCollectionCardList";
import createStyle from "./createCollectionTab.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselList from "../../components/customizedComponent/Carousel/CarouselList";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
export default { title: "collection page" };

export function basic() {
  const collection1 = {
    id: 0,
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "개발 테스트",
    createdDate: "8월 10일",
    startDate: "9월 6일",
    endDate: new Date(),
  };
  const collection2 = {
    id: 0,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };

  const collectionList = [collection1, collection2];

  return (
    <CollectionPage
      collectionId={0}
      platterId={0}
      myCollectionTabPrpos={{ collections: collectionList }}
      searchCollectionTabProps={{ companyCollections: collectionList }}
      createCollectionTabProps={{ collections: collectionList }}
    />
  );
}

export function collectionTab() {
  return <CollectionTab />;
}

export function myCollectionTab() {
  return (
    <BasicMenuBar>
      <CollectionTab />
      <MyCollectionTab />
    </BasicMenuBar>
  );
}

export function createCollectionTab() {
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

  return (
    <BasicMenuBar>
      <CollectionTab />
      <CreateCollectionTab collections={testCollections} />
    </BasicMenuBar>
  );
}
export function searchCollectionTab() {
  return (
    <BasicMenuBar>
      <CollectionTab />
      <SearchCollectionTab />
    </BasicMenuBar>
  );
}

export function carsousle2222() {
  return (
    <CarouselList showItems={3.15}>
      <div className={createStyle.slider_item}>Item 1</div>
      <div className={createStyle.slider_item}>Item 2</div>
      <div className={createStyle.slider_item}>Item 3</div>
      <div className={createStyle.slider_item}>Item 4</div>
    </CarouselList>
  );
}

export function basicMenuBar() {
  return <BasicMenuBar />;
}
