import React from "react";
import { useAsync } from "react-async";
import { getPlatter, editPlatter } from "../../services/platter.service";
import { getThread, sendMessage } from "../../services/thread.service";
import EditPlatterPage from "./EditPlatterPage";
import { getCollection } from "../../services/collection.service";

export interface EditPlatterPageContainerProps {
  platterId: number;
}

async function getData({ platterId }: any) {
  const data = await Promise.all([getPlatter(platterId), getThread(platterId)]);
  const collection = await getCollection(data[0].collectionId);

  return {
    platter: data[0],
    thread: data[1],
    members: collection.members,
  };
}

export default function EditPlatterPageContainer(
  props: EditPlatterPageContainerProps
) {
  const { data } = useAsync({
    promiseFn: getData,
    platterId: props.platterId,
  });
  const loadMessages = async () => {
    const thread = await getThread(props.platterId);
    return thread.messages;
  };
  const writeMessage = async (message: any) => {
    await sendMessage(props.platterId, message);
  };
  const doEditPlatter = async (data: any) => {
    await editPlatter(props.platterId, data);
  };

  if (data) {
    return (
      <EditPlatterPage
        editPlatter={doEditPlatter}
        collectionMembers={data.members}
        platter={data.platter}
        messages={data.thread.messages}
        sendMessage={writeMessage}
        loadMessages={loadMessages}
      />
    );
  }

  return null;
}
