import axios from "../common/axios";
import { UserView } from "./user.service";
import { TaskStatus, TaskType } from "../components/task/TaskCard";

export interface TaskView {
  id: number;
  title: string;
  status: TaskStatus;
  imageUrl: string;
  taskType: TaskType;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
}

export interface TaskDetail {
  id: number;
  title: string;
  imageUrl: string;
  taskType: string;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  members: UserView[];
}

export async function getTask(id: number): Promise<TaskDetail> {
  const res = await axios.get(`task/v1/${id}`);
  return res.data;
}

export async function getPinnedTasks(): Promise<TaskView[]> {
  const res = await axios.get("/task/v1/pinned");
  return res.data.tasks;
}

export async function getTasks(): Promise<TaskView[]> {
  const res = await axios.get("/task/v1");
  return res.data.tasks;
}

export async function getServiceTasks(): Promise<TaskView[]> {
  const res = await axios.get(`/task/v1/service`);
  return res.data.tasks;
}

export async function getHotTasks(): Promise<TaskView[]> {
  const res = await axios.get(`/task/v1/hot`);
  return res.data.tasks;
}

export async function getRecentlyViewTasks(): Promise<TaskView[]> {
  const res = await axios.get(`/task/v1/recently`);
  return res.data.tasks;
}

export async function getCompanyTasks(): Promise<TaskView[]> {
  const res = await axios.get("/task/v1/company-archive");
  return res.data.tasks;
}

export async function getMyTasks(): Promise<TaskView[]> {
  const res = await axios.get("/task/v1/created-by-me");
  return res.data.tasks.sort(function (a: TaskView, b: TaskView) {
    if (a.status === TaskStatus.DRAFT && b.status !== TaskStatus.DRAFT) {
      return -1;
    }
    if (a.status !== TaskStatus.DRAFT && b.status === TaskStatus.DRAFT) {
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

export interface CreateDraftTaskRequest {
  title: string;
  taskType: string;
  serviceType: string;
}

export async function createTask(
  request: CreateDraftTaskRequest
): Promise<number> {
  const res = await axios.post("/task/v1/draft", request);
  return res.data.taskId;
}

export interface EditTaskRequest {
  title?: string;
  imageUrl?: string;
  taskType?: string;
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

export async function editTask(
  id: number,
  request: EditTaskRequest
): Promise<void> {
  await axios.put(`/task/v1/${id}`, request);
}

export async function progress(id: number): Promise<void> {
  await axios.put(`/task/v1/${id}/progress`);
}
export async function requestProgress(id: number): Promise<void> {
  await axios.put(`/task/v1/${id}/request-progress`);
}
export async function pinTask(id: number): Promise<void> {
  await axios.put(`/task/v1/${id}/pin`);
}

export async function unpinTask(id: number): Promise<void> {
  await axios.put(`/task/v1/${id}/unpin`);
}
