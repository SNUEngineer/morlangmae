import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import MyCollectionTab, { MyCollectionTabProps } from "./MyCollectionTab";
import SearchCollectionTab, {
  SearchCollectionTabProps,
} from "./SearchCollectionTab";
import CreateCollectionTab, {
  CreateCollectionTabProps,
} from "./CreateCollectionTab";
import CollectionViewPageContainer from "../viewCollection/CollectionViewPageContainer";
import EditPlatterPageContainer from "../editPlatter/EditPlatterPageContainer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export interface CollectionPageProps {
  collectionId?: number;
  platterId?: number;
  myCollectionTabPrpos: MyCollectionTabProps;
  searchCollectionTabProps: SearchCollectionTabProps;
  createCollectionTabProps: CreateCollectionTabProps;
}

export default function CollectionPage(props: CollectionPageProps) {
  const [value, setValue] = useState(1);
  const handleChange = (_: any, newValue: number) => setValue(newValue);

  return (
    <Paper>
      <Tab label="My Collection" />
      <Tab label="Search" />
      <Tab label="Create" />
      <MyCollectionTab {...props.myCollectionTabPrpos} />
      <SearchCollectionTab {...props.searchCollectionTabProps} />
      <CreateCollectionTab {...props.createCollectionTabProps} />
      {props.collectionId && (
        <CollectionViewPageContainer
          hiddenToolbar={!!props.platterId}
          collectionId={props.collectionId}
        />
      )}
      {props.platterId && <EditPlatterPageContainer id={props.platterId} />}
    </Paper>
  );
}
