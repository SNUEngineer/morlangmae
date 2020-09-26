import React, { useState, useEffect } from "react";
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
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  status: string;
  pinned: boolean;
  status: CollectionStatus;
}

export enum CollectionType {
  PROJECT,
  TEAM,
}

export enum CollectionStatus {
  DRAFT,
  REQUEST_PROGRESS,
  DENIED,
  IN_PROGRESS,
  DONE,
}

export interface CollectionCardProps extends CollectionCardFunctions {
  data: CollectionData;
  pinned: boolean;
  viewType:
    | "NORMAL"
    | "WIDE"
    | "CAROUSEL"
    | "CAROUSEL_TWO"
    | "LIST"
    | "SMALL_LIST";
}

export interface CollectionCardFunctions {
  onClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}

export default function CollectionCard(props: CollectionCardProps) {
  const viewType = props.viewType;
  const [pinned, setPinned] = useState(props.pinned);
  useEffect(() => {
    console.log("aaa   " + props.pinned);
    console.log("aaa   " + props.data.title);
  }, [props.data.pinned]);

  const data = props.data;
  const notificationCount = !!data.notificationCount
    ? 0
    : data.notificationCount;
  const onClick = async () => props.onClick(props.data);
  const pinCollection = async (event: any) => {
    event.stopPropagation();
    await props.pinCollection(props.data.id);
    setPinned(true);
  };
  const unpinCollection = async (event: any) => {
    event.stopPropagation();
    await props.unpinCollection(props.data.id);
    setPinned(false);
  };

  const imageStyle = {
    backgroundImage: "url(" + data.imageUrl + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const dateText = data.startDate + " - " + data.endDate;

  const options = ["참여중인 인원 관리", "수정하기", "되돌아보기"];

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
        >
          {(!!pinned ? pinned : false) && (
            <div className={collectionStyle.pinned_container}>
              <div
                className={collectionStyle.icon_container}
                onClick={() => {
                  unpinCollection();
                }}
              >
                <img className={collectionStyle.pinned_icon} alt={"icon"} />
              </div>
            </div>
          )}
          <div className={collectionStyle.service_type_and_menu}>
            <div className={collectionStyle.service_type}>
              {data.serviceType}
            </div>
            <div className={collectionStyle.dot_menu}>
              <FloatingMenu options={options} />
            </div>
          </div>
          <div className={collectionStyle.title}>{data.title}</div>
          {notificationCount > 0 && (
            <Typography>{notificationCount}</Typography>
          )}
          {data.imageUrl && (
            <div className={collectionStyle.image_container}>
              <div className={collectionStyle.image} style={imageStyle}></div>
              <div className={collectionStyle.visible_block}>
                <div className={collectionStyle.background_block}>
                  <div className={collectionStyle.type_and_title}>
                    <div className={collectionStyle.service_type_text}>
                      {data.serviceType}
                    </div>
                    <div className={collectionStyle.title_text}>
                      {data.title}
                    </div>
                  </div>
                  <div className={collectionStyle.date_text}>{dateText}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      );

    case "LIST":
      return (
        <div className={collectionStyle.list_root} onClick={onClick}>
          <div className={collectionStyle.title_image} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle}></div>
          </div>
          <div className={collectionStyle.list_info_container}>
            <div className={collectionStyle.vertical_align}>
              <div className={collectionStyle.title} onClick={onClick}>
                <p>{data.title}</p>
              </div>
              <div className={collectionStyle.state} onClick={onClick}>
                <p>{"대기중"}</p>
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
                <p className={collectionStyle.date_text}>{data.startDate}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "SMALL_LIST":
      return (
        <div className={collectionStyle.small_list_root} onClick={onClick}>
          <div className={collectionStyle.title_image} onClick={onClick}>
            <div className={collectionStyle.image} style={imageStyle}></div>
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
                <p>15개</p>
              </div>
            </div>
          </div>
        </div>
      );

    default:
  }
}
