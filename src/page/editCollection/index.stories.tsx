import React from "react";
import EditCollectionPage from "./EditCollectionPage";
import editStyle from "./editCollectionPage.module.scss";
import CreateCollectionTab from "../listCollection/CreateCollectionTab";
import CollectionTab from "../listCollection/CollectionTab";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
export default { title: "edit colleciton" };

export function basic() {
  const collectionDetail = {
    id: 0,
    collectionType: "프로젝트",
    serviceType: "IT 컨설팅",
    imageUrl: null,
    title: "나이키 IT 컨설팅",
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
  ];

  // return (
  //   <div className={editStyle.test_window}>
  //     <div className={editStyle.test_dialog}>
  //       <EditCollectionPage
  //         collectionDetail={collectionDetail}
  //         users={[user1, user2]}
  //         uploadImage={() => {}}
  //         editCollection={() => {}}
  //       />
  //     </div>
  //     <div className={editStyle.background_content}>
  //       <BasicMenuBar>
  //         <CollectionTab />
  //         <CreateCollectionTab collections={testCollections} />
  //       </BasicMenuBar>
  //     </div>
  //   </div>
  // );
  return (
    <EditCollectionPage
      collectionDetail={collectionDetail}
      users={[user1, user2]}
      uploadImage={() => {}}
      editCollection={() => {}}
    />
  );
}
