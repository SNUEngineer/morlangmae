import React from "react";
import CollectionListItem, {
  CollectionListItemProps,
} from "./CollectionListItem";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { CollectionData } from "./ChattingCard";

export interface CollectionListProps {
  title: string;
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export default function CollectionList(props: CollectionListProps) {
  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider />
      <List>
        {props.collections.map((data: CollectionData) => {
          return (
            <CollectionListItem
              key={data.id}
              data={data}
              onClick={props.onCollectionClick}
            />
          );
        })}
      </List>
    </Card>
  );
}
