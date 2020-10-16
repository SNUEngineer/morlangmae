// @ts-nocheck
import React from "react";
import CreateCollectionPage from "./CreateCollectionPage";
import StartCreateCollectionPage from "./StartCreateCollectionPage";
import CreatingCollectionPage from "./CreatingCollectionPage";

export default { title: "CreateCollectionPage" };

export function basic() {
  const serviceTypes = ["서비스", "뉴스", "블로그"];

  return <CreateCollectionPage serviceTypes={serviceTypes} />;
}
export function start() {
  const serviceTypes = ["서비스", "뉴스", "블로그"];

  return <StartCreateCollectionPage serviceTypes={serviceTypes} />;
}
export function finish() {
  const serviceTypes = ["서비스", "뉴스", "블로그"];

  return <CreatingCollectionPage serviceTypes={serviceTypes} />;
}
