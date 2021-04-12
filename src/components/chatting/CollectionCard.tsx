// @ts-nocheck
import React, { useState, useEffect, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import collectionStyle from "./collectionCard.module.scss";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import classNames from "classnames";

export interface CollectionData {
  id: number;
  collectionType: CollectionType;
  serviceType: string;
  title: string;
  imageUrl: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  status: CollectionStatus;
}

export enum CollectionType {
  PROJECT,
  TEAM,
}

export enum CollectionStatus {
  DRAFT = "DRAFT",
  REQUEST_PROGRESS = "REQUEST_PROGRESS",
  DENIED = "DENIED",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface CollectionCardProps extends CollectionCardFunctions {
  data: CollectionData;
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

export interface CollectionCardFunctions {
  onClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}

export default function CollectionCard(props: CollectionCardProps) {
  const { viewType, data, reloadData } = props;
  const [pinned, setPinned] = useState(props.pinned);
  const onClick = async () => props.onClick(props.data);
  const pinCollection = async () => {
    await props.pinCollection(props.data.id);
    // if (!!reloadData) {
    //   await reloadData();
    // }
    await reloadData();
    setPinned(true);
  };
  const unpinCollection = async () => {
    await props.unpinCollection(props.data.id);
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
    if (!props.data) {
      return "";
    }
    if (!!props.data.imageUrl) {
      return {
        backgroundImage: "url(" + props.data.imageUrl + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    } else {
      //컬렉션의 타이틀 이미지가 없거나 로드되지 않았을 때 사용되는 기본 이미지
      return {
        backgroundImage:
          "url(https://www.solidbackgrounds.com/images/3840x2160/3840x2160-dark-gray-solid-color-background.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    }
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
        pinCollection();
        break;
      case "핀 해제":
        unpinCollection();
        break;
    }
  };
  if (!props.data) {
    switch (viewType) {
      case "WIDE":
      case "CAROUSEL":
      case "CAROUSEL_TWO":
        return (
          <div
            className={classNames({
              [collectionStyle.card_root]: true,
              [collectionStyle.card_basic]: viewType === "WIDE",
              [collectionStyle.carousel_limit]: viewType === "CAROUSEL",
              [collectionStyle.carousel_limit_two]: viewType === "CAROUSEL_TWO",
            })}
            onClick={onClick}
          ></div>
        );

      case "LIST":
        return (
          <div className={collectionStyle.list_root} onClick={onClick}></div>
        );

      case "SMALL_LIST_BACK_UP":
        return (
          <div
            className={collectionStyle.small_list_root}
            onClick={onClick}
          ></div>
        );

      case "SMALL_LIST":
        return (
          <div
            className={collectionStyle.small_list_root}
            onClick={onClick}
          ></div>
        );

      default:
        return <div></div>;
    }
  }
  switch (viewType) {
    case "WIDE":
    case "CAROUSEL":
    case "CAROUSEL_TWO":
      return (
        <div
          className={classNames({
            [collectionStyle.card_root]: true,
            [collectionStyle.card_basic]: viewType === "WIDE",
            [collectionStyle.carousel_limit]: viewType === "CAROUSEL",
            [collectionStyle.carousel_limit_two]: viewType === "CAROUSEL_TWO",
          })}
        >
          {(!!props.pinned ? props.pinned : false) && (
            <div className={collectionStyle.pinned_container}>
              <div
                className={collectionStyle.icon_container}
                onClick={() => {
                  //unpinCollection();
                }}
              >
                <img
                  className={classNames({
                    [collectionStyle.pinned_icon]: pinned,
                    [collectionStyle.unpinned_icon]: !pinned,
                  })}
                  alt={"icon"}
                />
              </div>
            </div>
          )}
          <div className={collectionStyle.service_type_and_menu}>
            <div className={collectionStyle.service_type}>
              {data.serviceType}
            </div>
            <div className={collectionStyle.dot_menu}>
              <FloatingMenu
                options={options()}
                selectedOption={selectedOption}
              />
            </div>
          </div>
          <div className={collectionStyle.title}>{data.title}</div>
          {data.notificationCount > 0 && (
            <Typography>{data.notificationCount}</Typography>
          )}
          <div className={collectionStyle.image_container} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle()}></div>
            <div className={collectionStyle.visible_block}>
              <div className={collectionStyle.background_block}>
                <div className={collectionStyle.type_and_title}>
                  <div className={collectionStyle.service_type_text}>
                    {data.serviceType}
                  </div>
                  <div className={collectionStyle.title_text}>{data.title}</div>
                </div>
                <div className={collectionStyle.date_text}>{dateText()}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "LIST":
      return (
        <div
          className={classNames({
            [collectionStyle.list_root]: true,
            [collectionStyle.list_root_approver]: isApprover(),
            [collectionStyle.list_root_create]: !isApprover(),
          })}
          onClick={onClick}
        >
          <div className={collectionStyle.title_image} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle()}></div>
          </div>
          <div className={collectionStyle.list_info_container}>
            <div className={collectionStyle.vertical_align}>
              <div className={collectionStyle.title} onClick={onClick}>
                <p>{data.title}</p>
              </div>
              <div className={collectionStyle.state} onClick={onClick}>
                <p>{data.status}</p>
              </div>
              <div className={collectionStyle.authority} onClick={onClick}>
                <p>{"송병근"}</p>
                {/* 명령권자 프로필로 대체 */}
              </div>
              <div
                className={collectionStyle.collection_type_container}
                onClick={onClick}
              >
                <div className={collectionStyle.align_container}>
                  <div className={collectionStyle.collection_attending_type}>
                    팀
                  </div>
                  <div className={collectionStyle.collection_type}>
                    아카이브
                  </div>
                </div>
              </div>
              <div className={collectionStyle.date} onClick={onClick}>
                <p className={collectionStyle.date_text}>{dateText()}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "SMALL_LIST_BACK_UP":
      return (
        <div className={collectionStyle.small_list_root} onClick={onClick}>
          <div className={collectionStyle.title_image} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle()}></div>
          </div>
          <div className={collectionStyle.list_info_container}>
            <div className={collectionStyle.vertical_align}>
              <div className={collectionStyle.service_type} onClick={onClick}>
                <p>{data.serviceType}</p>
              </div>
              <div className={collectionStyle.title} onClick={onClick}>
                <p>{data.title}</p>
              </div>
              <div className={collectionStyle.notfication}>
                <p>{data.notificationCount} 개</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "SMALL_LIST":
      return (
        <div className={collectionStyle.small_list_root} onClick={onClick}>
          <div className={collectionStyle.title_image} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle()}></div>
          </div>
          <div className={collectionStyle.document_info} onClick={onClick}>
            <div className={collectionStyle.vertical_align}>
              <div
                className={classNames({
                  [collectionStyle.collection_type]: true,
                })}
                onClick={onClick}
              >
                <div> {data.serviceType}</div>
                <div
                  className={classNames({
                    [collectionStyle.collection_title]: true,
                  })}
                  onClick={onClick}
                >
                  {data.title}
                </div>
                <div className={collectionStyle.date_text} onClick={onClick}>
                  {dateText()}
                </div>
              </div>
            </div>
          </div>

          <div
            className={collectionStyle.collection_type_container}
            onClick={onClick}
          ></div>
        </div>
      );

    default:
      return <div></div>;
  }
}
