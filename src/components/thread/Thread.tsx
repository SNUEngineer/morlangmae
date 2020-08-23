import React, { useEffect, useState, useRef, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Message, { MessageProps } from './Message';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';

export interface ThreadProps {
  messages: MessageProps[];
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageProps[]>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messages: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      minHeight: 400,
      overflowX: 'scroll',
    },
    inline: {
      display: 'inline',
    },
    form: {
      width: '100%'
    },
  }),
);

export default function Thread(props: ThreadProps) {
  const [messages, setMessages] = useState(props.messages);
  const messagesRef = useRef<any>(null);
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const loadMessages = async () => {
    const messages = await props.loadMessages()
    setMessages(messages)
  }
  const scrollToBottom = () => {
    messagesRef?.current?.scrollIntoView({ behavior: 'smooth'})
  }
  const sendMessage = async (message: { content: string }) => {
    await props.sendMessage(message)
    reset()
    await loadMessages()
    scrollToBottom()
  }
  useEffect(() => {
    const timer = setInterval(() => {
      loadMessages()
    }, 5000);

    return () => clearInterval(timer);
  })

  const messageList = messages.map((messageProps: MessageProps, index: number) => {
    return (
      <Message key={index} {...messageProps} />
    )
  });

  return (
    <Fragment>
      <List className={classes.messages}>
        {messageList}
        <div ref={messagesRef} />
      </List>
      <Divider />
      <List>
        <ListItem>
          <form onSubmit={handleSubmit(sendMessage)} className={classes.form} noValidate>
            <TextField required fullWidth id="content" name="content" inputRef={register({ required: true })} variant="outlined" InputLabelProps={{ shrink: true }} />
          </form>
        </ListItem>
      </List>
    </Fragment>
  );
}
