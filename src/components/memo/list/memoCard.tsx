import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import memoStyle from "./memoCard.module.scss";
import classNames from "classnames";
import { UserView } from "../../../services/user.service";
import { MemoView } from "../../../services/memo.service";

export interface MemoCardProps {
  data: MemoView;
  viewType:
    | "NORMAL"
    | "WIDE"
    | "HORIZONTAL"
    | "LIST"
    | "IN_COLLECTION"
    | "TEMP"
    | "SMALL_LIST";

  onClick(data: MemoView): Promise<void>;
}

export enum MemoType {
  COLLECTION = "COLLECTION",
  PLATTER = "PLATTER",
}

export enum MemoStatus {
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

const useStyles = makeStyles((viewType: "NORMAL" | "WIDE") =>
  createStyles({
    root: {
      width: viewType === "NORMAL" ? 300 : 500,
    },
    media: {
      height: 0,
      paddingTop: viewType === "NORMAL" ? "100%" : "62.25%",
    },
  })
);

export default function MemoCard(props: MemoCardProps) {
  const viewType = props.viewType;
  const classes = useStyles(viewType);
  const data = props.data;
  const notificationCount = !!data.notificationCount
    ? 0
    : data.notificationCount;
  const onClick = () => {
    props.onClick(props.data);
  };
  const imageStyle = {
    backgroundImage:
      "url(" +
      "https://www.solidbackgrounds.com/images/2560x1600/2560x1600-dark-gray-solid-color-background.jpg" +
      ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  //  createdDate: 0,
  //   startDate: 0,
  //   endDate: 0,
  const dateText = data.createdDate;

  switch (viewType) {
    // case "WIDE":
    //   return (
    //     <Card className={memoStyle.card_root} onClick={onClick}>
    //       <div className={memoStyle.service_type_and_menu}>
    //         <div className={memoStyle.service_type}>{data.serviceType}</div>
    //         <div className={memoStyle.dot_menu}>...</div>
    //       </div>
    //       <div className={memoStyle.title}>{data.title}</div>
    //       {notificationCount > 0 && (
    //         <Typography>{notificationCount}</Typography>
    //       )}
    //       {data.imageUrl && (
    //         <div className={memoStyle.image_container}>
    //           <div className={memoStyle.image} style={imageStyle}></div>
    //           <div className={memoStyle.visible_block}>
    //             <div className={memoStyle.background_block}>
    //               <div className={memoStyle.type_and_title}>
    //                 <div className={memoStyle.service_type_text}>
    //                   {data.serviceType}
    //                 </div>
    //                 <div className={memoStyle.title_text}>{data.title}</div>
    //               </div>
    //               <div className={memoStyle.date_text}>{dateText}</div>
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </Card>
    //   );

    case "LIST":
    case "IN_COLLECTION":
      return (
        <div className={memoStyle.list_root} onClick={onClick}>
          <div className={memoStyle.title_image}>
            <div className={memoStyle.image} style={imageStyle}></div>
          </div>
          <div className={memoStyle.document_info}>
            <div className={memoStyle.vertical_align}>
              <div
                className={classNames({
                  [memoStyle.collection_title]: viewType === "LIST",
                  [memoStyle.collection_title_in_collection]:
                    viewType === "IN_COLLECTION",
                })}
              >
                {viewType !== "IN_COLLECTION" && <div>{data.title}</div>}
                <div
                  className={classNames({
                    [memoStyle.platter_title]: viewType === "LIST",
                    [memoStyle.platter_title_in_collection]:
                      viewType === "IN_COLLECTION",
                  })}
                >
                  {"플레터 이름"}
                </div>
                <div className={memoStyle.writer_name}>{"송병근"}</div>
              </div>
            </div>
          </div>
          <div className={memoStyle.writer_info}>
            <div className={memoStyle.vertical_align}>
              <div className={memoStyle.date}>{dateText}</div>
              <div className={memoStyle.document_title}>
                {data.title}
                {/* 혹시, file 이름으로는 어떰? */}
              </div>
              <div className={memoStyle.writer_count}>{"5명 중 2명 작성"}</div>
            </div>
          </div>

          <div className={memoStyle.collection_type_container}></div>
        </div>
      );

    // case "SMALL_LIST":
    //   return (
    //     <div className={memoStyle.small_list_root} onClick={onClick}>
    //       <div className={memoStyle.title_image} onClick={onClick}>
    //         <div className={memoStyle.image} style={imageStyle}></div>
    //       </div>
    //       <div className={memoStyle.service_type} onClick={onClick}>
    //         <p>{data.serviceType}</p>
    //       </div>
    //       <div className={memoStyle.title} onClick={onClick}>
    //         <p>{data.title}</p>
    //       </div>
    //       <div className={memoStyle.notfication}>15개</div>
    //     </div>
    //   );

    case "TEMP":
      return (
        <div className={memoStyle.temp_root} onClick={onClick}>
          <div className={memoStyle.title_image}>
            <div className={memoStyle.image} style={imageStyle}></div>
          </div>
          <div className={memoStyle.document_info}>
            <div className={memoStyle.vertical_align}>
              <div className={memoStyle.inner_align}>
                <div className={memoStyle.collection_title}>
                  {data.title}
                  <div className={memoStyle.document_title}>
                    {"1차 기획안.docx"}
                  </div>
                </div>
              </div>
              <div className={memoStyle.date}>{dateText}</div>
            </div>
          </div>
          <div className={memoStyle.collection_type_container}></div>
        </div>
      );

    default:
  }
}
