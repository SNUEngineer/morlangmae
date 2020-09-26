import React from "react";
import Memo from "./Memo";

export default { title: "Memo" };

export function basic() {
  return (
    <Memo fileUrl="https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf" />
  );
}

export function own() {
  return (
    <Memo fileUrl="https://raw.githubusercontent.com/degoes-consulting/lambdaconf-2015/master/speakers/jdegoes/intro-purescript/presentation.pdf" />
  );
}
