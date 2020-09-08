import React from "react";
import CollectionPage from "./CollectionPage";
export default { title: "collection page" };

export function basic() {
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
    id: 0,
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
