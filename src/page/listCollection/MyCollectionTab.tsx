import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CollectionCard, {
  CollectionCardProps,
  CollectionData,
} from "../../components/collection/CollectionCard";
import CollectionTab from "./CollectionTab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getMyCollections } from "../../services/collection.service";
import { COLLECTION_LIST_MY_COLLECTION } from "../../common/paths";
import { GridCollectionCardList } from "../../components/collection/GridCollectionCardList";
import collectionStyle from "./myCollectionTab.module.scss";
// import Slider from "../../components/customizedComponent/Carousel";
import Slider from "react-slick";
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
    title: "첫번째 컬렉션",
    status: "good",
    imageUrl:
      "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
    collectionType: "team",
    serviceType: "개발 테스트",
    createdDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
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
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`;
    history.push(path);
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {/* <CollectionTab /> */}

      <div className={collectionStyle.member_header_container}>
        <div className={collectionStyle.text}>김기연님의 컬렉션</div>
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

      <Slider {...settings}>
        <div>
          asdfasdfa
          <h3>1</h3>
        </div>
        <div>
          asdfasdfa
          <h3>2</h3>
        </div>
        <div>
          asdfasdfa
          <h3>3</h3>
        </div>
        <div>
          asdfasdfa
          <h3>4</h3>
        </div>
        <div>
          asdfasdfa
          <h3>5</h3>
        </div>
        <div>
          asdfasdfa
          <h3>6</h3>
        </div>
      </Slider>
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
    <div>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>고정한 컬렉션</div>
      </div>
      <div className={collectionStyle.divider} />
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
  const columnCount = 3; // 반응에 따라 4개 이상으로 늘어날 경우 자동으로 배열.
  filteredCollections.forEach((element) => {
    columnList.push(element);
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

  return (
    <Card>
      <div className={collectionStyle.header_container}>
        <div className={collectionStyle.text}>나의 컬렉션 리스트</div>
        <div className={collectionStyle.sort_menu}>
          <Select value={filter} onChange={handleChange}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="IN_PROGRESS">진행</MenuItem>
            <MenuItem value="DONE">완료</MenuItem>
          </Select>
        </div>
      </div>
      <Divider />
      <Grid container>{myCollectionCards}</Grid>
    </Card>
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
  const cards = helpfulCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType="NORMAL"
        onClick={props.onCollectionClick}
      />
    );
  });

  return (
    <Card>
      <CardHeader title="도움이 될만한 컬렉션" />
      <Divider />
      <Grid container>{cards}</Grid>
    </Card>
  );
}
