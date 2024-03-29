// @ts-nocheck
import { CustomNodeWidget } from "./CustomNodeWidget";
import { CustomNodeModel } from "./CustomNodeModel";
import * as React from "react";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class CustomNodeFactory extends AbstractReactFactory<
  CustomNodeModel,
  DiagramEngine
> {
  constructor() {
    super("custom");
  }

  generateReactWidget(event): JSX.Element {
    return (
      <CustomNodeWidget engine={this.engine} size={50} node={event.model} />
    );
  }

  generateModel(event) {
    return new CustomNodeModel();
  }
}
