import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import memoStyle from "./memoCard.module.scss";
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

  switch (viewType) {
    case "WIDE":
      return (
        <Card className={memoStyle.card_root} onClick={onClick}>
          <div className={memoStyle.service_type_and_menu}>
            <div className={memoStyle.service_type}>{data.serviceType}</div>
            <div className={memoStyle.dot_menu}>...</div>
          </div>
          <div className={memoStyle.title}>{data.title}</div>
          {notificationCount > 0 && (
            <Typography>{notificationCount}</Typography>
          )}
          {data.imageUrl && (
            <div className={memoStyle.image_container}>
              <div className={memoStyle.image} style={imageStyle}></div>
              <div className={memoStyle.visible_block}>
                <div className={memoStyle.background_block}>
                  <div className={memoStyle.type_and_title}>
                    <div className={memoStyle.service_type_text}>
                      {data.serviceType}
                    </div>
                    <div className={memoStyle.title_text}>{data.title}</div>
                  </div>
                  <div className={memoStyle.date_text}>{dateText}</div>
                </div>
              </div>
            </div>
          )}
        </Card>
      );

    case "LIST":
    case "IN_COLLECTION":
      return (
        <div className={memoStyle.list_root} onClick={onClick}>
          <div className={memoStyle.title_image} onClick={onClick}>
            <div className={memoStyle.image} style={imageStyle}></div>
          </div>
          <div className={memoStyle.document_info} onClick={onClick}>
            <div className={memoStyle.vertical_align}>
              <div
                className={classNames({
                  [memoStyle.collection_title]: viewType === "LIST",
                  [memoStyle.collection_title_in_collection]:
                    viewType === "IN_COLLECTION",
                })}
                onClick={onClick}
              >
                {viewType !== "IN_COLLECTION" && <div>{data.title}</div>}
                <div
                  className={classNames({
                    [memoStyle.platter_title]: viewType === "LIST",
                    [memoStyle.platter_title_in_collection]:
                      viewType === "IN_COLLECTION",
                  })}
                  onClick={onClick}
                >
                  {"플레터 이름"}
                </div>
                <div className={memoStyle.document_title} onClick={onClick}>
                  {"1차 기획안.docx"}
                </div>
              </div>
            </div>
          </div>
          <div className={memoStyle.writer_info} onClick={onClick}>
            <div className={memoStyle.vertical_align}>
              <div className={memoStyle.date} onClick={onClick}>
                {dateText}
              </div>
              <div className={memoStyle.writer_name} onClick={onClick}>
                {"송병근"}
                {/* 작성자 프로필로 대체 */}
              </div>
              <div className={memoStyle.writer_count} onClick={onClick}>
                {"5명 중 2명 작성"}
              </div>
            </div>
          </div>

          <div
            className={memoStyle.collection_type_container}
            onClick={onClick}
          ></div>
        </div>
      );

    case "SMALL_LIST":
      return (
        <div className={memoStyle.small_list_root} onClick={onClick}>
          <div className={memoStyle.title_image} onClick={onClick}>
            <div className={memoStyle.image} style={imageStyle}></div>
          </div>
          <div className={memoStyle.service_type} onClick={onClick}>
            <p>{data.serviceType}</p>
          </div>
          <div className={memoStyle.title} onClick={onClick}>
            <p>{data.title}</p>
          </div>
          <div className={memoStyle.notfication}>15개</div>
        </div>
      );

    case "TEMP":
      return (
        <div className={memoStyle.temp_root} onClick={onClick}>
          <div className={memoStyle.title_image} onClick={onClick}>
            <div className={memoStyle.image} style={imageStyle}></div>
          </div>
          <div className={memoStyle.document_info} onClick={onClick}>
            <div className={memoStyle.vertical_align}>
              <div className={memoStyle.inner_align}>
                <div className={memoStyle.collection_title} onClick={onClick}>
                  {data.title}
                  <div className={memoStyle.document_title} onClick={onClick}>
                    {"1차 기획안.docx"}
                  </div>
                </div>
              </div>
              <div className={memoStyle.date} onClick={onClick}>
                {dateText}
              </div>
            </div>
          </div>
          <div
            className={memoStyle.collection_type_container}
            onClick={onClick}
          ></div>
        </div>
      );

    default:
  }
}
