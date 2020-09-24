import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import CollectionTab from "./CollectionTab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getMyCollections } from "../../services/collection.service";
import { COLLECTION_LIST_MY_COLLECTION } from "../../common/paths";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import collectionStyle from "./myCollectionTab.module.scss";
import CarouselList from "../../components/customizedComponent/Carousel/CarouselList";
import { makeStyles, createStyles } from "@material-ui/core/styles";
// import Slider from "../../components/customizedComponent/Carousel";

export interface MyCollectionTabProps {
  // pinned: CollectionData[];
  // myCollections: CollectionData[];
  // helpfulCollections: CollectionData[];
  // onCollectionClick(data: CollectionData): Promise<void>
}

export default function MyCollectionTab(props: MyCollectionTabProps) {
  // const { pinned, myCollections, helpfulCollections, onCollectionClick } = props
  //
  //const myCollections = getCollections()
  //  const pinned = getPinnedCollections()
  // const helpfulCollections = getHelpfulCollections()
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
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`;
    history.push(path);
  };
  return (
    <div className={collectionStyle.tab_container}>
      {/* <CollectionTab /> */}

      <div className={collectionStyle.member_header_container}>
        <div className={collectionStyle.text}>김기연님의 컬렉션</div>
       
      </div>
      
      <div className={collectionStyle.member_header_margin} >
      <div className={collectionStyle.divider} />
      </div>
      <PinnedCollectionCardList
        pinned={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <MyCollectionCardList
        myCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
      <HelpfulCollectionCardList
        helpfulCollections={testCollections}
        onCollectionClick={onCollectionClick}
      />
    </div>
  );
}

export interface PinnedCollectionCardListProps {
  pinned: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function PinnedCollectionCardList(props: PinnedCollectionCardListProps) {
  const pinned = props.pinned.slice(0, 5);

  return (
    <div className={collectionStyle.pinned_container}>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>고정한 컬렉션</div>
      </div>
      <GridCollectionCardList
        collections={pinned.slice(0, 2)}
        onClick={props.onCollectionClick}
        columnCount={2}
      />
      <GridCollectionCardList
        collections={pinned.slice(2, 5)}
        onClick={props.onCollectionClick}
        columnCount={3}
      />
    </div>
  );
}

export interface MyCollectionCardListProps {
  myCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function MyCollectionCardList(props: MyCollectionCardListProps) {
  const myCollections = props.myCollections;
  const [filter, setFilter] = useState<string>("ALL");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  const filteredCollections = myCollections.filter((data: CollectionData) => {
    return filter === "ALL" || data.status === filter;
  });

  let columnList = [];
  let myCollectionsGrid = [];
  let index = 0;
  const columnCount = 3; // 반응에 따라 4개 이상으로 늘어날 경우 자동으로 배열.
  filteredCollections.forEach((element) => {
    columnList.push(element);
    index++;
    if (index === filteredCollections.length) {
      while (columnList.length < columnCount) {
        columnList.push(null);
      }
    }
    if (columnList.length >= columnCount) {
      myCollectionsGrid.push(columnList);
      columnList = [];
    }
  });
  const myCollectionCards = myCollectionsGrid.map(
    (collections: CollectionData[], index) => {
      return (
        <div className={collectionStyle.my_collection_list_container}>
          <GridCollectionCardList
            key={index}
            collections={collections}
            onClick={props.onCollectionClick}
            columnCount={columnCount}
          />
        </div>
      );
    }
  );

  const useStyles = makeStyles(() =>
  createStyles({
    select: {
      fontSize: "13px",
      letterSpacing: "-0.98px",
      fontFamily:"Noto Sans CJK KR Regular",
      underline:{
        borderBottomColor: "red"
      }
    },
  })
);
  const classes = useStyles();

  return (
    <div className={collectionStyle.my_collection_container}>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>나의 컬렉션 리스트</div>
        <div className={collectionStyle.sort_menu}>
        <div className={collectionStyle.sort_select}>
          <Select value={filter} onChange={handleChange} className={classes.select}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="IN_PROGRESS">진행</MenuItem>
            <MenuItem value="DONE">완료</MenuItem>
          </Select>
          </div>
        </div>
      </div>
      <div className={collectionStyle.divider} />
      <div className={collectionStyle.collection_list_container}> 
      <Grid container>{myCollectionCards}</Grid>
      </div>
      
    </div>
  );
}

export interface HelpfulCollectionCardListProps {
  helpfulCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function HelpfulCollectionCardList(
  props: HelpfulCollectionCardListProps
) {
  const helpfulCollections = props.helpfulCollections;

  return (
    <div className={collectionStyle.helpful_container}>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>도움이 될만한 컬렉션</div>
      </div>
      <div className={collectionStyle.divider} />
      <div className={collectionStyle.collection_list_container}> 
      <Grid container>
        <CarouselList showItems={3.15}>
          {helpfulCollections.map((item) => {
            return (
              <div className={collectionStyle.helpful_list_item_container}>
                <CollectionCard
                  key={item.key}
                  data={item}
                  viewType={"CAROUSEL"}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </CarouselList>
      </Grid>
      </div>
    </div>
  );
}
