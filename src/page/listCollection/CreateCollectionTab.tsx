// @ts-nocheck
import React, { useState } from "react";
import CollectionList from "../../components/collection/CollectionList";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CollectionListItemProps } from "../../components/collection/CollectionListItem";
import CollectionTab from "./CollectionTab";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import { COLLECTION_CREATE } from "../../common/paths";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import createStyle from "./createCollectionTab.module.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Header from "../../components/layout/Header/Header";
import collectionStyle from "./myCollectionTab.module.scss";
export interface CreateCollectionTabProps {
  collections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export default function CreateCollectionTab(props: CreateCollectionTabProps) {
  console.log("collectionscollections " + JSON.stringify(props.collections));

  const [filter, setFilter] = useState<string>("ALL");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  return (
    <div className={createStyle.tab_container}>
      {/* <CollectionTab /> */}
      {/* <CollectionList
        title="Create Collections"
        collections={props.collections}
      /> */}

      <div className={createStyle.create_button_container}>
        <div className={createStyle.create_button}>
          <AddBoxIcon className={createStyle.create_button} />
          <div className={createStyle.create_text}>생성하기</div>
        </div>
      </div>
      <Header title={"나의 생성 컬렉션 리스트"} subMenuType={"filter"} />
      <Grid container>
        {props.collections.map((item) => {
          return (
            <div className={createStyle.list_item_container}>
              <CollectionCard
                key={item.key}
                data={item}
                viewType={"LIST"}
                onClick={props.onCollectionClick}
              />
            </div>
          );
        })}
        {/* <Grid item>
          <Button variant="contained">
            <Link to={COLLECTION_CREATE}>Create</Link>
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
}
