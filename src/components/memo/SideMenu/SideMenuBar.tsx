import React, { useEffect, useState, useRef } from "react";
import sideStyle from "./sidebar.module.scss";
import classNames from "classnames";
import { TextArea } from "../MemoItem/TextArea";
import PurposeArea from "../MemoItem/Purpose/PurposeArea";
import MemoItem from "../MemoItem/MemoItem";
import { FocusOn, InFocusGuard } from "react-focus-on";
import Dropdown from "rc-dropdown";

export default function SideMenuBar(props: any) {
  const {
    memoState,
    pageNumber,
    deleteMemo,
    updateTextContent,
    setCurrentFocusItem,
    focusOtherItem,
    writers,
    checkWriters,
  } = props;

  useEffect(() => {
    console.log("memoState " + JSON.stringify(memoState));
  }, [props]);

  const [openDropDownMenu, setOpenDropDownMenu] = useState(0);
  const openWriterEl = useRef(null);
  const openPurposeEl = useRef(null);

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
            <div className={sideStyle.writer_item}>
              <div className={sideStyle.writer_name}>전체</div>
              <div className={sideStyle.writer_count}>15 개</div>
            </div>
            {writers.map((item) => {
              return (
                <div
                  key={item.writerID}
                  className={sideStyle.writer_item}
                  onClick={checkWriters}
                >
                  <div className={sideStyle.writer_checkbox}></div>
                  <div className={sideStyle.writer_name}>{item.writerName}</div>
                  <div className={sideStyle.writer_count}>
                    {item.writerCount}
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

  return (
    <div className={sideStyle.item_container} onClick={close}>
      <div className={sideStyle.dropdown}>
        <div
          ref={openWriterEl}
          className={sideStyle.dropdown_button}
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
          인원
        </div>
        {openDropDownMenu === 1 && <Menu which={1} />}
      </div>

      <div className={sideStyle.dropdown}>
        <div
          ref={openPurposeEl}
          className={sideStyle.dropdown_button}
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
          목적
        </div>
        {openDropDownMenu === 2 && <Menu which={2} />}
      </div>

      <div style={{ margin: 20 }}>
        <div style={{ height: 100 }} />
        <div></div>
      </div>

      <MemoItem
        memoState={memoState}
        writerID={"송병근"}
        currentPageNum={pageNumber}
        deleteMemo={deleteMemo}
        isFocus={true}
        updateTextContent={updateTextContent}
        focusHandler={(itemID) => {
          setCurrentFocusItem({ itemID: itemID });
        }}
        focusOtherItem={focusOtherItem}
        isMenuItem={true}
      ></MemoItem>
    </div>
  );
}
