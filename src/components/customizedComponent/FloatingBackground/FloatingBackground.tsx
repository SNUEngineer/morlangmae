// @ts-nocheck
import React, { useState, useRef, useCallback } from "react";
import style from "./FloatingBackground.module.scss";

export default function FloatingMenu(props) {
  const { options, selectedOption, viewType } = props;

  return <div className={style.slide_background} />;
}
