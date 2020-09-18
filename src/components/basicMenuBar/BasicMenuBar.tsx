import React, { useState } from "react";

import menuStyle from "./BasicMenuBar.module.scss";

export default function BasicMenuBar(props: any) {
  return (
    <div className={menuStyle.container}>
      <div className={menuStyle.top_container}></div>
      <div className={menuStyle.bottom_container}>
        <div className={menuStyle.side_container}>
          <div className={menuStyle.menu_container}>
            <div className={menuStyle.menu_item}>
              <div className={menuStyle.text}>홈</div>
            </div>
            <div className={menuStyle.menu_item}>
              <div className={menuStyle.text}>컬렉션</div>
            </div>
            <div className={menuStyle.menu_item}>
              <div className={menuStyle.text}>메모</div>
            </div>
            <div className={menuStyle.menu_item}>
              <div className={menuStyle.text}>프로필</div>
            </div>
          </div>
        </div>
        <div className={menuStyle.content_container}>
          <div className={menuStyle.content}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
