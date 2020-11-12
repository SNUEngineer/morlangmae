import axios from "../common/axios";

export interface ThreadView {
  id: number;
  messages: MessageView[];
}

export interface MessageView {
  content: string;
  sentAt: Date;
  sender: MessageSenderView;
}

export interface MessageSenderView {
  id: number;
  displayName: string;
  imageUrl: string;
}

export async function getThread(id: number): Promise<ThreadView> {
  const res = await axios.get(`/thread/v1/${id}`);
  return res.data;
}

export async function sendMessage(id: number, message: any): Promise<void> {
  await axios.put(`/thread/v1/${id}`, message);
}
