import React from "react";
import CreateCollectionPage from "./CreateCollectionPage";
export default { title: "CreateCollectionPage" };

export function basic() {
  const serviceTypes = ["서비스", "뉴스", "블로그"];

  return <CreateCollectionPage serviceTypes={serviceTypes} />;
}
