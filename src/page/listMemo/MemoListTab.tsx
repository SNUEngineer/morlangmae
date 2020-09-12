import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import MemoCard from "../../components/memo/list/memoCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import memoStyle from "./MemoListTab.module.scss";

export interface MemoListTabProps {}

export default function MemoListTab(props: MemoListTabProps) {
  const collection1 = {
    id: 0,
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection2 = {
    id: 2,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection3 = {
    id: 3,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection4 = {
    id: 4,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const collection5 = {
    id: 5,
    title: "두번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트222",
    createdDate: 0,
    startDate: 0,
    endDate: 0,
  };
  const testCollections = [
    collection1,
    collection2,
    collection1,
    collection2,
    collection1,
    collection2,
  ];

  const history = useHistory();
  const onCollectionClick = (data: CollectionData) => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //컬렉션에 포함된 메모를 확인하는 페이지로 이동
    history.push(path);
  };
  const onMemoClick = () => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //메모로 이동
    //history.push(path);
  };

  return (
    <div>
      {/* <CollectionTab /> */}
      <MyMemoList memos={testCollections} onMemoClick={onMemoClick} />
    </div>
  );
}

export interface MyMemoListProps {
  memos: CollectionData[];
  onMemoClick(data: CollectionData): Promise<void>;
}

export function MyMemoList(props: MyMemoListProps) {
  const { memos, onMemoClick } = props;
  const [filter, setFilter] = useState<string>("ALL");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  return (
    <div className={memoStyle.requesting_memo_container}>
      <div className={memoStyle.header_container}>
        <div className={memoStyle.text}>{"나의 메모 리스트"}</div>
        <div className={memoStyle.sort_menu}>
          <Select value={filter} onChange={handleChange}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="IN_PROGRESS">임시 저장</MenuItem>
            <MenuItem value="REQUESTED">요청 받은 메모</MenuItem>
            <MenuItem value="REQUESTING">요청한 메모</MenuItem>
            <MenuItem value="NOT_CHECKED">미확인 메모</MenuItem>
          </Select>
        </div>
      </div>
      <div className={memoStyle.divider} />
      <Grid container>
        {memos.map((item) => {
          return (
            <div className={memoStyle.list_item_container}>
              <MemoCard
                key={item.key}
                data={item}
                viewType={"LIST"}
                onClick={onMemoClick}
              />
            </div>
          );
        })}
      </Grid>
    </div>
  );
}
