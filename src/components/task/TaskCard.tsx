// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import taskStyle from "./TaskCard.module.scss";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FloatingMenu from "../../components/customizedComponent/FloatingMenu/FloatingMenu";

export interface TaskData {
  id: number;
  taskType: TaskType;
  serviceType: string;
  title: string;
  imageUrl: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  status: TaskStatus;
}

export enum TaskType {
  PROJECT,
  TEAM,
}

export enum TaskStatus {
  DRAFT = "DRAFT",
  REQUEST_PROGRESS = "REQUEST_PROGRESS",
  DENIED = "DENIED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface TaskCardProps extends TaskCardFunctions {
  data: TaskData;
  pinned: boolean;
  viewType: string;
  myId: number;
  reloadData?(): Promise<void>;
  // | "NORMAL"
  // | "WIDE"
  // | "CAROUSEL"
  // | "CAROUSEL_TWO"
  // | "LIST"
  // | "SMALL_LIST"
  // | "SMALL_LIST_BACK_UP";
}

export interface TaskCardFunctions {
  onTaskClick(data: TaskData): Promise<void>;
  onTaskMenuClick(data: TaskData): Promise<void>;
  pinTask(id: number): Promise<void>;
  unpinTask(id: number): Promise<void>;
  data: TaskData;
}

export default function TaskCard(props: TaskCardProps) {
  //다음에 listpage container로 이전

  const { viewType, data, reloadData } = props;
  const [pinned, setPinned] = useState(props.pinned);
  const onClick = async () => props.onClick(props.data);
  const menuClick = async () => props.onTaskMenuClick(props.data);
  const pinTask = async () => {
    await props.pinTask(props.data.id);
    // if (!!reloadData) {
    //   await reloadData();
    // }
    await reloadData();
    setPinned(true);
  };
  const unpinTask = async () => {
    await props.unpinTask(props.data.id);
    // if (!!reloadData) {
    //   await reloadData();
    // }
    await reloadData();
    setPinned(false);
  };

  const isApprover = useCallback(() => {
    //내가 승인권자인지. (내 id 조회하는 방법.))
    //create memo tab에서 사용.
    if (!!data && !!data.approver) {
      if (data.approver === props.myId) {
        return true;
      }
    }

    return false;
  }, [data, props.myId]);

  const imageStyle = useCallback(() => {
    return {
      backgroundColor: "gray",
      backgroundImage:
        "url(https://www.solidbackgrounds.com/images/3840x2160/3840x2160-dark-gray-solid-color-background.jpg)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    // if (!props.data) {
    //   return "";
    // }
    // if (!!props.data.imageUrl) {
    //   return {
    //     backgroundImage: "url(" + props.data.imageUrl + ")",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   };
    // } else {
    //   //컬렉션의 타이틀 이미지가 없거나 로드되지 않았을 때 사용되는 기본 이미지
    //   return {
    //     backgroundImage:
    //       "url(https://www.solidbackgrounds.com/images/3840x2160/3840x2160-dark-gray-solid-color-background.jpg)",
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //   };
    // }
  }, [props.data]);
  const dateText = useCallback(() => {
    //날짜 텍스트를 가공하는 함수
    if (!props.data) {
      return "";
    }
    if (!!props.data.startDate && !!props.data.startDate) {
      return props.data.startDate + " - " + props.data.endDate;
    }
    if (!!props.data.startDate) {
      return props.data.startDate;
    }
    return "";
  }, [props.data]);

  const options = useCallback(() => {
    if (props.data.progress === "IN_PROGRESS") {
      return [
        "완료",
        "bottle neck",
        "break time",
        "할 일에 추가",
        "수정",
        "분석",
        "삭제",
      ];
    } else if (props.data.progress === "BOTTLE_NECK") {
      return ["재개", "수정", "분석", "삭제"];
    } else if (props.data.progress === "BREAK_TIME") {
      return ["재개", "수정", "분석", "삭제"];
    } else if (props.data.progress === "DRAFT") {
      return ["시작", "할 일에 추가", "수정", "분석", "삭제"];
    } else if (props.data.progress === "DONE") {
      return ["재시작", "할 일에 추가", "수정", "분석", "삭제"];
    } else {
      return ["일시 정지", "할 일에 추가", "수정", "분석", "삭제"];
    }
  }, [props.data]);

  const selectedOption = (option: string) => {
    switch (option) {
      case "핀 설정":
        pinTask();
        break;
      case "핀 해제":
        unpinTask();
        break;
      case "완료":
        console.log("완료");
        break;
      case "시작":
        console.log("시작");
        break;
      case "할 일에 추가":
        console.log("할 일에 추가");
        break;

      case "수정":
        break;
      case "분석":
        break;
      case "삭제":
        break;
    }
  };

  if (!props.data) {
    switch (viewType) {
      case "WIDE":
        return (
          <div
            className={classNames({
              [taskStyle.card_root]: true,
              [taskStyle.card_basic]: viewType === "WIDE",
              [taskStyle.carousel_limit]: viewType === "CAROUSEL",
              [taskStyle.carousel_limit_two]: viewType === "CAROUSEL_TWO",
            })}
            onClick={onClick}
          ></div>
        );

      default:
        return <div></div>;
    }
  }
  switch (viewType) {
    case "WIDE":
      return (
        <Grid container direction="row" className={taskStyle.list_root}>
          <Grid>
            <FiberManualRecordIcon fontSize="small" color="primary" />
          </Grid>
          <Grid item width={"100px"}>
            <div className={taskStyle.title_image} onClick={onClick}>
              <div className={taskStyle.image} style={imageStyle()}></div>
            </div>
          </Grid>
          <Grid item container xs direction="row" className={taskStyle.info}>
            <Grid item container xs={12} sm={8} direction="column">
              <Grid item className={taskStyle.chatter} onClick={onClick}>
                <p>{"송병근"}</p>
                {/* 명령권자 프로필로 대체 */}
              </Grid>
              <Grid item className={taskStyle.content}>
                {/* <p>{data.title}</p> */}
              </Grid>
            </Grid>

            <Grid item container xs={12} sm={4} direction="column">
              <Grid className={taskStyle.date} onClick={onClick}>
                <p className={taskStyle.date_text}>{dateText()}</p>
              </Grid>
              <Grid className={taskStyle.date} onClick={onClick}>
                <p className={taskStyle.date_text}>5</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <div className={taskStyle.menu_container}>
              <FloatingMenu
                className={taskStyle.menu_button}
                options={options()}
                viewType="list"
                selectedOption={selectedOption}
              />
            </div>
          </Grid>
        </Grid>
      );

    default:
      return <div></div>;
  }
}
