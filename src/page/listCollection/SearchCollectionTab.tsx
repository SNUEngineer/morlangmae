import React from 'react';
import CollectionCard, { CollectionCardProps, CollectionData, CollectionCardFunctions } from '../../components/collection/CollectionCard';
import CollectionTab from './CollectionTab';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export interface SearchCollectionTabProps {
  serviceCollections: CollectionData[];
  hotCollections: CollectionData[];
  recentlyViewedCollections: CollectionData[];
  companyCollections: CollectionData[];
  onCollectionClick(data: CollectionData): Promise<void>
  pinCollection(id: number): Promise<void>
  unpinCollection(id: number): Promise<void>
  viewAllCompanyCollection(): Promise<void>
}

export default function SearchCollectionTab(props: SearchCollectionTabProps) {
  const functions = {
    onClick: props.onCollectionClick,
    pinCollection: props.pinCollection,
    unpinCollection: props.unpinCollection
  }
  return (
    <div>
      <CollectionTab />
      <ServiceCollectionCardList serviceCollections={props.serviceCollections} {...functions} />
      <HotCollectionCardList hotCollections={props.hotCollections} {...functions} />
      <RecentlyViewCollectionCardList recentlyViewCollections={props.recentlyViewedCollections} {...functions} />
      <CompanyCollectionCardList companyCollections={props.companyCollections} viewAllCompanyCollection={props.viewAllCompanyCollection} {...functions} />
    </div>
  )
}

interface ServiceCollectionCardListProps extends CollectionCardFunctions {
  serviceCollections: CollectionData[];
}

export function ServiceCollectionCardList(props: ServiceCollectionCardListProps) {
  const serviceCollections = props.serviceCollections;
  const cards = serviceCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType='NORMAL'
        onClick={props.onClick}
        pinCollection={props.pinCollection}
        unpinCollection={props.unpinCollection}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="당신을 위한 컬렉션" />
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}

interface HotCollectionCardListProps extends CollectionCardFunctions {
  hotCollections: CollectionData[];
}

export function HotCollectionCardList(props: HotCollectionCardListProps) {
  const hotCollections = props.hotCollections;
  const cards = hotCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType='NORMAL'
        onClick={props.onClick}
        pinCollection={props.pinCollection}
        unpinCollection={props.unpinCollection}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="이번 달 인기있는 컬렉션" />
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}

interface RecentlyViewCollectionCardListProps extends CollectionCardFunctions {
  recentlyViewCollections: CollectionData[];
}

export function RecentlyViewCollectionCardList(props: RecentlyViewCollectionCardListProps) {
  const recentlyViewCollections = props.recentlyViewCollections;
  const cards = recentlyViewCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType='NORMAL'
        onClick={props.onClick}
        pinCollection={props.pinCollection}
        unpinCollection={props.unpinCollection}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="최근 살펴본 컬렉션 리스트" />
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}

interface CompanyCollectionCardListProps extends CollectionCardFunctions {
  viewAllCompanyCollection(): Promise<void>
  companyCollections: CollectionData[];
}

export function CompanyCollectionCardList(props: CompanyCollectionCardListProps) {
  const companyCollections = props.companyCollections.slice(0, 20);
  const cards = companyCollections.map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType='NORMAL'
        onClick={props.onClick}
        pinCollection={props.pinCollection}
        unpinCollection={props.unpinCollection}
      />
    )
  })

  return (
    <Card>
      <CardHeader title="사내 컬렉션 리스트" />
      <Button onClick={props.viewAllCompanyCollection}>전체보기</Button>
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}
