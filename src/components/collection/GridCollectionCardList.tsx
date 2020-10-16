import React, { useState, useCallback, useEffect } from "react";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
  CollectionStatus,
  CollectionType,
} from "./CollectionCard";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import listStyle from "./collectionList.module.scss";

export interface GridCollectionCardListProps {
  collections: CollectionData[];
  columnCount: number;
  viewType: string;
  pinned: boolean;
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}
export function GridCollectionCardList(props: GridCollectionCardListProps) {
  const {
    collections,
    onCollectionClick,
    columnCount,
    viewType,
    pinned,
    pinCollection,
    unpinCollection,
  } = props;
  const [gridCollections, setGridCollections] = useState<CollectionData[]>();
  useEffect(() => {
    if (collections.length < columnCount) {
      const empty: CollectionData = {
        id: -1,
        title: "empty",
        status: CollectionStatus.IN_PROGRESS,
        imageUrl:
          "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x6001.jpgafaf",
        collectionType: CollectionType.PROJECT,
        serviceType: "마케팅",
        createdDate: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        notificationCount: 0,
        pinned: false,
      };
      var newList = collections.concat(empty);
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
                onClick={onCollectionClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
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
                onClick={onCollectionClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
              />
            </div>
            <div className={listStyle.item_3}>
              <CollectionCard
                data={gridCollections[2]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
                pinned={!!pinned ? pinned : false}
                pinCollection={pinCollection}
                unpinCollection={unpinCollection}
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
                      onClick={onCollectionClick}
                      pinCollection={pinCollection}
                      unpinCollection={unpinCollection}
                      pinned={false}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  }, [onCollectionClick, gridCollections, viewType, columnCount, pinned]);

  return (
    <div>
      <Grid container>{cards()}</Grid>
    </div>
  );
}
