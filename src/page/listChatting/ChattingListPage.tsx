// @ts-nocheck
import React, { useState } from "react"; 
import ChattingCard, { 
  ChattingData,
} from "../../components/chatting/ChattingCard";
import Grid from "@material-ui/core/Grid";
import { unpinChatting } from "../../services/chatting.service";
import chattingStyle from "./ChattingListPage.module.scss";
import Header from "../../components/layout/Header/Header"; 

// import Slider from "../../components/customizedComponent/Carousel";
 
export interface ChattingListPageProps {  
  chattings: ChattingData[]; 
  onChattingClick(data: ChattingData): Promise<void>;
  pinChatting(id: number): Promise<void>;
  unpinChatting(id: number): Promise<void>;
  chattingSortType: string;
}
  
export default function ChattingListPage(props: ChattingListPageProps) {
  const {
    chattings,
    onChattingClick,
    pinChatting,
  } = props;
  
  return (
    <div className={chattingStyle.tab_container}>
    
      <ChattingCardList
        myChattings={chattings}
        onChattingClick={onChattingClick}
        pinChatting={pinChatting}
        unpinChatting={unpinChatting}
      />
    </div>
  );
}

export interface ChattingCardListProps {
  myChattings: ChattingData[];
  onChattingClick(data: ChattingData): Promise<void>;
  pinChatting(id: number): Promise<void>;
  unpinChatting(id: number): Promise<void>;
}


export function ChattingCardList(props: ChattingCardListProps) {
  //header와
  const myChattings = props.myChattings;


  const [filter, setFilter] = useState<string>("ALL");
  const options = [
    {
      value: "ALL",
      text: "전체",
    },
    {
      value: "IN_PROGRESS",
      text: "진행",
    },
    {
      value: "DONE",
      text: "완료",
    },
  ];
  const handleChange = (event: any) => { 
    setFilter(event.target.value);
  };
  
  const filteredChattings = myChattings.filter((data: ChattingData) => {
    return filter === "ALL" || data.status.toString() === filter;
  }); 
 

 
  const chattingCards = filteredChattings.map(
    (chatting: ChattingData, index) => {
      
      return (
        <div className={chattingStyle.my_chatting_list_container}>
          <ChattingCard
                key={index}
                data={chatting}
                viewType={"WIDE"}
                pinned={false}
                pinChatting={props.pinChatting}
                unpinChatting={props.unpinChatting}
                
              />
        </div>
      );
    }
  );

  const headerSorted = () => {
    //종류에 따른 header의 title 관리
    const chattingSortType = "SENT";
    const title = (type) => {
      switch (type) {
       
        case "SENT":
          return "보낸 쪽지";
        case "RECEIVED":
          return "받은 쪽지";
       
      }
    };

    return (
      <Header
        title={title(chattingSortType)}
        handleChange={handleChange}
        filter={filter}
        subMenuType={"filter"}
        options={options}
      />
    );
  };

  return (
    <div className={chattingStyle.chatting_container}>
      {headerSorted()}
      <div className={chattingStyle.chatting_list_container}>
        <Grid container>{chattingCards}</Grid>
      </div>
    </div>
  );
}
