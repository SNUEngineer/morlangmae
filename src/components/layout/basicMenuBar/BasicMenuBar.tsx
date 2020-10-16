import React, { useState } from "react";
import menuStyle from "./BasicMenuBar.module.scss";

export default function BasicMenuBar(props: any) {
  const { hasDrawer } = props;

  return (
    <div className={menuStyle.container}>
      <div className={menuStyle.top_container}>
        <div className={menuStyle.menu_container}>
          <div className={menuStyle.logo_container}></div>
          <div className={menuStyle.menu_content}>
            <div className={menuStyle.icon_container}>
              <img className={menuStyle.profile_icon} alt={"icon"} />
            </div>
            <div className={menuStyle.icon_container}>
              <img className={menuStyle.notification_icon} alt={"icon"} />
            </div>
          </div>
        </div>

        <div className={menuStyle.top_divider}></div>
      </div>

      <div className={menuStyle.bottom_container}>
        {/* <div className={menuStyle.side_container}>
          <div className={menuStyle.fixed_container}>
            <div className={menuStyle.menu_container}>
              <div className={menuStyle.menu_item}>
                <div className={menuStyle.icon_container}>
                  <img className={menuStyle.home_icon} alt={"icon"} />
                </div>
                <div className={menuStyle.text}>홈</div>
              </div>
              <div className={menuStyle.menu_item}>
                <div className={menuStyle.icon_container}>
                  <img className={menuStyle.collection_icon} alt={"icon"} />
                </div>
                <div className={menuStyle.text}>컬렉션</div>
              </div>
              <div className={menuStyle.menu_item}>
                <div className={menuStyle.icon_container}>
                  <img className={menuStyle.memo_icon} alt={"icon"} />
                </div>
                <div className={menuStyle.text}>메모</div>
              </div>
              <div className={menuStyle.menu_item}>
                <div className={menuStyle.icon_container}>
                  <img className={menuStyle.profile_icon} alt={"icon"} />
                </div>
                <div className={menuStyle.text}>프로필</div>
              </div>
            </div>
          </div>
        </div>

        <div className={menuStyle.content_container}>
          <div className={menuStyle.content}>{props.children}</div>
        </div> */}
        <div className={menuStyle.body_container}>{props.children}</div>
      </div>
    </div>
  );
}
