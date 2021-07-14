//@ts-nocheck
import React, { useEffect, useState, useRef, Fragment } from "react";
import { useForm } from "react-hook-form";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Message, { MessageData } from "./Message";
import threadStyle from "./thread.module.scss";
import { TextArea } from "../customizedComponent/TextArea";
import Button from "@material-ui/core/Button";

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
  const textAttaches = ["asdf", "afafa"];
  const [message, setMessage] = useState<MessageData>({
    type: "TEXT",
    attaches: textAttaches,
  });
  const loadMessages = async () => {
    const messages = await props.loadMessages();
    await setMessages(messages);
  };
  const scrollToBottom = () => {
    messagesRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async () => {
    console.log("messagemessage " + JSON.stringify(message));
    await props.sendMessage(message);
    reset();
    await loadMessages();
    scrollToBottom();
    await setMessage((prevState) => ({ ...prevState, content: "" }));
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
  const handleTextContentChange = (e: any) => {
    const value = e.target.value;
    setMessage((prevState) => ({ ...prevState, content: value }));
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
    <div className={threadStyle.thread_container}>
      <div className={threadStyle.divider} />
      <div className={threadStyle.title_container}>
        <div className={threadStyle.title}>{test.title}</div>
      </div>
      <div className={threadStyle.divider} />
      <div className={threadStyle.messages_container}>
        {/* thread에서 주고받은 메세지의 리스트 */}
        {messageList}
      </div>
      <div ref={messagesRef} />
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
            onChange={handleTextContentChange}
            value={message.content}
          />
        </div>

        <div className={threadStyle.send_area}>
          <div className={threadStyle.align_container}>
            <div className={threadStyle.send_button_container}>
              <Button
                type="submit"
                className={classes.send_button}
                onClick={sendMessage}
              >
                <img alt={"icon"} className={threadStyle.send_button} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
