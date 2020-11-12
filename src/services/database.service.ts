//@ts-nocheck
import sqlite3Offline from "sqlite3-offline";
import { open } from "sqlite";
import SQL from "sql-template-strings";
import {} from "./memo.service";

let db;
// (async () => {
//   db = await open({
//     filename: "/tmp/bailey.db",
//     driver: sqlite3Offline.Database,
//   });
//   // await db.run('CREATE memo `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
//   // memo_id      BIGINT(20) NOT NULL,
//   // metadata     TEXT,
//   // created_by   BIGINT(20),
//   // created_date DATETIME,);
// })();

export const testdb = async () => {
  if (!db) {
    return;
  }
  await db.run("CREATE test (id int, test-string string)");
  await db.run('INSERT INTO test (id, test-string) VALUES (1, "hello")');
  const testResult = await db.get("SELECT test-string FROM test");
  return testResult;
};

// const result = await db.get("SELECT col FROM tbl WHERE col = ?", "test");
// const result = await db.all("SELECT col FROM tbl");
// const result = await db.run("INSERT INTO tbl (col) VALUES (?)", "foo");
// const result = await db.run(
//   "UPDATE tbl SET col = ? WHERE col = ?",
//   "foo",
//   "test"
// );

export async function createMemoLocally(
  request: CreateMemoRequest
): Promise<number> {}

//

export async function editMemoComment(memo: MemoData) {
  const reqeust = { comment: memo.comment };
  axios.put(`/memo/v1/${memo.id}/comment`, reqeust);
}
export async function editMemoTitle(memo: MemoData) {
  const reqeust = { title: memo.title };
  axios.put(`/memo/v1/${memo.id}/title`, reqeust);
}
export async function deleteSharingMember(memo: MemoData, userId: number) {
  axios.post(`/memo/v1/${memo.id}/shared-users/${userId}`);
}
export async function addSharingMember(memo: MemoData, userId: number) {
  const reqeust = { userId: userId };
  axios.post(`/memo/v1/${memo.id}/shared-users`, reqeust);
}
export async function editMemoItem(item: MemoItemData) {
  const metadata = JSON.stringify(item.metadata);
  const reqeust = { metadata: metadata };
  console.log("metadatametadata " + metadata);
  axios.put(`/memo-item/v1/${item.id}`, reqeust);
}
export async function addMemoItem(item: MemoItemData, memoId: number) {
  const metadata = JSON.stringify(item.metadata);
  const reqeust = { metadata: metadata };
  axios.post(`/memo/v1/${memoId}/items`, reqeust);
}
export async function deleteMemoItem(item: MemoItemData) {
  axios.delete(`/memo-item/v1/${item.id}`);
}

export async function sendMessage(id: number, message: any): Promise<void> {
  await axios.post(`/thread/v1/${id}`, message);
}

export async function getMemo(id: number): Promise<any> {
  const res = await axios.get(`/memo/v1/${id}`);
  return res;
}

export async function editUser(request: EditUserRequest): Promise<void> {
  const { id, imageUrl } = request;
  await axios.post(`/users/v1/${id}`, {
    imageUrl,
  });
}

export async function getRecentlyViewCollections(): Promise<any> {
  const res = await axios.get(`/memo/v1/recently-view`);
  return res.data.collections;
}
export async function getRequestedMemos(): Promise<any> {
  const res = await axios.get(`/memo/v1/requested`);
  return res.data.collections;
}

export async function getCollectionMemos(collectionId: number): Promise<any> {
  const res = await axios.get(`/collection/v1/${collectionId}/memos`);
  return res.data.collections;
}

export async function getPlatterMemos(platterId: number): Promise<any> {
  const res = await axios.get(`/collection/v1/${platterId}/memos`);
  return res.data.collections;
}

export async function getTemporariesMemos(): Promise<any> {
  //로컬에서만 저장하고, 공유하지는 않은 메모.

  return null;
}

export interface MemoData {
  id: number;
  fileUrl: string;
  members: UserView[];
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
  title: string;
  createdBy: UserView;
  comment?: string;
  createdDate: Date;
  notificationCount?: number;
  status?: MemoStatus;
  type?: MemoType;
}

export interface MemoItemData {
  memoId: number;
  id: number;
  createdDate: Date;
  color?: string;
  metadata: {
    sender: UserView;
    memoState: {
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
