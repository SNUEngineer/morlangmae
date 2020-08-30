import React, { useState, useRef } from "react";
import menuStyle from "./memoSideMenu.module.scss";
import Sidebar from "./SideBar";
import { sidebar } from "../index.stories";

export default function MemoSideMenu(props: any) {
  const [isOpen, setIsOpen] = useState({
    opened: false,
  });

  return (
    <div className={menuStyle.container}>
      흠흠흠
      <Sidebar
        onClose={() => {
          setIsOpen({ opened: false });
        }}
        onOpen={() => {
          setIsOpen({ opened: true });
        }}
        opened={isOpen.opened}
        bar={<div>Amazing Sidebar</div>}
        topBar={<div className="topBar">SIDddEBAR</div>}
        size={300}
        mode={Sidebar.MODES.PUSH}
        side={Sidebar.SIDES.RIGHT}
      >
        <div className="main">Main</div>
        <div className="main">Main</div>
        <div className="main">Main</div>
        <button
          className={menuStyle.button}
          onClick={() => {
            setIsOpen({ opened: true });
          }}
        ></button>
        <button
          className={menuStyle.button}
          onClick={() => {
            setIsOpen({ opened: false });
          }}
        ></button>
      </Sidebar>
    </div>
  );
}
