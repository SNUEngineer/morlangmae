// @ts-nocheck
import React from "react";
import NotificationPage from "./NotificationPage";
import BasicMenuBar from "../../components/layout/basicMenuBar/BasicMenuBar";
import Notification, {
  NotificationData,
} from "../../components/notification/Notification";
export default { title: "notification" };




export function basic() {
  
  

  const getMoreNotifications = async (cursor?: string) => {
    let index = 0;

    if (cursor) {
      index = Number(cursor);
    }

    return {
      data: data?.notifications.slice(index, index + 7) || [],
      cursor: data?.notifications?.length
        ? data.notifications.length > index + 7
          ? String(index + 7)
          : undefined
        : undefined,
    };
  };

  const clickNotification = async (notification: NotificationData) => {
    await readNotification(notification.id);
    await reload();
  };

  const goBack = async () => {
    // history.goBack();
  };

 
    // id: number;
    // type: string;
    // comment: string;
    // cause: string;
    // createdDate: Date;
    // sentBy: NotificationSender;
    
    // imageUrl: string;
    // displayName: string;
  const sample1 = {  
    id : 1,
    type : "basic",
    comment : "김용필님이 대화를 요청합니다.",
    cause : "gg",
    createdDate : 2,
    sentBy : {
      imageUrl : "data:image/jpeg;base64,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",
      displayName : "김용필",
    }}
    const data = [sample1,sample1,sample1];

  if (data) {
    const initialNotifications = {
      data : data,
      cursor : 0,
    };
    console.log("1111")
    
    return (
      <NotificationPage
        goBack={goBack}
        initialNotifications={initialNotifications}
        getMoreNotifications={getMoreNotifications}
        onNotificationClick={clickNotification}
        isPage={true}
        onClose={null}
      /> 
    );
  }

  return null;
}
