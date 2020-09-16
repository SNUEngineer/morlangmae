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
  return <MyCollectionTab />;
}

export function createCollectionTab() {
  const collection1 = {
    id: 0,
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
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
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
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
  ];

  return <CreateCollectionTab collections={testCollections} />;
}
export function searchCollectionTab() {
  return <SearchCollectionTab />;
}

export function carsousle2222() {
  return (
    <CarouselList showItems={3.1}>
      <div className={createStyle.slider_item}>Item 1</div>
      <div className={createStyle.slider_item}>Item 2</div>
      <div className={createStyle.slider_item}>Item 3</div>
      <div className={createStyle.slider_item}>Item 4</div>
    </CarouselList>
  );
}
