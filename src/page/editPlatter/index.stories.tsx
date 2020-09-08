import React from "react";
import EditPlatterPage from "./EditPlatterPage";
export default { title: "edit platter" };

export function basic() {
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
    <EditPlatterPage
      {...platter}
      {...thread}
      sendMessage={() => {}}
      loadMessages={() => {}}
    />
  );
}
