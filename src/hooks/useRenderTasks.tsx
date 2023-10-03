import React from "react";
import { TaskListItem } from "../components/TaskListItem/TaskListItem";

interface Task {
  id: string;
  name: string;
  date: null | string;
  done: boolean;
  important: boolean;
}

export default function useRenderTasks() {
  const renderTasks = (specialTasksArray: Task[]) => {
    return specialTasksArray.map((task, i) => {
      if (!task.done) {
        return <TaskListItem text={task.name} key={task.id} />;
      } else {
        return null;
      }
    });
  };

  const checkTheStatusOfTask = (arr: Task[]) => {
    return arr.some(({ done }) => !done);
  };

  return {
    renderTasks,
    checkTheStatusOfTask,
  };
}
