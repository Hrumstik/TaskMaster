import React from "react";

import { TaskListItem } from "../components/TaskListItem/TaskListItem";
import { Tasks } from "../types/types";

import useAuth from "./use-auth";

export default function useRenderTasks() {
  const { isTaskOwnedByCurrentUser } = useAuth();

  const renderTasks = (specialTasksArray: Tasks) => {
    return specialTasksArray.map((task) => {
      if (isTaskOwnedByCurrentUser(task)) {
        return (
          <TaskListItem checked={task.done} text={task.name} key={task.id} />
        );
      }
    });
  };

  const checkTheStatusOfTask = (arr: Tasks) => {
    return arr.some(({ done }) => !done);
  };

  return {
    renderTasks,
    checkTheStatusOfTask,
  };
}
