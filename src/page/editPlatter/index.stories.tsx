// @ts-nocheck
import React from "react";
import EditPlatterPage from "./EditPlatterPage";
import Scroll from "./Scroll";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";

export default { title: "edit platter" };

export function basic() {
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
    <EditPlatterPage
      platter={platter}
      sendMessage={() => {}}
      loadMessages={() => {}}
      editPlatter={() => {}}
      collectionMembers={testMembers}
      messages={thread.messages}
    />
  );
}

export function scroller() {
  return <Scroll />;
}

export function basicMenuBar() {
  return <BasicMenuBar />;
}
