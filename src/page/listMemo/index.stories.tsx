import React from "react";
import MemoHomeTab from "./MemoHomeTab";
import MemoListTab from "./MemoListTab";
import BingeMemoTab from "./BingeMemoTab";
import MemoListInCollection from "./MemoListInCollection";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
import CollectionTab from "../listCollection/CollectionTab";

export default { title: "memo page" };

export function memoHomeTab() {
  return (
    <BasicMenuBar>
      <CollectionTab />
      <MemoHomeTab />
    </BasicMenuBar>
  );
}
export function memoListTab() {
  return (
    <BasicMenuBar>
      <CollectionTab />
      <MemoListTab />
    </BasicMenuBar>
  );
}
export function bingeMemoTab() {
  return (
    <BasicMenuBar>
      <CollectionTab />
      <BingeMemoTab />
    </BasicMenuBar>
  );
}

export function memoListInCollection() {
  return (
    <BasicMenuBar>
      <MemoListInCollection />
    </BasicMenuBar>
  );
}
