import axios from '../common/axios';

export interface NotificationViewList {
  notifications: NotificationView[];
}

export interface NotificationView {
  id: number;
  type: 'COLLECTION' | 'PLATTER' | 'MEMO';
  cause: string;
  target: number;
  read: boolean;
  createdDate: Date;
  sentBy: NotificationSenderView
}

export interface NotificationSenderView {
  id: number;
  displayName: string;
  imageUrl: string;
}

export async function getNotifications(): Promise<NotificationViewList> {
  const res = await axios.get("/notification/v1")
  return res.data
}

export async function readNotification(id: number): Promise<void> {
  await axios.post("/notification/v1/read")
}
