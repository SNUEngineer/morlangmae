import axios from "../common/axios";
import { UserView } from "./user.service";

interface CreatePlatterRequest {
  title: string;
  ccs: number[];
  blocks: BlockView[];
}

export async function createPlatter(
  collectionId: number,
  request: CreatePlatterRequest
): Promise<number> {
  const { title, ccs, blocks } = request;
  const res = await axios.post(`/collection/v1/${collectionId}/platters`, {
    title,
    ccs,
    blocks,
  });
  return res.data.id;
}

interface EditPlatterRequest {
  title: string;
  blocks: BlockView[];
}

export async function editPlatter(
  platterId: number,
  request: EditPlatterRequest
) {
  const { title, blocks } = request;
  const noify = true;
  await axios.put(`/platter/v1/${platterId}/blocks`, {
    blocks,
    title,
    noify,
  });
  return;
}

export async function addPlatterCcs(platterId: number, memberId: number) {
  await axios.post(`/platter/v1/${platterId}/ccs`, {
    memberId,
  });
  return;
}

export async function removePlatterCcs(platterId: number, memberId: number) {
  await axios.delete(`/platter/v1/${platterId}/ccs/${memberId}`);
  return;
}

export interface PlatterView {
  id: number;
  collectionId: number;
  title: string;
  status: string;
  createdDate: Date;
  blocks: BlockView[];
  createdBy: UserView;
  members: UserView[];
}

export interface BlockView {
  type: string;
  content: string;
  attaches: string;
}

export interface PlatterWriterView {
  id: number;
  displayName: string;
  imageUrl: string;
}

export async function getPlatters(
  collectionId: number
): Promise<PlatterView[]> {
  const res = await axios.get(`/collection/v1/${collectionId}/platters`);
  return res.data.platters;
}

export async function getPlatter(id: number): Promise<PlatterView> {
  const res = await axios.get(`/platter/v1/${id}`);
  return res.data;
}
