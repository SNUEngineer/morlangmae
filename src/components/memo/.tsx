import React, { useState, useRef, useLayoutEffect } from "react";
import { Document, Page } from "react-pdf";
import memoStyle from "./memo.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";


export default function PageListView(props: any) {
  const initItems = Array.from({ length: 50 });

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState({
    w: 200,
    h: 500,
  });
  const [items, setItems] = useState(initItems);

  const documentEl = useRef(null);

  useLayoutEffect(() => {
    function updateSize() {
      if (documentEl.current) {
        const height = documentEl.current.offsetHeight;
        setPageSize((prevState) => ({ ...prevState, h: height }));
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [documentEl]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      let addedArray = items.concat(Array.from({ length: 50 }));
      if (addedArray.length > numPages) {
        addedArray = Array.from({ length: numPages });
      }
      setItems(addedArray);
    }, 1500);
  };

  return (
    <div>
      <div>
        <div>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4></h4>}
          >
            {items.map((i, index) => (
              <button
                key={index}
                className={memoStyle.list_item}
                onClick={() => {
                  console.log("흐아아암");
                  props.listItemClicked(index + 1);
                }}
              >
                <Document
                  file={props.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className={memoStyle.document}
                >
                  <Page
                    pageNumber={index + 1}
                    width={pageSize.w}
                    onRenderSuccess={() => {
                      console.log("reload??");
                      if (documentEl.current) {
                        const height = documentEl.current.offsetHeight;
                        setPageSize((prevState) => ({
                          ...prevState,
                          h: height,
                        }));
                      }
                    }}
                  />
                </Document>
                Page {index + 1} of {numPages}
              </button>
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <p></p>
    </div>
  );
}
