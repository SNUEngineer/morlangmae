import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditCollectionPage from './EditCollectionPage';
import { uploadFile } from '../../services/file.service';
import { searchUsers, UserView } from '../../services/user.service';
import { editCollection, progress, getCollection, CollectionDetail } from '../../services/collection.service';

export interface EditCollectionPageContainerProps {
  collectionId: number;
}

export default function EditCollectionPageContainer(props: EditCollectionPageContainerProps) {
  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [users, setUsers] = useState<UserView[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collection = await getCollection(props.collectionId);
        setCollection(collection);
      } catch (e) {
        history.push('/collections')
      }
    }
    const fetchUsers = async () => {
      const users = await searchUsers(undefined);
      setUsers(users)
    }
    fetchCollection();
    fetchUsers();
  }, [props.collectionId])

  async function handleEditCollection(collection: any) {
    await editCollection(collection.id, {
      title: collection.title,
      imageUrl: collection.imageUrl,
      memberIds: collection.members.map((it: UserView) => it.id),
      startDate: new Date(collection.startDate),
      endDate: new Date(collection.endDate),
    })
    try {
      await progress(collection.id)
    } catch (e) {

    }
    // history.push(`/collections/wait/${collection.id}`)
    history.push('/collections')
  }

  if (collection && users.length > 0) {
    return (
      <EditCollectionPage users={users} collectionDetail={collection} uploadImage={uploadFile} editCollection={handleEditCollection} />
    );
  }

  return (
    <div>Loading</div>
  )
}
