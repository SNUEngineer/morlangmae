import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CollectionCard, { CollectionCardProps, CollectionData } from '../../components/collection/CollectionCard';
import CollectionTab from './CollectionTab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getMyCollections } from '../../services/collection.service';
import { COLLECTION_LIST_MY_COLLECTION } from '../../common/paths';

export interface MyCollectionTabProps {
  // pinned: CollectionData[];
  // myCollections: CollectionData[];
  // helpfulCollections: CollectionData[];
  // onCollectionClick(data: CollectionData): Promise<void>
}

export default function MyCollectionTab(props: MyCollectionTabProps) {
  // const { pinned, myCollections, helpfulCollections, onCollectionClick } = props

  const myCollections = getCollections()
  const pinned = getPinnedCollections()
  const helpfulCollections = getHelpfulCollections()
  const history = useHistory()
  const onCollectionClick = (data: CollectionData) => {
    const path = `COLLECTION_LIST_MY_COLLECTION?collectionId=${data.id}`
    history.push(path)
  }

  return (
    <div>
      <CollectionTab />
      <PinnedCollectionCardList pinned={pinned} onCollectionClick={onCollectionClick} />
      <MyCollectionCardList myCollections={myCollections} onCollectionClick={onCollectionClick} />
      <HelpfulCollectionCardList helpfulCollections={helpfulCollections} onCollectionClick={onCollectionClick} />
    </div>
  )  
}

export interface PinnedCollectionCardListProps {
  pinned: CollectionData[]
  onCollectionClick(data: CollectionData): Promise<void>
}

export function PinnedCollectionCardList(props: PinnedCollectionCardListProps) {
  const pinned = props.pinned.slice(0, 5);
  const cards = pinned.map((data: CollectionData, index: number) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType={index < 2 ? 'WIDE' : 'NORMAL'}
        onClick={props.onCollectionClick}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="고정한 컬렉션" />
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}

export interface MyCollectionCardListProps {
  myCollections: CollectionData[]
  onCollectionClick(data: CollectionData): Promise<void>
}

export function MyCollectionCardList(props: MyCollectionCardListProps) {
  const myCollections = props.myCollections;
  const [filter, setFilter] = useState<string>('ALL');
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  }
  const cards = myCollections
    .filter((data: CollectionData) => {
      return filter === 'ALL' || data.status === filter;
    })
    .map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType="NORMAL"
        onClick={props.onCollectionClick}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="나의 컬렉션 리스트" />
      <Select value={filter} onChange={handleChange}>
        <MenuItem value="ALL">전체</MenuItem>
        <MenuItem value="IN_PROGRESS">진행</MenuItem>
        <MenuItem value="DONE">완료</MenuItem>
      </Select>
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}

export interface HelpfulCollectionCardListProps {
  helpfulCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>;
}

export function HelpfulCollectionCardList(props: HelpfulCollectionCardListProps) {
  const helpfulCollections = props.helpfulCollections;
  const cards = helpfulCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType="NORMAL"
        onClick={props.onCollectionClick}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="도움이 될만한 컬렉션" />
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}
