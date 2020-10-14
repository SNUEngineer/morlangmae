import React from "react";
import MemoHomeTab from "./MemoHomeTab";
import MemoListTab from "./MemoListTab";
import BingeMemoTab from "./BingeMemoTab";
import MemoListInCollection from "./MemoListInCollection";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
import MemoTab from "./MemoTab";

export default { title: "memo page" };

export function memoHomeTab() {
  return (
    <BasicMenuBar>
      <MemoTab />
      <MemoHomeTab />
    </BasicMenuBar>
  );
}
export function memoListTab() {
  return (
    <BasicMenuBar>
      <MemoTab />
      <MemoListTab />
    </BasicMenuBar>
  );
}
export function bingeMemoTab() {
  return (
    <BasicMenuBar>
      <MemoTab />
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
