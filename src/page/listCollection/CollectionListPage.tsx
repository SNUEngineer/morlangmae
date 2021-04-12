// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import Grid from "@material-ui/core/Grid";
import { unpinCollection } from "../../services/collection.service";
import collectionStyle from "./CollectionListPage.module.scss";
import Header from "../../components/layout/Header/Header";
import { PromiseInvokeOrNoop } from "../../components/memo/PDFList/PDFPages/pdf.worker";

// import Slider from "../../components/customizedComponent/Carousel";

export interface CollectionListPageProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
  collectionSortType: string;
}

export default function CollectionListPage(props: CollectionListPageProps) {
  const {
    collections,
    onCollectionClick,
    pinCollection,
  } = props;
  
  return (
    <div className={collectionStyle.tab_container}>
    
      <CollectionCardList
        myCollections={collections}
        onCollectionClick={onCollectionClick}
        pinCollection={pinCollection}
        unpinCollection={unpinCollection}
      />
    </div>
  );
}

export interface CollectionCardListProps {
  myCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}


export function CollectionCardList(props: CollectionCardListProps) {
  //header와
  const myCollections = props.myCollections;


  const [filter, setFilter] = useState<string>("ALL");
  const options = [
    {
      value: "ALL",
      text: "전체",
    },
    {
      value: "IN_PROGRESS",
      text: "진행",
    },
    {
      value: "DONE",
      text: "완료",
    },
  ];
  const handleChange = (event: any) => { 
    setFilter(event.target.value);
  };
  
  const filteredCollections = myCollections.filter((data: CollectionData) => {
    return filter === "ALL" || data.status.toString() === filter;
  }); 
 

 
  const collectionCards = filteredCollections.map(
    (collection: CollectionData, index) => {
      
      return (
        <div className={collectionStyle.my_collection_list_container}>
          <CollectionCard
                data={collection}
                viewType={"WIDE"}
                pinned={false}
                pinCollection={props.pinCollection}
                unpinCollection={props.unpinCollection}
                
              />
        </div>
      );
    }
  );

  const headerSorted = () => {
    //종류에 따른 header의 title 관리
    const collectionSortType = "SENT";
    const title = (type) => {
      switch (type) {
       
        case "SENT":
          return "보낸 쪽지";
        case "RECEIVED":
          return "받은 쪽지";
       
      }
    };

    return (
      <Header
        title={title(collectionSortType)}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
    );
  };

  return (
    <div className={collectionStyle.collection_container}>
      {headerSorted()}
      <div className={collectionStyle.collection_list_container}>
        <Grid container>{collectionCards}</Grid>
      </div>
    </div>
  );
}
