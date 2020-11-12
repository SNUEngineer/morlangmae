// @ts-nocheck
import React from "react";
import { useAsync } from "react-async";
import {
  getPlatter,
  editPlatter,
  addPlatterCcs,
  removePlatterCcs,
} from "../../services/platter.service";
import { getThread, sendMessage } from "../../services/thread.service";
import EditPlatterPage from "./EditPlatterPage";
import { getCollection } from "../../services/collection.service";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

export interface EditPlatterPageContainerProps {
  platterId: number;
  reload;
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
  const { pathname, search } = useLocation();
  const history = useHistory();
  const onClose = async () => {
    const query = queryString.parse(search);
    query.platterId = undefined;

    history.push({
      pathname: pathname,
      search: queryString.stringify(query),
    });
  };

  const loadMessages = async () => {
    const thread = await getThread(props.platterId);
    return thread.messages;
  };
  const writeMessage = async (message: any) => {
    await sendMessage(props.platterId, message);
  };
  const doEditPlatter = async (data: any) => {
    console.log("send datadatadata " + JSON.stringify(data));
    await editPlatter(props.platterId, data);
    await props.reload();
  };

  const handleAddPlatterCcs = async (memberId: number) => {
    await addPlatterCcs(props.platterId, memberId);
    await props.reload();
  };

  const handleRemovePlatterCcs = async (memberId: number) => {
    await removePlatterCcs(props.platterId, memberId);
    await props.reload();
  };

  if (data) {
    return (
      <EditPlatterPage
        editPlatter={doEditPlatter}
        addCcs={handleAddPlatterCcs}
        removeCcs={handleRemovePlatterCcs}
        collectionMembers={data.members}
        platter={data.platter}
        messages={data.thread.messages}
        sendMessage={writeMessage}
        loadMessages={loadMessages}
        onClose={onClose}
      />
    );
  }

  return null;
}
