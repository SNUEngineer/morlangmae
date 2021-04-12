// @ts-nocheck
import React, { useState } from "react";

import collectionStyle from "./CollectionLayout.module.scss";

export default function BasicMenuBar(props: any) {
  return (
    <div className={menuStyle.container}>
      <div className={menuStyle.top_container}></div>
      <div className={menuStyle.bottom_container}>
        <div className={menuStyle.side_container}>aaa</div>
        <div className={menuStyle.content_container}>{props.children}</div>
      </div>
    </div>
  );
}
