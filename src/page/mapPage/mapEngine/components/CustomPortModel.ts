// @ts-nocheck
import {
  LinkModel,
  PortModel,
  DefaultLinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "./ArrowLink";

export class CustomPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: "custom",
      name: alignment,
      alignment: alignment,
    });
  }

  createLinkModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }
}
