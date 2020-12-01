//@ts-nocheck
import React, { useState } from "react";
import menuStyle from "./BasicMenuBar.module.scss";
import { logOut } from "../../../services/user.service";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import NotificationPageContainer from "../../../page/notification/NotificationPageContainer";
import { useLocation, useHistory } from "react-router-dom";
import { PROFILE } from "../../../common/paths";
import TextField from "@material-ui/core/TextField";

export default function BasicMenuBar(props: any) {
  // 최상단 메뉴바와 그 아래를 나눔.

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchPath, setSearchPath] = useState("");
  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const { pathname, search } = useLocation();
  const history = useHistory();
  const clickProfile = async () => {
    history.push(`${PROFILE}`);
  };
  const searchPathFn = async () => {
    history.push(`${searchPath}`);
  };
  const id = open ? "notification-popover" : undefined;
  const changeSearchPath = async (event: any) => {
    setSearchPath(event.target.value);
  };
  const useMyStyles = makeStyles(() =>
    createStyles({
      listButton: {
        fontSize: "16px",
        letterSpacing: "-0.8px",
        fontFamily: "Noto Sans CJK KR Regular",
        color: "#E2E2E2",
        // "&:hover": {
        //   background: "trasparent",
        //   color: "white",
        // },
      },
      popover: {
        zIndex: "2500",
        marginTop: "7px",
        backgroundColor: "transparent",
        borderRadius: "15px",

        "& .MuiPaper-rounded": {
          backgroundColor: "transparent",
          borderRadius: "0px",
          overflow: "visible",
          boxShadow: "none",
        },
      },
      paper: {
        height: "500px",
        width: "500px",
        backgroundColor: "#f0f0f0",
        borderRadius: "15px",
        overflow: "hidden",
      },
      delete_button: {
        minHeight: "0px",
        minWidth: "0px",
      },
      icon_button: {
        fontSize: "16px",
        letterSpacing: "-0.8px",
        fontFamily: "Noto Sans CJK KR Regular",
        color: "#E2E2E2",
        padding: "0px",
        height: "100%",
      },
    })
  );
  const myClasses = useMyStyles();
  return (
    <div className={menuStyle.container}>
      <div className={menuStyle.top_container}>
        {/* 최상단 메뉴바 */}
        <div className={menuStyle.menu_container}>
          {/* 테스트용 url을 통한 페이지 이동 */}
          <TextField
            className={menuStyle.logo_container}
            style={{ marginLeft: "100px", width: "100px" }}
            defaultValue={pathname + search}
            placeholder={"플래터 제목을 입력해 주세요."}
            fullWidth
            id="testPath"
            name="testPath"
            onChange={changeSearchPath}
          ></TextField>
          <Button
            className={myClasses.icon_button}
            onClick={searchPathFn}
            aria-describedby={id}
          >
            이동
          </Button>
          <div>{pathname + search}</div>
          <div className={menuStyle.menu_content}>
            <div className={menuStyle.icon_container}>
              <Button
                className={myClasses.icon_button}
                onClick={clickProfile}
                aria-describedby={id}
              >
                <img className={menuStyle.profile_icon} alt={"icon"} />
              </Button>
            </div>

            <div className={menuStyle.icon_container}>
              <Button
                className={myClasses.icon_button}
                onClick={handleClickOpen}
                aria-describedby={id}
              >
                <img className={menuStyle.notification_icon} alt={"icon"} />
              </Button>
              <Popover
                disableAutoFocus
                disableEnforceFocus
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className={myClasses.popover}
              >
                <div className={myClasses.paper}>
                  <NotificationPageContainer
                    onClose={() => {
                      setOpen(false);
                    }}
                  />
                </div>
              </Popover>
            </div>

            <div className={menuStyle.icon_container}>
              <Button
                className={myClasses.icon_button}
                onClick={() => {
                  logOut();
                }}
                aria-describedby={id}
              >
                <img className={menuStyle.notification_icon} alt={"icon"} />
              </Button>
            </div>
          </div>
        </div>

        <div className={menuStyle.top_divider}></div>
      </div>

      <div className={menuStyle.bottom_container}>
        <div className={menuStyle.body_container}>{props.children}</div>
      </div>
    </div>
  );
}
