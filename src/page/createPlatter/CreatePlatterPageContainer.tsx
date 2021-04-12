// @ts-nocheck
import React from "react";
import { useAsync } from "react-async";
import { createPlatter } from "../../services/platter.service";
import CreatePlatterPage from "./CreatePlatterPage";
import { getCollection } from "../../services/chatting.service";

export interface CreatePlatterPageContainerProps {
  collectionId: number;
  reload;
}

async function getData({ collectionId }: any) {
  const data = await getCollection(collectionId);
  return data.members;
}

export default function CreatePlatterPageContainer(
  props: CreatePlatterPageContainerProps
) {
  const { data } = useAsync({
    promiseFn: getData,
    collectionId: props.collectionId,
  });
  const doCreatePlatter = async (data: any) => {
    const id = await createPlatter(props.collectionId, data);
    await props.reload();
    return id;
  };

  if (data) {
    return (
      <CreatePlatterPage
        collectionMembers={data}
        createPlatter={doCreatePlatter}
      />
    );
  }

  return null;
}
