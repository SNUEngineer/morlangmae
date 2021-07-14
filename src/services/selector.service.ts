import { UserView } from "./user.service";
import axios from "../common/axios";

export interface SelectorData {
  id: number;
  title: string;
  blocks: BlockView[];
  // createdBy: UserView;
  // createdDate: Date;
  optionsData: OptionData[];
}
export interface OptionData {
  id: number;
  title: string;
  blocks: BlockView[];
  // createdBy: UserView;
  // createdDate: Date;
}
export interface BlockView {
  type: string;
  content: string;
  attaches: string;
}
