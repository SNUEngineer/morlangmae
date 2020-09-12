import React from "react";
import MemoHomeTab from "./MemoHomeTab";
import MemoListTab from "./MemoListTab";
import BingeMemoTab from "./BingeMemoTab";

export default { title: "memo page" };

export function memoHomeTab() {
  return <MemoHomeTab />;
}
export function memoListTab() {
  return <MemoListTab />;
}
export function bingeMemoTab() {
  return <BingeMemoTab />;
}
