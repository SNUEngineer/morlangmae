import axios from "../common/axios";
import { UserView } from "./user.service";
import {
  ChattingStatus,
  ChattingType,
} from "../components/chatting/ChattingCard";

export interface ChattingView {
  id: number;
  title: string;
  status: ChattingStatus;
  imageUrl: string;
  chattingType: ChattingType;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
}

export interface ChattingDetail {
  id: number;
  title: string;
  imageUrl: string;
  chattingType: string;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  members: UserView[];
}

export async function getChatting(id: number): Promise<ChattingDetail> {
  const res = await axios.get(`chatting/v1/${id}`);
  return res.data;
}

export async function getPinnedChattings(): Promise<ChattingView[]> {
  const res = await axios.get("/chatting/v1/pinned");
  return res.data.chattings;
}

export async function getChattings(): Promise<ChattingView[]> {
  const res = await axios.get("/chatting/v1");
  return res.data.chattings;
}

export async function getServiceChattings(): Promise<ChattingView[]> {
  const res = await axios.get(`/chatting/v1/service`);
  return res.data.chattings;
}

export async function getHotChattings(): Promise<ChattingView[]> {
  const res = await axios.get(`/chatting/v1/hot`);
  return res.data.chattings;
}

export async function getRecentlyViewChattings(): Promise<ChattingView[]> {
  const res = await axios.get(`/chatting/v1/recently`);
  return res.data.chattings;
}

export async function getCompanyChattings(): Promise<ChattingView[]> {
  const res = await axios.get("/chatting/v1/company-archive");
  return res.data.chattings;
}

export async function getMyChattings(): Promise<ChattingView[]> {
  const res = await axios.get("/chatting/v1/created-by-me");
  return res.data.chattings.sort(function (a: ChattingView, b: ChattingView) {
    if (
      a.status === ChattingStatus.DRAFT &&
      b.status !== ChattingStatus.DRAFT
    ) {
      return -1;
    }
    if (
      a.status !== ChattingStatus.DRAFT &&
      b.status === ChattingStatus.DRAFT
    ) {
      return 1;
    }
    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  });
}

export async function getServiceTypes(): Promise<string[]> {
  console.log("getServiceTypes ");
  const res = await axios.get("/service/v1");
  return res.data.serviceTypes;
}

export interface CreateDraftChattingRequest {
  title: string;
  chattingType: string;
  serviceType: string;
}

export async function createChatting(
  request: CreateDraftChattingRequest
): Promise<number> {
  const res = await axios.post("/chatting/v1/draft", request);
  return res.data.chattingId;
}

export interface EditChattingRequest {
  title?: string;
  imageUrl?: string;
  chattingType?: string;
  serviceType?: string;
  memberIds?: number[];
  startDate?: Date;
  endDate?: Date;
  requestee?: number;
  requestComment?: string;
}
export interface SendRequesterData {
  username: string;
}

export async function editChatting(
  id: number,
  request: EditChattingRequest
): Promise<void> {
  await axios.put(`/chatting/v1/${id}`, request);
}

export async function progress(id: number): Promise<void> {
  await axios.put(`/chatting/v1/${id}/progress`);
}
export async function requestProgress(id: number): Promise<void> {
  await axios.put(`/chatting/v1/${id}/request-progress`);
}
export async function pinChatting(id: number): Promise<void> {
  await axios.put(`/chatting/v1/${id}/pin`);
}

export async function unpinChatting(id: number): Promise<void> {
  await axios.put(`/chatting/v1/${id}/unpin`);
}
