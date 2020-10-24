// @ts-nocheck
import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import memoStyle from "./memoWorkstation.module.scss";

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState({
    w: 2000,
    h: 500,
  });

  const onDocumentLoadSuccess = useCallback(({ numPages }: any) => {
    setNumPages(numPages);
  }, []);

  return (
    <div>
      sdfsdf
      <Document
        file={
          "https://raw.githubusercontent.com/degoes-consulting/lambdaconf-2015/master/speakers/jdegoes/intro-purescript/presentation.pdf"
        }
        onLoadSuccess={onDocumentLoadSuccess}
        className={memoStyle.document}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}
