import React from "react";
import EditCollectionPage from "./EditCollectionPage";
export default { title: "edit colleciton" };

export function basic() {
  const collectionDetail = {
    id: 0,
    collectionType: "team",
    serviceType: "service",
    imageUrl: null,
    title: "테스트 타이틀",
    startDate: 0,
    endDate: 0,
    memberIds: [0, 1, 2, 3],
  };

  const user1 = {
    id: 0,
    displayName: "송병근",
    //imageUrl?: string;
    companyId: "cnc",
  };
  const user2 = {
    id: 2,
    displayName: "김기연",
    //imageUrl?: string;
    companyId: "cnc",
  };

  return (
    <EditCollectionPage
      collectionDetail={collectionDetail}
      users={[user1, user2]}
      uploadImage={() => {}}
      editCollection={() => {}}
    />
  );
}
