import React, { useState } from "react";
import EditorJs from "react-editor-js";
import Avatar from "@material-ui/core/Avatar";
import { EDITOR_JS_TOOLS } from "../editor/tools";
import Typography from "@material-ui/core/Typography";
import platterStyle from "./platter.module.scss";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import { PlatterData, viewToData } from "../platter/PlatterEditor";

export interface PlatterProps {
  id: number;
  platterData: PlatterData;
  editable?: boolean;
  onClick(data: PlatterData): Promise<void>;
}

export default function Platter(props: PlatterProps) {
  const holderId = `platter-view-${props.id}`;

  const platterData = props.platterData;
  const onReady = () => {
    const blocks = document.getElementById(holderId);
    if (blocks) {
      blocks.style.pointerEvents = "none";
    }
    const tools = document.querySelectorAll(".ce-toolbar");
    tools.forEach((it: any) => (it.style.display = "none"));
  };
  const data = {
    blocks: platterData.blocks.map((it) => viewToData(it)),
  };
  const onClick = async () => {
    console.log(props.editable);
    if (props.editable) {
      props.onClick(platterData);
    }
  };

  const test = {
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    companyId: "World Plus CNC",
    createdDate: "오전 9:05, 8월 8일 생성",
    subtitle: "현지인 들이 추천하는",
    title: "1차 기획 회의",
  };
  const options = ["참여중인 인원 관리", "수정하기", "되돌아보기"];
  return (
    <div className={platterStyle.platter_container}>
      <div className={platterStyle.align_container}>
        <div id={`platter-${props.id}`} onClick={onClick}></div>
        <div className={platterStyle.dot_menu_container}>
          <div className={platterStyle.dot_menu}>
            <FloatingMenu options={options} />
          </div>
        </div>

        <div className={platterStyle.platter_info_container}>
          <div className={platterStyle.title_container}>
            <Typography className={platterStyle.subtitle}>
              {test.subtitle}
            </Typography>
            <Typography className={platterStyle.title}>{test.title}</Typography>
          </div>

          <div className={platterStyle.writer_container}>
            <Typography className={platterStyle.date_text}>
              {test.createdDate}
            </Typography>

            <div className={platterStyle.profile_container}>
              <Avatar
                alt={platterData.createdBy.displayName}
                src={platterData.createdBy.imageUrl}
                className={platterStyle.avatar}
              />
              <div className={platterStyle.name_text_container}>
                <Typography className={platterStyle.name_text}>
                  {platterData.createdBy.displayName}
                </Typography>
                <Typography className={platterStyle.company_text}>
                  {platterData.createdBy.companyId}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={platterStyle.editor_container}>
          <EditorJs
            holder={holderId}
            data={data}
            onReady={onReady}
            tools={EDITOR_JS_TOOLS as any}
          >
            <div id={holderId} />
          </EditorJs>
        </div>
      </div>
    </div>
  );
}
