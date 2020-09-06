import React, { useState, useEffect } from 'react';
import { getPlatter, PlatterView } from '../../services/platter.service';
import { getThread, sendMessage, ThreadView } from '../../services/thread.service';
import EditPlatterPage from './EditPlatterPage';

export interface EditPlatterPageContainerProps {
  id: number;
}

export default function EditPlatterPageContainer(props: EditPlatterPageContainerProps) {
  const [platter, setPlatter] = useState<PlatterView | null>(null)
  const [thread, setThread] = useState<ThreadView | null>(null)
  const loadMessages = async () => {
    const thread = await getThread(props.id)
    return thread.messages
  }
  const writeMessage = async (message: any) => {
    await sendMessage(props.id, message)
  }

  useEffect(() => {
    const fetchPlatter = async () => {
      const platter = await getPlatter(props.id)
      setPlatter(platter)
    }
    const fetchThread = async () => {
      const thread = await getThread(props.id)
      setThread(thread)
    }
    fetchPlatter()
    fetchThread()
  }, [props.id])

  if (platter && thread) {
    return (
      <EditPlatterPage {...platter} {...thread} sendMessage={writeMessage} loadMessages={loadMessages} />
    )
  }

  return (
    <div />
  )
}
