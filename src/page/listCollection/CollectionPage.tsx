import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyCollectionTab, { MyCollectionTabProps } from './MyCollectionTab';
import SearchCollectionTab, { SearchCollectionTabProps } from './SearchCollectionTab';
import CreateCollectionTab, { CreateCollectionTabProps } from './CreateCollectionTab';
import CollectionViewPageContainer from '../viewCollection/CollectionViewPageContainer';
import EditPlatterPageContainer from '../editPlatter/EditPlatterPageContainer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export interface CollectionPageProps {
  collectionId?: number;
  platterId?: number;
  myCollectionTabPrpos: MyCollectionTabProps;
  searchCollectionTabProps: SearchCollectionTabProps;
  createCollectionTabProps: CreateCollectionTabProps;
}

export default function CollectionPage(props: CollectionPageProps) {
  const [value, setValue] = useState(1)
  const handleChange = (_: any, newValue: number) => setValue(newValue)

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="My Collection" />
        <Tab label="Search" />
        <Tab label="Create" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MyCollectionTab {...props.myCollectionTabPrpos} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SearchCollectionTab {...props.searchCollectionTabProps} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CreateCollectionTab {...props.createCollectionTabProps} />
      </TabPanel>
      { props.collectionId && (
        <CollectionViewPageContainer hiddenToolbar={!!props.platterId} collectionId={props.collectionId} />
      )}
      { props.platterId && (
        <EditPlatterPageContainer id={props.platterId} />
      )}
    </Paper>
  )
}
