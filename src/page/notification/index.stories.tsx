// @ts-nocheck
import React from "react";
import NotificationPage from "./NotificationPage";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
export default { title: "notification" };

export function basic() {
  return (
    <BasicMenuBar>
      <NotificationPage
      //getMoreNotifications={() => {}}
      //onNotificationClick={() => {}}
      />
    </BasicMenuBar>
  );
}
