// @ts-nocheck
import React from "react";
import TaskPage from "./TaskPage";
import ListPage from "./ListPage";

import Thread, { ThreadProps } from "../../components/thread/Thread";
export default { title: "task page" };

export function TaskRoom() {
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

export function ListTab() {
  const task1 = {
    id: 0,
    title: "3분기 마케팅 전략",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x6001.jpgafaf",
    taskType: "team",
    serviceType: "마케팅",
    createdDate: "8월 10일",
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const task2 = {
    id: 2,
    title: "플랜비 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    taskType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const task3 = {
    id: 3,
    title: "SW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    taskType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const task4 = {
    id: 4,
    title: "KW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    taskType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const task5 = {
    id: 5,
    title: "프로케어 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpgafaf",
    taskType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const testTasks = [task1, task2, task3, task4, task5, task2];
  const onTaskClick = async (data: TaskData) => {};
  const reload = async (data: TaskData) => {};
  const pinTask = async (data: TaskData) => {};
  const unpinTask = async (data: TaskData) => {};

  return (
    <ListPage
      tasks={testTasks}
      onTaskClick={onTaskClick}
      pinTask={pinTask}
      unpinTask={unpinTask}
      reloadData={reload}
    />
  );
}
