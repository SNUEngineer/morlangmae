import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function Memo(props: any) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  function onItemClick(props: any) {
    console.log(props);
  }

  return (
    <div>
      <Document
        file={props.fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onItemClick={onItemClick}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
