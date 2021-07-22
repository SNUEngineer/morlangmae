import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "./ArrowLink";

export class DiamondPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: "diamond",
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }
}
