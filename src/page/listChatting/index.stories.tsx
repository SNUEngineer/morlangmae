// @ts-nocheck
import React from "react";
import ChattingPage from "./ChattingPage";
import ChattingListPage from "./ChattingListPage";

import Thread, { ThreadProps } from "../../components/thread/Thread";
export default { title: "chatting page" };

export function ChattingRoom() {
  const messageSender = {
    id: 0,
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
  };

  const message = {
    content: "message message message ㅇㅇㅇ",
    sentAt: "오후 3:12",
    sender: messageSender,
  };

  const thread = {
    id: 0,
    messages: [message, message, message],
  };
  const testMember1 = {
    id: 0,
    displayName: "송병근",
  };
  const testMember2 = {
    id: 1,
    displayName: "송상근",
  };
  const testMembers = [testMember1, testMember2];
  return (
    // <EditPlatterPage
    //   platter={platter}
    //   sendMessage={() => {}}
    //   loadMessages={() => {}}
    //   editPlatter={() => {}}
    //   collectionMembers={testMembers}
    //   messages={thread.messages}
    // />
    <Thread
      messages={thread.messages}
      sendMessage={() => {}}
      loadMessages={() => {}}
    />
  );
}

// export function basic() {
//   const chatting1 = {
//     id: 0,
//     title: "첫번째 컬렉션",
//     status: "good",
//     imageUrl:
//       "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
//     chattingType: "team",
//     serviceType: "개발 테스트",
//     createdDate: "8월 10일",
//     startDate: "9월 6일",
//     endDate: new Date(),
//   };
//   const chatting2 = {
//     id: 0,
//     title: "두번째 컬렉션",
//     status: "good",
//     imageUrl:
//       "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
//     chattingType: "team",
//     serviceType: "개발 테스트222",
//     createdDate: 0,
//     startDate: 0,
//     endDate: 0,
//   };

//   const chattingList = [chatting1, chatting2];

//   return (
//     <ChattingPage
//       chattingId={0}
//       platterId={0}
//       myChattingTabPrpos={{ chattings: chattingList }}
//       searchChattingTabProps={{ companyChattings: chattingList }}
//       createChattingTabProps={{ chattings: chattingList }}
//     />
//   );
// }

export function ChattingListTab() {
  const chatting1 = {
    id: 0,
    title: "3분기 마케팅 전략",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x6001.jpgafaf",
    chattingType: "team",
    serviceType: "마케팅",
    createdDate: "8월 10일",
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const chatting2 = {
    id: 2,
    title: "플랜비 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    chattingType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const chatting3 = {
    id: 3,
    title: "SW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    chattingType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const chatting4 = {
    id: 4,
    title: "KW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    chattingType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const chatting5 = {
    id: 5,
    title: "프로케어 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    chattingType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const testChattings = [
    chatting1,
    chatting2,
    chatting3,
    chatting4,
    chatting5,
    chatting2,
  ];
  const onChattingClick = async (data: ChattingData) => {};
  const reload = async (data: ChattingData) => {};
  const pinChatting = async (data: ChattingData) => {};
  const unpinChatting = async (data: ChattingData) => {};

  return (
    <ChattingListPage
      chattings={testChattings}
      onChattingClick={onChattingClick}
      pinChatting={pinChatting}
      unpinChatting={unpinChatting}
      reloadData={reload}
    />
  );
}
