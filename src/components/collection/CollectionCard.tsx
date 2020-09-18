import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import collectionStyle from "./collectionCard.module.scss";
import FloatingMenu from "../customizedComponent/FloatingMenu/FloatingMenu";
import classNames from "classnames";

export interface CollectionData {
  id: number;
  serviceType: string;
  title: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  notificationCount: number;
  pinned: boolean;
  status: string;
}

export interface CollectionCardProps {
  data: CollectionData;
  viewType: "NORMAL" | "WIDE" | "HORIZONTAL";

  onClick(data: CollectionData): Promise<void>;
}

const useStyles = makeStyles((viewType: "NORMAL" | "WIDE") =>
  createStyles({
    root: {
      width: viewType == "NORMAL" ? 300 : 500,
    },
    media: {
      height: 0,
      paddingTop: viewType == "NORMAL" ? "100%" : "62.25%",
    },
  })
);

export default function CollectionCard(props: CollectionCardProps) {
  const viewType = props.viewType;
  const classes = useStyles(viewType);
  const data = props.data;
  const notificationCount = !!data.notificationCount
    ? 0
    : data.notificationCount;
  const onClick = () => props.onClick(props.data);
  const imageStyle = {
    backgroundImage: "url(" + data.imageUrl + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  //  createdDate: 0,
  //   startDate: 0,
  //   endDate: 0,
  const dateText = data.startDate + " - " + data.endDate;

  const options = ["참여중인 인원 관리", "수정하기", "되돌아보기"];

  switch (viewType) {
    case "WIDE":
    case "CAROUSEL":
      return (
        <div
          className={classNames({
            [collectionStyle.card_root]: true,
            [collectionStyle.card_basic]: viewType !== "CAROUSEL",
            [collectionStyle.carousel_limit]: viewType === "CAROUSEL",
          })}
          onClick={onClick}
        >
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
        // <Card className={classes.root} onClick={onClick}>

        //   <Typography>{data.serviceType}</Typography>
        //   <CardHeader title={data.title} />
        //   {notificationCount > 0 && <Typography>{notificationCount}</Typography>}
        //   {data.imageUrl && (
        //     <CardMedia image={data.imageUrl} className={classes.media} />
        //   )}
        // </Card>
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
                <p>{data.startDate}</p>
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
