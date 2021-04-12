// @ts-nocheck
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CollectionData } from "../../components/chatting/CollectionCard";
import MemoCard from "../../components/memo/list/memoCard";
import Grid from "@material-ui/core/Grid";
import memoStyle from "./MemoHomeTab.module.scss";
import Header from "../../components/layout/Header/Header";
export interface MemoListTabProps {}

export default function MemoListTab(props: MemoListTabProps) {
  const collection1 = {
    id: 0,
    title: "3분기 마케팅 전략",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "마케팅",
    createdDate: "8월 10일",
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection2 = {
    id: 2,
    title: "플랜비 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection3 = {
    id: 3,
    title: "SW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection4 = {
    id: 4,
    title: "KW-13 제품 디자인",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "제품",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const collection5 = {
    id: 5,
    title: "프로케어 직원 컨설팅",
    status: "good",
    imageUrl:
      "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray-600x600.jpg",
    collectionType: "team",
    serviceType: "컨설팅",
    createdDate: 0,
    startDate: "8월 10일",
    endDate: "9월 6일",
  };
  const testCollections = [
    collection1,
    collection2,
    collection3,
    collection4,
    collection5,
    collection2,
  ];

  const history = useHistory();
  const onCollectionClick = (data: CollectionData) => {
    history.push(`/memos/collections/${data.id}`);
  };
  const onMemoClick = () => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`; //메모로 이동
    //history.push(path);
  };

  return (
    <div className={memoStyle.list_tab_container}>
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
  return (
    <div className={memoStyle.request_container}>
      <Header
        title={"나의 메모 리스트"}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
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
