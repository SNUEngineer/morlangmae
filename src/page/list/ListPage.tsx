// @ts-nocheck
import React, { useState } from "react";
import TaskCard, { taskData } from "../../components/task/TaskCard";
import Grid from "@material-ui/core/Grid";
import { unpinTask } from "../../services/task.service";
import pageStyle from "./ListPage.module.scss";
import Header from "../../components/layout/Header/Header";
import FloatingMenu from "../../components/customizedComponent/FloatingMenu/FloatingMenu";

// import Slider from "../../components/customizedComponent/Carousel";
export interface ListPageProps {
  tasks: taskData[];
  onTaskClick(data: taskData): Promise<void>;
  onTaskMenuClick(data: taskData): Promise<void>;
  pinTask(id: number): Promise<void>;
  unpinTask(id: number): Promise<void>;
  taskSortType: string;
}

export default function ListPage(props: ListPageProps) {
  const { tasks, onTaskMenuClick, onTaskClick, pinTask } = props;

  return (
    <div className={pageStyle.tab_container}>
      <TaskCardList
        myTasks={tasks}
        onTaskClick={onTaskClick}
        onTaskMenuClick={onTaskMenuClick}
        pinTask={pinTask}
        unpinTask={unpinTask}
      />
    </div>
  );
}

export interface TaskCardListProps {
  myTasks: taskData[];
  onTaskClick(data: taskData): Promise<void>;
  onTaskMenuClick(data: taskData): Promise<void>;
  pinTask(id: number): Promise<void>;
  unpinTask(id: number): Promise<void>;
}

export function TaskCardList(props: TaskCardListProps) {
  //header와
  const { myTasks, onTaskClick, onTaskMenuClick, pinTask } = props;
  const listType = "LIST";
  const [filter, setFilter] = useState("ALL");
  const options = [
    {
      value: "ALL",
      text: "전체",
    },
    {
      value: "DRAFT",
      text: "생성됨",
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

  const filteredTasks = myTasks.filter((data: taskData) => {
    return filter === "ALL" || data.status.toString() === filter;
  });

  const TaskCards = filteredTasks.map((task: taskData, index) => {
    return (
      <div className={pageStyle.my_task_list_container}>
        <TaskCard
          key={index}
          data={task}
          viewType={"WIDE"}
          pinned={false}
          onTaskClick={onTaskClick}
          onTaskMenuClick={onTaskMenuClick}
          pinTask={pinTask}
          unpinTask={unpinTask}
        />
      </div>
    );
  });

  const headerSorted = () => {
    //종류에 따른 header의 title 관리

    const title = (type) => {
      switch (type) {
        case "LIST":
          return "LIST";
        case "TASK":
          return "TASK";
        case "NOTI":
          return "NOTIFICATION";
      }
    };

    return (
      <Header
        title={title(listType)}
        handleChange={handleChange}
        filter={filter}
        subMenuType={listType}
        options={options}
      />
    );
  };

  return (
    <div className={pageStyle.filteredTasks_container}>
      {headerSorted()}
      <div className={pageStyle.task_list_container}>
        <Grid container>{TaskCards}</Grid>
      </div>
    </div>
  );
}
