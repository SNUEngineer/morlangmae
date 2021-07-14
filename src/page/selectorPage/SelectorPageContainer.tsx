// @ts-nocheck
import React, { useCallback } from "react";
import { useAsync } from "react-async";
import { createPlatter } from "../../services/platter.service";
import CreatePlatterPage from "./CreatePlatterPage";
import { getCollection } from "../../services/task.service";
import SelectorPage from "./SelectorPage";
import { SelectorData } from "../../services/selector.service";

export interface SelectorPageContainerProps {
  selectorId: number | "CREATING";
  // reload;
  progress: "CREATING" | "EDITING" | "VIEWING" | "TASKING";
  clickOptionMenu(optionId: number): void;
  deleteOption(optionId: number): void;
  clickOptionNext(isOpen: bool, optionId: number): void;
}

const getData = async (request) => {
  let data: any;
  console.log("dfsdfsdfsdfsfsfs??");
  // data = await getPlatter(request.id);
  const block = { type: "TEXT", content: "testestest" };
  const blocks = [block, block];

  const op1 = {
    id: 1,
    title: "test title111",
    blocks: blocks,
  };
  const op2 = {
    id: 2,
    title: "test title222",
    blocks: blocks,
  };
  data = {
    id: 1,
    title: "test title",
    blocks: blocks,
    optionsData: [op1, op2],
  };
  console.log("asdf??ddd? " + JSON.stringify(data));
  return data;
};

export default function SelectorPageContainer(
  props: SelectorPageContainerProps
) {
  const { clickOptionMenu, deleteOption, clickOptionNext } = props;
  const { selectorId, progress } = props;
  const { data, error, isLoading } = useAsync({
    promiseFn: getData,
    selectorId: selectorId,
  });

  const clickBackward = async () => {
    console.log("click backward");
  };
  const clickForward = async () => {
    console.log("clickForward");
  };
  const changeTitle = async (title: string) => {
    console.log("change title to " + title);
  };

  const disableEditing = useCallback(() => {
    switch (progress) {
      case "CREATING":
      case "EDITING":
        return false;
      case "VIEWING":
      case "TASKING":
        return true;
    }
  }, [progress]);

  if (data) {
    return (
      <SelectorPage
        id={selectorId}
        progress={progress}
        disableEditing={disableEditing()}
        changeTitle={changeTitle}
        clickForward={clickForward}
        clickBackward={clickBackward}
        clickOptionMenu={clickOptionMenu}
        deleteOption={deleteOption}
        clickOptionNext={clickOptionNext}
        data={data}
      />
    );
  }
  // if (isLoading) return <div>로딩중.....</div>;
  // if (error) return <div>에러가 발생했습니다</div>;
  return <div>로딩</div>; // 로딩 페이지
}
