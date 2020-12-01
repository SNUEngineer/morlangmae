//@ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from "react";
import commentStyle from "./commentArea.module.scss";
import { TextArea } from "../../../../components/customizedComponent/TextArea";
import Message, { MessageData } from "../../../../components/thread/Message";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    send_button: {
      width: "100%",
      height: "100%",
    },
  })
);

export default function CommentArea(props: any) {
  //메모 아이템에 대한 comment를 남김.
  //한번 생성된 이후에는 memo item과 독립적으로 작동하며, message write, read 가능
  const { memoItemData, sendMessage } = props;
  const classes = useStyles();

  const textAttaches = ["asdf", "afafa"];
  const [message, setMessage] = useState<MessageData>({
    type: "TEXT",
    attaches: textAttaches,
  });
  const handleSendMessage = async () => {
    console.log("messagemessage " + JSON.stringify(message));
    await props.sendMessage(memoItemData.id, message);
    //scrollToBottom();
    await setMessage((prevState) => ({ ...prevState, content: "" }));
  };

  const messageList = useCallback(() => {
    return memoItemData?.memoItemMessages.map(
      (item: MessageData, index: number) => {
        const messageData = {
          sender: item.sender,
          sentAt: item.sentAt,
          content: {
            content: item.content,
          },
        };
        return <Message key={index} messageData={messageData} />;
      }
    );
  }, [memoItemData]);
  const handleTextContentChange = (e: any) => {
    const value = e.target.value;
    setMessage((prevState) => ({ ...prevState, content: value }));
  };

  return (
    <div
      className={commentStyle.memo_comment_container}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      <div className={commentStyle.memo_comment}>{messageList()}</div>

      <div className={commentStyle.memo_comment_text_area}>
        <div className={commentStyle.text_area}>
          <TextArea
            name={"content"}
            inline
            width="100%"
            height="45px"
            maxHeight="70px"
            textSize={12}
            fontFamily={"Noto Sans CJK KR Regular"}
            padding={5}
            onChange={handleTextContentChange}
            value={message.content}
          />
        </div>

        <div className={commentStyle.send_area}>
          <div className={commentStyle.align_container}>
            <div className={commentStyle.send_button_container}>
              <Button
                type="submit"
                className={classes.send_button}
                onClick={handleSendMessage}
              >
                <img alt={"icon"} className={commentStyle.send_button} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
