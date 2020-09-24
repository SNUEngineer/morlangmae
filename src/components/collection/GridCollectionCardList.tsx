import React, { useState, useCallback, useEffect } from "react";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "./CollectionCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import listStyle from "./collectionList.module.scss";

export interface GridCollectionCardListProps {
  collections: CollectionData[];
  columnCount: number;
  viewType: string;
  isPinned: boolean;
  onCollectionClick(data: CollectionData): Promise<void>;
}
export function GridCollectionCardList(props: GridCollectionCardListProps) {
  const {
    collections,
    onCollectionClick,
    columnCount,
    viewType,
    isPinned,
  } = props;
  const [gridCollections, setGridCollections] = useState<CollectionData[]>();
  useEffect(() => {
    if (collections.length < columnCount) {
      var newList = collections.concat(null);
      while (collections.length >= columnCount) {
        newList = newList.concat(null);
      }
      setGridCollections(newList);
    } else {
      setGridCollections(collections.slice(0, columnCount));
    }

    return () => clearInterval(timer);
  }, [collections, columnCount]);
  const cards = useCallback(() => {
    if (!gridCollections) {
      return;
    }

    switch (columnCount) {
      case 2:
        return (
          <div className={listStyle.grid_collection_container_count_2}>
            <div className={listStyle.item_1}>
              <CollectionCard
                data={gridCollections[0]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
                isPinned={!!isPinned ? isPinned : false}
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
                isPinned={!!isPinned ? isPinned : false}
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
              />
            </div>
            <div className={listStyle.item_2}>
              <CollectionCard
                data={gridCollections[1]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
              />
            </div>
            <div className={listStyle.item_3}>
              <CollectionCard
                data={gridCollections[2]}
                viewType={!!viewType ? viewType : "WIDE"}
                onClick={onCollectionClick}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className={listStyle.grid_collection_container}>
            {gridCollections.map((item) => {
              return (
                <div className={listStyle.item}>
                  {!!item && (
                    <CollectionCard
                      key={item.key}
                      data={item}
                      viewType={!!viewType ? viewType : "WIDE"}
                      onClick={onCollectionClick}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  }, [onCollectionClick, gridCollections, viewType]);

  return (
    <div>
      <Grid container>{cards()}</Grid>
    </div>
  );
}
