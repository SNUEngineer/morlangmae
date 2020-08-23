import axios from '../common/axios';
import { UserView } from './user.service';

export async function createPlatter(collectionId: number): Promise<number> {
  const res = await axios.post(
    `/collection/v1/${collectionId}/platters`,
    {
      ccs: []
    }
  )
  return res.data.id
}

export interface PlatterView {
  id: number;
  status: string;
  createdDate: Date;
  blocks: BlockView[];
  createdBy: UserView;
}

export interface BlockView {
  type: string;
  content: string;
}

export interface PlatterWriterView {
  id: number;
  displayName: string;
  imageUrl: string;
}

export async function getPlatters(collectionId: number): Promise<PlatterView[]> {
  const res = await axios.get(
    `/collection/v1/${collectionId}/platters`
  )
  return res.data.platters
}

export async function getPlatter(id: number): Promise<PlatterView> {
  const res = await axios.get(
    `/platter/v1/${id}`
  )
  return res.data
}
