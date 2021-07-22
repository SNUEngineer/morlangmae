import { UserView } from "./user.service";
import axios from "../common/axios";
import {
  DefaultLinkModel,
  DefaultNodeModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams";

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
