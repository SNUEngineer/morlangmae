import React from "react";
import Memo from "./Memo";
import MemoSideMenu from "./SideMenu/MemoSideMenu";

export default { title: "Memo" };

export function basic() {
  return (
    <Memo fileUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf" />
  );
}

export function own() {
  return (
    // <Memo fileUrl="https://github.com/wojtekmaj/react-pdf/files/2930577/compressed.tracemonkey-pldi-09.pdf" />
    <Memo fileUrl="https://raw.githubusercontent.com/degoes-consulting/lambdaconf-2015/master/speakers/jdegoes/intro-purescript/presentation.pdf" />
  );
}
export function sidebar() {
  return <MemoSideMenu></MemoSideMenu>;
}
