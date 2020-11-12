import axios from "../common/axios";
import { UserView } from "./user.service";
import {
  CollectionStatus,
  CollectionType,
} from "../components/collection/CollectionCard";

export interface CollectionView {
  id: number;
  title: string;
  status: CollectionStatus;
  imageUrl: string;
  collectionType: CollectionType;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
}

export interface CollectionDetail {
  id: number;
  title: string;
  imageUrl: string;
  collectionType: string;
  serviceType: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  members: UserView[];
}

export async function getCollection(id: number): Promise<CollectionDetail> {
  const res = await axios.get(`collection/v1/${id}`);
  return res.data;
}

export async function getPinnedCollections(): Promise<CollectionView[]> {
  const res = await axios.get("/collection/v1/pinned");
  return res.data.collections;
}

export async function getCollections(): Promise<CollectionView[]> {
  const res = await axios.get("/collection/v1");
  return res.data.collections;
}

export async function getServiceCollections(): Promise<CollectionView[]> {
  const res = await axios.get(`/collection/v1/service`);
  return res.data.collections;
}

export async function getHotCollections(): Promise<CollectionView[]> {
  const res = await axios.get(`/collection/v1/hot`);
  return res.data.collections;
}

export async function getRecentlyViewCollections(): Promise<CollectionView[]> {
  const res = await axios.get(`/collection/v1/recently`);
  return res.data.collections;
}

export async function getCompanyCollections(): Promise<CollectionView[]> {
  const res = await axios.get("/collection/v1/company-archive");
  return res.data.collections;
}

export async function getMyCollections(): Promise<CollectionView[]> {
  const res = await axios.get("/collection/v1/created-by-me");
  return res.data.collections.sort(function (
    a: CollectionView,
    b: CollectionView
  ) {
    if (
      a.status === CollectionStatus.DRAFT &&
      b.status !== CollectionStatus.DRAFT
    ) {
      return -1;
    }
    if (
      a.status !== CollectionStatus.DRAFT &&
      b.status === CollectionStatus.DRAFT
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

export interface CreateDraftCollectionRequest {
  title: string;
  collectionType: string;
  serviceType: string;
}

export async function createCollection(
  request: CreateDraftCollectionRequest
): Promise<number> {
  const res = await axios.post("/collection/v1/draft", request);
  return res.data.collectionId;
}

export interface EditCollectionRequest {
  title?: string;
  imageUrl?: string;
  collectionType?: string;
  serviceType?: string;
  memberIds?: number[];
  startDate?: Date;
  endDate?: Date;
  requestee?: number;
  requestComment?: string;
}

export async function editCollection(
  id: number,
  request: EditCollectionRequest
): Promise<void> {
  await axios.put(`/collection/v1/${id}`, request);
}

export async function progress(id: number): Promise<void> {
  await axios.put(`/collection/v1/${id}/progress`);
}
export async function requestProgress(id: number): Promise<void> {
  await axios.put(`/collection/v1/${id}/request-progress`);
}
export async function pinCollection(id: number): Promise<void> {
  await axios.put(`/collection/v1/${id}/pin`);
}

export async function unpinCollection(id: number): Promise<void> {
  await axios.put(`/collection/v1/${id}/unpin`);
}
