import React from "react";
import NotificationPage from "./NotificationPage";
import BasicMenuBar from "../../components/basicMenuBar/BasicMenuBar";
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
