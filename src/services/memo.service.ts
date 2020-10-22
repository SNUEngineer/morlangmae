import axios from "../common/axios";
import { UserView } from "./user.service";

export interface MemoData {
  memoId: number;
  fileUrl: string;
  originFileUrl?: string;
  sharedUserIds: UserView[];
  writer: UserView;
  title: string;
  platterId?: number;
  collectionId?: number;
  comment: string;
  createdDate: Date;
}
export interface MemoItemData {
  sender: UserView;
  createdDate: Date;
  memoState: {
    itemId: number;
    pageNum: number;
    content: string;
    x: number;
    y: number;
    purpose: string;
  };
}
export interface MemoItemThreadView {
  id: number;
  messages: MessageView[];
}
export interface MessageView {
  content: string; //attaches로 변경 나중에.
  sentAt: Date;
  sender: UserView;
}

export async function searchUsers(query?: string): Promise<UserView[]> {
  console.log("serach users ");
  const res = await axios.get("/users/v1");
  console.log("serach users " + JSON.stringify(res));
  return res.data.users;
}

export interface EditUserRequest {
  id: number;
  imageUrl: string;
}

export async function getMe(): Promise<UserView> {
  const res = await axios.get("/users/v1/me");
  return res.data;
}

export async function editUser(request: EditUserRequest): Promise<void> {
  const { id, imageUrl } = request;
  await axios.post(`/users/v1/${id}`, {
    imageUrl,
  });
}
