// @ts-nocheck
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import sideStyle from "./sidebar.module.scss";
import MemoItem from "../MemoItem/MemoItem";
import classNames from "classnames";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { UserView } from "../../services/user.service";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import { TextArea } from "../../../components/customizedComponent/TextArea";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function SideMenuBar(props: any) {
  const {
    memoItem,
    pageNumber,
    deleteMemo,
    updateMemoItem,
    setCurrentFocusItem,
    focusOtherItem,
    checkWriters,
    currentCheckedWriters,
    onPurposeClick,
    memoItems,
    panBoardSize,
    type,
    collectionMembers,
    setMemo,
    memoData,
    handleShare,
    sendMessage,
  } = props;

  const [openDropDownMenu, setOpenDropDownMenu] = useState(0);
  const [writers, setWriters] = useState();
  const [editingMembers, setEditingMembers] = useState<UserView[]>(
    memoData.members
  );
  const openWriterEl = useRef(null);
  const openPurposeEl = useRef(null);

  const handleChange = useCallback(
    (e: any) => {
      const name = e.target.name;
      const value = e.target.value;
      setMemo((prevState) => ({ ...prevState, [name]: value }));
    },
    [setMemo]
  );

  const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none",
      },
      "&&:after": {
        borderBottom: "none",
      },
    },
  });
  const classes = useStyles();

  useEffect(() => {
    let writerArray = [];

    memoItems.forEach((item) => {
      let isAlready = false;
      writerArray?.forEach((element) => {
        // console.log("element.writerID "+element.writerID)
        if (element?.writerID === item?.metadata?.writer?.writerID) {
          isAlready = true;
        }
      });
      if (!isAlready) {
        writerArray.push(item.metadata.writer);
      }
    });

    setWriters(Array.from(new Set(writerArray))); //set으로 중복 제거
  }, [memoItems]);

  const getWriterCount = useCallback(
    (targetID: number) => {
      let count = 0;
      memoItems.forEach((item) => {
        if (item.metadata.writer.writerID === targetID) {
          count++;
        }
      });
      return count;
    },
    [memoItems]
  );

  useEffect(() => {}, [props]);

  const close = () => setOpenDropDownMenu(0);

  const Menu = ({ which }) => (
    <div
      className={sideStyle.dropdown_menu}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div>
        {which === 1 && (
          <div>
            <div className={sideStyle.instruction_item}>
              <div className={sideStyle.writer_name}>전체</div>
              <div className={sideStyle.writer_count}>
                {!!writers && !!writers[0] ? writers.length : 0} 명
              </div>
            </div>

            {writers.map((item, index) => {
              console.log("writerswriters " + JSON.stringify(writers));
              const isCheckedWriter = currentCheckedWriters?.includes(
                item?.writerID
              );
              if (!item) {
                return <div></div>;
              }
              return (
                <div
                  className={classNames({
                    [sideStyle.writer_item]: true,
                    [sideStyle.writer_item_unchecked]: !isCheckedWriter,
                    [sideStyle.writer_item_checked]: isCheckedWriter,
                  })}
                  key={index}
                  onClick={() => {
                    console.log("item click! ");
                    checkWriters(item.writerID);
                  }}
                >
                  <div className={sideStyle.writer_checkbox}></div>
                  <div
                    className={classNames({
                      [sideStyle.writer_name]: true,
                      [sideStyle.writer_name_unchecked]: !isCheckedWriter,
                      [sideStyle.writer_name_checked]: isCheckedWriter,
                    })}
                  >
                    {item.writerName}
                  </div>
                  <div className={sideStyle.writer_count}>
                    {getWriterCount(item.writerID) + " 개"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>{which === 2 && <div>목적 메뉴</div>}</div>
    </div>
  );

  const attendedUser = useCallback(() => {
    return (
      <div>
        <div className={sideStyle.count_text}>
          {!!memoData.members &&
            memoData.members.length > 0 &&
            memoData.members[0].displayName +
              " 외 " +
              (memoData.members.length - 1) +
              " 명 (참여자 리스트)"}
        </div>

        <div className={sideStyle.count_text}>
          <div
            className={classNames({
              [sideStyle.list_container]: true,
              [sideStyle.list_container_basic]: true,
            })}
          >
            <div className={sideStyle.list_container_padding_top} />
            {!!memoData.members &&
              !!memoData.members[0] &&
              memoData.members.map((user: UserView) => (
                <div key={user.id} className={sideStyle.user_info}>
                  <div className={sideStyle.user_info_text}>
                    {user.displayName}
                  </div>

                  <Button
                    onClick={() => {
                      setMemo((prev) => ({
                        ...prev,
                        members: memoData.members.filter(
                          (it: UserView) => it.id !== user.id
                        ),
                      }));
                    }}
                  >
                    <div className={sideStyle.minus_container}>
                      <div className={sideStyle.minus}></div>
                    </div>
                  </Button>
                </div>
              ))}
            <div className={sideStyle.list_container_padding_top} />
          </div>
        </div>
      </div>
    );
  }, [memoData.members, setMemo]);

  const sideMenu = useCallback(() => {
    switch (type) {
      case "TOOL":
        return (
          <div>
            <div className={sideStyle.dropdown}>
              <div
                ref={openWriterEl}
                className={sideStyle.dropdown_button_container}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (openDropDownMenu === 1) {
                    close();
                  } else {
                    setOpenDropDownMenu(1);
                  }
                }}
              >
                <div className={sideStyle.dropdown_button}>
                  <div className={sideStyle.text}>인원</div>
                  <img
                    alt={"icon"}
                    className={classNames({
                      [sideStyle.icon]: true,
                      [sideStyle.icon_opened]: openDropDownMenu === 1,
                      [sideStyle.icon_closed]: openDropDownMenu !== 1,
                    })}
                  />
                </div>
              </div>
              {openDropDownMenu === 1 && <Menu which={1} />}
            </div>

            <div className={sideStyle.dropdown}>
              <div
                ref={openPurposeEl}
                className={sideStyle.dropdown_button_container}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (openDropDownMenu === 2) {
                    close();
                  } else {
                    setOpenDropDownMenu(2);
                  }
                }}
              >
                <div className={sideStyle.dropdown_button}>
                  <div className={sideStyle.text}>목적</div>
                  <img
                    alt={"icon"}
                    className={classNames({
                      [sideStyle.icon]: true,
                      [sideStyle.icon_opened]: openDropDownMenu === 2,
                      [sideStyle.icon_closed]: openDropDownMenu !== 2,
                    })}
                  />
                </div>
              </div>
              {openDropDownMenu === 2 && <Menu which={2} />}
            </div>

            <div style={{ margin: 20 }}>
              <div style={{ height: 100 }} />
              <div></div>
            </div>

            <MemoItem
              memoItem={memoItem}
              currentPageNum={pageNumber}
              deleteMemo={deleteMemo}
              isFocus={true}
              updateMemoItem={updateMemoItem}
              focusHandler={(itemID) => {
                setCurrentFocusItem({ itemID: itemID });
              }}
              focusOtherItem={focusOtherItem}
              isMenuItem={true}
              onPurposeClick={onPurposeClick}
              panBoardSize={panBoardSize}
              currentCheckedWriters={currentCheckedWriters}
              sendMessage={sendMessage}
            ></MemoItem>
          </div>
        );
      case "SHARE":
        return (
          <div>
            <div className={sideStyle.set_title_container}>
              <div className={sideStyle.setting_stage_container}>
                <div className={sideStyle.text}>제목 설정</div>
              </div>
              <TextField
                className={sideStyle.title}
                required
                defaultValue={memoData?.title}
                placeholder={"문서 제목을 입력해 주세요."}
                fullWidth
                name="title"
                InputProps={{ classes }}
                onChange={handleChange}
              />
            </div>

            <div className={sideStyle.set_title_container}>
              <div className={sideStyle.setting_stage_container}>
                <div className={sideStyle.text}>코멘트</div>
              </div>

              <TextArea
                name="comment"
                inline
                width="100%"
                height="115px"
                maxHeight="165px"
                textSize={15}
                fontColor={"#4B4B4B"}
                letterSpacing={"-0.75px"}
                padding={"10px 10px 10px 10px"}
                onChange={handleChange}
                defaultValue={memoData?.comment}
                fontFamily={"Noto Sans CJK KR Regular"}
                border={{ width: 0.5, color: "#E0E0E0", radius: "5px" }}
                backgroundColor={"transparent"}
              />
            </div>

            <div className={sideStyle.set_title_container}>
              <div className={sideStyle.setting_stage_container}>
                <div className={sideStyle.text}>공유 대상</div>
              </div>
              {!!collectionMembers && !!collectionMembers[0] && (
                <Autocomplete
                  id="users-search"
                  style={{ width: "100%" }}
                  multiple
                  value={memoData.members}
                  //원래는 props.users로 검색가능 대상이 나와야 함.
                  onChange={(event, newValue) => {
                    setMemo((prev) => ({ ...prev, members: newValue }));
                  }}
                  options={collectionMembers}
                  //원래는 props.users로 검색가능 대상이 나와야 함.
                  renderInput={(params) => {
                    return (
                      <InputBase
                        className={sideStyle.input_option_container}
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        placeholder={"ID 또는 이름으로 참여 인원 추가"}
                        autoFocus
                      />
                    );
                  }}
                  getOptionLabel={(option) => option.displayName}
                  renderOption={(option: UserView) => (
                    <Fragment>
                      <div className={sideStyle.search_attend_user_item}>
                        <Avatar
                          alt={option.displayName}
                          src={option.imageUrl}
                          className={sideStyle.avatar}
                        />

                        <div className={sideStyle.user_info}>
                          <div className={sideStyle.name_text}>
                            {option.displayName}
                          </div>
                          <div className={sideStyle.user_info_text}>
                            삼성전자, 과장
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                />
              )}

              <div
                className={classNames({
                  [sideStyle.attended_user_container]: true,
                  [sideStyle.attended_user_container_setting]: true,
                })}
              >
                {attendedUser()}
              </div>
            </div>

            <div
              className={classNames({
                [sideStyle.share_button]: true,
              })}
            >
              <Button
                onClick={() => {
                  handleShare();
                }}
              >
                공유하기
              </Button>
            </div>
          </div>
        );
    }
  }, [
    attendedUser,
    classes,
    collectionMembers,
    currentCheckedWriters,
    deleteMemo,
    focusOtherItem,
    handleChange,
    memoData,
    memoItem,
    onPurposeClick,
    openDropDownMenu,
    pageNumber,
    panBoardSize,
    setCurrentFocusItem,
    type,
    updateMemoItem,
    setMemo,
    handleShare,
  ]);

  return (
    <div className={sideStyle.side_menu_container} onClick={close}>
      {sideMenu()}
    </div>
  );
}
