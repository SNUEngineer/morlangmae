import axios from "../common/axios";
import { UserView } from "./user.service";
import { MemoType, MemoStatus } from "../components/memo/list/memoCard";

export interface MemoData {
  id: number;
  fileUrl: string;
  sharedUserIds: number[];
  title: string;
  collectionId: number;
  comment: string;
  originFileUrl?: string;
  createdDate?: Date;
  writer?: UserView;
  platterId?: number;
  imageUrl?: string;
  notificationCount?: number;
  status?: MemoStatus;
  type?: MemoType;
}

export interface MemoView {
  id: number;
  writer: UserView;
  title: string;
  platterId?: number;
  collectionId?: number;
  comment: string;
  createdDate: Date;
  notificationCount?: number;
  status?: MemoStatus;
  type?: MemoType;
}

export interface MemoItemData {
  memoId: number;
  id: number;
  sender: UserView;
  createdDate: Date;
  color?: string;
  memoState: {
    itemID: number;
    pageNum: number;
    content: string;
    x: number;
    y: number;
    purpose: string;
    anchor?: {
      x: number;
      y: number;
      box?: {
        x: number;
        y: number;
      };
    };
  };
}

export interface MemoItemThreadView {
  id: number;
  itemId: number;
  messages: MessageView[];
}
export interface MessageView {
  content: string; //attaches로 변경 나중에.
  sentAt: Date;
  sender: UserView;
}

export interface CreateMemoRequest {
  title: string; //attaches로 변경 나중에.
  sharedUserIds: number[];
  fileUrl: string;
  collectionId: number;
  platterId?: number;
}

export async function searchUsers(query?: string): Promise<UserView[]> {
  const res = await axios.get("/users/v1");

  return res.data.users;
}

export interface EditUserRequest {
  id: number;
  imageUrl: string;
}

export async function createMemo(request: CreateMemoRequest): Promise<number> {
  if (!!request.platterId) {
    //플레터 메모 생성
    const res = await axios.post(
      `/platter/v1/${request.platterId}/memo`,
      request
    );
    return res.data.memoId;
  } else {
    // 컬렉션 메모 생성
    const res = await axios.post(
      `/collection/v1/${request.collectionId}/memo`,
      request
    );
    return res.data.memoId;
  }
}

//
export async function editMemoItems(items: MemoItemData[]) {
  items.forEach((item) => {
    try {
      axios.put(`/api/memo-item/v1/${item.id}`, item);
    } catch (ex) {}
  });
}
export async function addMemoItems(items: MemoItemData[], memoId: number) {
  items.forEach((item) => {
    try {
      axios.post(`/api/memo/v1/${memoId}/items`, item);
    } catch (ex) {}
  });
}
export async function deleteMemoItems(items: MemoItemData[], memoId: number) {}

// export async function getThread(id: number): Promise<ThreadView> {
//   const res = await axios.get(
//     `/thread/v1/${id}`
//   )
//   return res.data
// }

export async function sendMessage(id: number, message: any): Promise<void> {
  await axios.post(`/thread/v1/${id}`, message);
}

// export async function getMemo(id : number): Promise<MemoItemData[]> {
//   await axios.post(`/users/v1/${id}`, {

//   });
//   const res = await axios.post("/account/v1/sign-in", {

//   });
//   return res;
// }
// export async function getMemoItem(id : number): Promise<MemoData> {
//   await axios.post(`/users/v1/${id}`, {
//     imageUrl,
//   });
//   const res = await axios.post("/account/v1/sign-in", {

//   });
//   return res;
// }
// export async function getMemoItemThread(id : number): Promise<MemoItemThreadView[]> {
//   await axios.post(`/users/v1/${id}`, {
//     imageUrl,
//   });
//   return res;
// }

export async function editUser(request: EditUserRequest): Promise<void> {
  const { id, imageUrl } = request;
  await axios.post(`/users/v1/${id}`, {
    imageUrl,
  });
}
