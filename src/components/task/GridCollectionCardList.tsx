// @ts-nocheck
import React, { useState, useCallback, useEffect } from "react";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
  CollectionStatus,
  CollectionType,
} from "./TaskCard";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import listStyle from "./collectionList.module.scss";

export interface GridCollectionCardListProps {
  collections: CollectionData[];
  columnCount: number;
  viewType: string;
  pinned: boolean;
  onClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
  reloadData(): Promise<void>;
}
export function GridCollectionCardList(props: GridCollectionCardListProps) {
  //좌우 정렬을 위해 별도로 한줄에 2개 혹은 3개를 정렬시키기 위한 정렬 컴포넌트
  const {
    collections,
    onClick,
    columnCount,
    viewType,
    pinned,
    pinCollection,
    unpinCollection,
    reloadData,
  } = props;
  const [gridCollections, setGridCollections] = useState<CollectionData[]>();

  useEffect(() => {
    if (collections.length < columnCount) {
      // const empty: CollectionData = {
      //   id: -1,
      //   title: "empty",
      //   status: CollectionStatus.IN_PROGRESS,
      //   imageUrl:
      //     "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x6001.jpgafaf",
      //   collectionType: CollectionType.PROJECT,
      //   serviceType: "마케팅",
      //   createdDate: new Date(),
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   notificationCount: 0,
      //   pinned: false,
      // };
      var newList = collections.concat(null);
      while (collections.length >= columnCount) {
        newList = newList.concat(empty);
      }
      setGridCollections(newList);
    } else {
      setGridCollections(collections.slice(0, columnCount));
    }

    //return () => clearInterval(timer);
  }, [collections, columnCount]);
  const cards = useCallback(() => {
    if (!gridCollections) {
      return;
    }

    switch (columnCount) {
      case 2:
        return (
          <div
            className={classNames({
              [listStyle.grid_collection_container_count_2]: true,
              [listStyle.grid_collection_container_small_list]:
                viewType === "SMALL_LIST",
            })}
          >
            <div className={listStyle.item_1}>
              <CollectionCard
                data={gridCollections[0]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
                reloadData={reloadData}
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
                reloadData={reloadData}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={listStyle.grid_collection_container_count_3}>
            <div className={listStyle.item_1}>
              <CollectionCard
                data={gridCollections[0]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
                reloadData={reloadData}
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
                reloadData={reloadData}
              />
            </div>
            <div className={listStyle.item_3}>
              <CollectionCard
                data={gridCollections[2]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
                reloadData={reloadData}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className={listStyle.grid_collection_container}>
            {gridCollections.map((item, index) => {
              return (
                <div className={listStyle.item}>
                  {!!item && (
                    <CollectionCard
                      //key={item.key}
                      key={index}
                      data={item}
                      viewType={!!viewType ? viewType : "WIDE"}
                      onClick={onClick}
                      pinCollection={pinCollection}
                      unpinCollection={unpinCollection}
                      pinned={false}
                      reloadData={reloadData}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  }, [
    onClick,
    pinCollection,
    unpinCollection,
    gridCollections,
    viewType,
    columnCount,
    pinned,
    reloadData,
  ]);

  return (
    <div>
      <Grid container>{cards()}</Grid>
    </div>
  );
}
