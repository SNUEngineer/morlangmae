// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import chattingStyle from "./chattingCard.module.scss";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";

export interface ChattingData {
  id: number;
  chattingType: ChattingType;
  serviceType: string;
  title: string;
  imageUrl: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  status: ChattingStatus;
}

export enum ChattingType {
  PROJECT,
  TEAM,
}

export enum ChattingStatus {
  DRAFT = "DRAFT",
  REQUEST_PROGRESS = "REQUEST_PROGRESS",
  DENIED = "DENIED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface ChattingCardProps extends ChattingCardFunctions {
  data: ChattingData;
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

export interface ChattingCardFunctions {
  onClick(data: ChattingData): Promise<void>;
  pinChatting(id: number): Promise<void>;
  unpinChatting(id: number): Promise<void>;
}

export default function ChattingCard(props: ChattingCardProps) {
  const { viewType, data, reloadData } = props;
  const [pinned, setPinned] = useState(props.pinned);
  const onClick = async () => props.onClick(props.data);
  const pinChatting = async () => {
    await props.pinChatting(props.data.id);
    // if (!!reloadData) {
    //   await reloadData();
    // }
    await reloadData();
    setPinned(true);
  };
  const unpinChatting = async () => {
    await props.unpinChatting(props.data.id);
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
    if (pinned) {
      const optionsArray = [
        "참여중인 인원 관리",
        "수정하기",
        "되돌아보기",
        "핀 해제",
      ];
      return optionsArray;
    } else {
      const optionsArray = [
        "참여중인 인원 관리",
        "수정하기",
        "되돌아보기",
        "핀 설정",
      ];
      return optionsArray;
    }
  }, [pinned]);

  const selectedOption = (option: string) => {
    console.log("흠.....");
    switch (option) {
      case "핀 설정":
        pinChatting();
        break;
      case "핀 해제":
        unpinChatting();
        break;
    }
  };
  if (!props.data) {
    switch (viewType) {
      case "WIDE":
        return (
          <div
            className={classNames({
              [chattingStyle.card_root]: true,
              [chattingStyle.card_basic]: viewType === "WIDE",
              [chattingStyle.carousel_limit]: viewType === "CAROUSEL",
              [chattingStyle.carousel_limit_two]: viewType === "CAROUSEL_TWO",
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
        <Grid container direction="row" className={chattingStyle.list_root}>
          <Grid item width={"100px"}>
            <div className={chattingStyle.title_image} onClick={onClick}>
              <div className={chattingStyle.image} style={imageStyle()}></div>
            </div>
          </Grid>
          <Grid
            item
            container
            xs
            direction="row"
            className={chattingStyle.info}
          >
            <Grid item container xs={12} sm={8} direction="column">
              <Grid item className={chattingStyle.chatter} onClick={onClick}>
                <p>{"송병근"}</p>
                {/* 명령권자 프로필로 대체 */}
              </Grid>
              <Grid item className={chattingStyle.content}>
                {/* <p>{data.title}</p> */}
                <p>asdf</p>
              </Grid>
            </Grid>

            <Grid item container xs={12} sm={4} direction="column">
              <Grid className={chattingStyle.date} onClick={onClick}>
                <p className={chattingStyle.date_text}>{dateText()}</p>
              </Grid>
              <Grid className={chattingStyle.date} onClick={onClick}>
                <p className={chattingStyle.date_text}>5</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );

    default:
      return <div></div>;
  }
}
