// @ts-nocheck
import React from "react";

import headerStyle from "./Header.module.scss";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

export default function Header(props: any) {
  //컬렉션과 메모에서, 각 컨텐츠 노출 종류 의 제목 (최근 접속한 컬렉션, 보낸 메모 받은 메모 등)
  //과, 컨텐츠 정렬 메뉴를 묶은 컴포넌트
  const { title, onClick, subMenuType } = props;

  const subMenu = () => {
    switch (subMenuType) {
      case "LIST":
        return <></>;
      case "TASK":
        return (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={onClick}
          >
            <AddIcon />
          </IconButton>
        );

      case "NOTI":
        return <></>;
      default:
        return <div></div>;
    }
  };

  return (
    <div>
      <div className={headerStyle.header_container}>
        <div
          className={classNames({
            [headerStyle.text]: subMenuType !== "requestMemo",
            [headerStyle.request_memo_text]: subMenuType === "requestMemo",
          })}
        >
          {title}
        </div>

        <div className={headerStyle.sub_menu}>{subMenu()}</div>
      </div>
      {(!!subMenuType ? subMenuType !== "pinned" : true) && (
        <div className={headerStyle.divider} />
      )}
    </div>
  );
}
