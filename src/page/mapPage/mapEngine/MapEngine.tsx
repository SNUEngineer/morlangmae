// @ts-nocheck
import React, { useState, Fragment, useEffect, useCallback } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import style from "./MapEngine.module.scss";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams";
import { AdvancedPortModel, AdvancedLinkFactory } from "./items/ArrowLink";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

export interface MapEngineProps {
  progress: "CREATING" | "EDITING" | "VIEWING" | "TASKING";
  data?: any;
  disableEditing: bool;
}

export interface NodeModel {
  selectorId: number;
  title: string;
  node: DefaultNodeModel;
  x: number;
  y: number;
  inPort: DefaultPortModel;
  outPort: DefaultPortModel;
  fromHere: DefaultNodeModel[];
  toHere: DefaultNodeModel[];
  fromLinks: DefaultLinkModel[];
  toLinks: DefaultLinkModel[];
}
// function createNode(nodeData : NodeModel): any {

//   const node = new DefaultNodeModel(nodeData.title, "rgb(0,192,255)");
//   node.addPort(
//     new DefaultPortModel(true, `${nodeFrom.name}-out-${count}`, "Out")
//   );
//   node.addPort(
//     new DefaultPortModel(false, `${nodeFrom.name}-to-${count}`, "IN")
//   );

//   return port;
// }

// export class RightAnglePortModel extends DefaultPortModel {
//   createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
//     return new RightAngleLinkModel();
//   }
// }

export default function MapEngine(props: MapEngineProps) {
  const { progress, data, disableEditing } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const createNewNode = (nodes) => {
    const name = "untitled";
    const tempId = Date.now(); //props와 비교하여 기존에 없는 아이디로 설정
    const node = new DefaultNodeModel(name, "rgb(0,192,255)");
    //심지어 자동으로 아이디까지 만들어주네 완-벽
    //굳이 selectorID를 같이 갖고 갈 필요 없이 저장해놓고 쓰면 되는 거 아닌가...?

    node.addPort(new AdvancedPortModel(false, "out"));
    node.addPort(new AdvancedPortModel(true, "in"));
    node.registerListener({
      selectionChanged: (e) => {
        // console.log("nodes selection " + JSON.stringify(e.entity.serialize()));
        //노드 선택시 발생
        // if (e.isSelected) {
        //   setSelectedNode(e.entity);
        //   setMenuOpen(true);
        // }
      },
    });
    return node;
  };

  let engine = createEngine();
  engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
  let model = new DiagramModel();
  let nodes: NodeModel[] = [];
  //얘도 굳이 있어야되나...?
  //테스트용
  nodes.push(createNewNode());
  nodes.push(createNewNode());
  nodes.forEach((node, index) => {
    node.setPosition(index * 70, index * 70);
    model.addNode(node);
  });
  /////
  model.setGridSize(20);

  model.registerListener({
    linksUpdated: (e) => {
      // console.log("link " + JSON.stringify(e.link.serialize));
      console.log("link ");
      // const inPort = e.link?.getTargetPort().serialize();
      // console.log("in Port " + inPort);

      console.log("out port " + e.isCreated);
      if (e.isCreated) {
        e.link.addLabel("choice");
      }

      // 스마트 루팅 실패
      // const outPort = new DefaultPortModel(e.link.getSourcePort);
      // const inPort = new DefaultPortModel(e.link.getTargetPort);
      // outPort.link(inPort, pathfinding);
      // 스마트 루팅 실패

      //어디에 연결되는지 link의 데이터를 파악해서 (json이든 뭐든) 알람
    },
    nodesUpdated: (e) => {
      console.log("nodes update ");
      //노드가 추가되거나 사라질때 발생
    },
    targetPortChanged: (e) => {
      console.log("targettarget ");
      //노드가 추가되거나 사라질때 발생
    },
  });

  const serializingButton = () => {
    console.log("세럴라이징 " + JSON.stringify(model.serialize()));
  };
  engine.setModel(model);
  return (
    <div
      className={style.root}
      onClick={() => {
        setMenuOpen(false);
      }}
    >
      <div
        className={style.tool_container}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={style.tool_blank}>
          <IconButton
            color="primary"
            component="span"
            size="small"
            onClick={serializingButton}
          >
            <HighlightOffIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            component="span"
            size="small"
            onClick={() => {
              setMenuOpen(true);
            }}
          >
            <HighlightOffIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <CanvasWidget engine={engine} className={style.paper} />
      {/* {(menuOpen || !!selectedNode) && (
        <div className={style.node_menu_container}></div>
      )} */}
      {/* {menuOpen && <div className={style.node_menu_container}></div>} */}
    </div>
  );
}
