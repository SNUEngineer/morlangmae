import React, { useEffect, useState, useRef, Fragment } from "react";
import { useForm } from "react-hook-form";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Message, { MessageData } from "./Message";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import threadStyle from "./thread.module.scss";
import { TextArea } from "../customizedComponent/TextArea";
import Button from "@material-ui/core/Button";
import sendIcon from "../../resources/icons/thread_send_icon.png";

export interface ThreadProps {
  messages: MessageData[];
  sendMessage(message: { content: string }): Promise<void>;
  loadMessages(): Promise<MessageData[]>;
}

export interface ThreadData {
  message: MessageData[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messages: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      minHeight: 400,
      overflowX: "scroll",
    },
    inline: {
      display: "inline",
    },
    form: {
      width: "100%",
    },
    send_button: {
      width: "100%",
      height: "100%",
    },
  })
);

export default function Thread(props: ThreadProps) {
  const [messages, setMessages] = useState(props.messages);
  const messagesRef = useRef<any>(null);
  const classes = useStyles();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [currentMessages, setCurrentMessages] = useState();

  const loadMessages = async () => {
    const messages = await props.loadMessages();
    setMessages(messages);
  };
  const scrollToBottom = () => {
    messagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async (message: { content: string }) => {
    console.log("send message");
    await props.sendMessage(message);
    reset();
    await loadMessages();
    scrollToBottom();
  };
  useEffect(() => {
    const timer = setInterval(() => {
      //loadMessages()
    }, 5000);

    return () => clearInterval(timer);
  });
  useEffect(() => {
    register({ name: "content" }, { required: true, min: 1 }); // custom register Antd input
  }, [register]);
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue(name, value);
  };

  const messageList = messages.map(
    (messageData: MessageData, index: number) => {
      return <Message key={index} messageData={messageData} />;
    }
  );

  const test = {
    displayName: "송병근",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    companyId: "World Plus CNC",
    createdDate: "오전 9:05, 8월 8일 생성",
    subtitle: "현지인 들이 추천하는",
    title: "1차 기획 회의",
  };

  return (
    <Fragment>
      <div className={threadStyle.thread_container}>
        <div className={threadStyle.divider} />
        <div className={threadStyle.title_container}>
          <div className={threadStyle.subtitle}>{test.subtitle}</div>
          <div className={threadStyle.title}>{test.title}</div>
        </div>
        <div className={threadStyle.divider} />
        <div className={threadStyle.messages_container}>{messageList}</div>
        <div ref={messagesRef} />
        <List>
          <ListItem>
            <form
              onSubmit={handleSubmit(sendMessage)}
              className={classes.form}
              noValidate
            >
              <div className={threadStyle.text_area_container}>
                <div className={threadStyle.text_area}>
                  <TextArea
                    name={"content"}
                    inline
                    width="100%"
                    height="100px"
                    maxHeight="200px"
                    textSize={14}
                    fontFamily={"Noto Sans CJK KR Regular"}
                    padding={10}
                    textareaRef={register({ required: true })}
                    onChange={handleChange}
                  />
                </div>

                <div className={threadStyle.send_area}>
                  <div className={threadStyle.align_container}>
                    {/* <div className={threadStyle.send_button_container} onClick={()=>{
                      //  sendMessage(message: { content: string });
                       sendMessage({message : {content : }})
                    }}>
                      <img alt={"icon"} className={threadStyle.send_button} />
                    </div> */}
                    <div className={threadStyle.send_button_container}>
                      <Button type="submit" className={classes.send_button}>
                        <img alt={"icon"} className={threadStyle.send_button} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </ListItem>
        </List>
      </div>
    </Fragment>
  );
}
