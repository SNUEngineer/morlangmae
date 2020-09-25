import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CollectionCard, { CollectionCardFunctions, CollectionData, CollectionType } from '../../components/collection/CollectionCard';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface CompanyCollectionPageProps extends CollectionCardFunctions {
  companyCollections: CollectionData[];
  goBack(): Promise<void>;
}

export default function CompanyCollectionPage(props: CompanyCollectionPageProps) {
  return (
    <div>
      <Button onClick={props.goBack}>이전으로</Button>
      <CompanyCollectionCardList companyCollections={props.companyCollections} {...props as CollectionCardFunctions} />
    </div>
  )
}

export interface CompanyCollectionCardListProps extends CollectionCardFunctions {
  companyCollections: CollectionData[];
}
enum SortType {
  RECENTLY_DESC,
  RECENTLY_ASC,
}

function CompanyCollectionCardList(props: CompanyCollectionCardListProps) {
  const [filter, setFilter] = useState<string>('ALL');
  const [sort, setSort] = useState<SortType>(SortType.RECENTLY_DESC)
  const changeFilter = (event: any) => {
    setFilter(event.target.value);
  }
  const changeSort = (event: any) => {
    setSort(event.target.value);
  }

  const sortFn = (a: CollectionData, b: CollectionData) => {
    if (sort === SortType.RECENTLY_ASC) {
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    } else {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    }
  }

  const cards = props.companyCollections
    .sort(sortFn)
    .filter(data => {
      return filter === 'ALL' ||
        (filter === 'TEAM' && data.collectionType === CollectionType.TEAM) ||
        filter === data.serviceType
    })
    .map((data: CollectionData) => {
    return (
      <CollectionCard
        key={data.id}
        data={data}
        viewType="NORMAL"
        onClick={props.onClick}
        pinCollection={props.pinCollection}
        unpinCollection={props.unpinCollection}
      />
    )
  })

  const serviceTypes = Array.from(new Set(props.companyCollections.map(data => data.serviceType)))

  return (
    <Card>
      <CardHeader title="회사 아카이브" />
      <Select value={filter} onChange={changeFilter}>
        <MenuItem value="ALL">전체 컬렉션</MenuItem>
        <MenuItem value="TEAM">팀</MenuItem>
        {serviceTypes.map(serviceType => (
          <MenuItem key={serviceType} value={serviceType}>{serviceType}</MenuItem>
        ))}
      </Select>
      <Select value={sort} onChange={changeSort}>
        <MenuItem value={SortType.RECENTLY_DESC}>최신 순</MenuItem>
        <MenuItem value={SortType.RECENTLY_ASC}>생성 순</MenuItem>
      </Select>
      <Divider />
      <Grid container>
        {cards}
      </Grid>
    </Card>
  )
}
