// @ts-nocheck
import React, { useState } from "react";
import CollectionList from "../../components/chatting/CollectionList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CollectionListItemProps } from "../../components/chatting/CollectionListItem";
import CollectionTab from "./CollectionTab";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/chatting/ChattingCard";
import { COLLECTION_CREATE } from "../../common/paths";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import createStyle from "./createCollectionTab.module.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Header from "../../components/layout/Header/Header";

export interface CreateCollectionTabProps {
  collections: CollectionData[];
  myId: number;
  onCollectionClick(data: CollectionData): Promise<void>;
  pinCollection(id: number): Promise<void>;
  unpinCollection(id: number): Promise<void>;
}

export default function CreateCollectionTab(props: CreateCollectionTabProps) {
  const options = [
    {
      value: "ALL",
      text: "전체",
    },
    {
      value: "DRAFT",
      text: "초안",
    },
    {
      value: "REQUEST_PROGRESS",
      text: "생성요청",
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
  const [filter, setFilter] = useState<string>("ALL");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };

  const filteredCollections = props.collections.filter(
    (data: CollectionData) => {
      //설정된 filter와 같은 경우를 sorting 함
      return filter === "ALL" || data.status.toString() === filter;
    }
  );

  return (
    <div className={createStyle.tab_container}>
      <div className={createStyle.create_button_container}>
        <Link className={createStyle.create_button} to={COLLECTION_CREATE}>
          <AddBoxIcon className={createStyle.create_button} />
          <div className={createStyle.create_text}>생성하기</div>
        </Link>
      </div>
      <Header
        title={"나의 생성 컬렉션 리스트"}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
      <div className={createStyle.list_container}>
        {filteredCollections.map((item) => {
          return (
            <div className={createStyle.list_item_container}>
              <CollectionCard
                key={item.key}
                data={item}
                viewType={"LIST"}
                onClick={props.onCollectionClick}
                pinCollection={props.pinCollection}
                unpinCollection={props.unpinCollection}
                myId={props.myId}
              />
            </div>
          );
        })}
        {/* <Grid item>
          <Button variant="contained">
            <Link to={COLLECTION_CREATE}>Create</Link>
          </Button>
        </Grid> */}
      </div>
    </div>
  );
}
