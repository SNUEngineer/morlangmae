import React from "react";
import CollectionViewPage from "./CollectionViewPage";
export default { title: "collection view" };

export function basic() {
  const collection = {
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

  console.log("basic ");
  const block = {
    type: "a",
    content: "block block block",
  };

  const platter = {
    id: 0,
    status: "asdf",
    createdDate: 0,
    blocks: [block, block, block, block],
    createdBy: 0,
  };

  const messageSender = {
    id: 0,
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
  };

  const message = {
    content: "message message message",
    sentAt: 0,
    sender: messageSender,
  };

  const thread = {
    id: 0,
    messages: [message, message, message],
  };

  return (
    <CollectionViewPage
      hiddenToolbar={false}
      {...collection}
      createPlatter={() => {}}
      platters={[platter]}
    />
  );
}
