import React from "react";

import { useSelector } from "react-redux";

import { TaskListItem } from "../components/TaskListItem/TaskListItem";
import { Tasks } from "../types/types";

import useGroupTasks from "./useGroupTasks";

export default function useRenderTasks() {
  const tasks: Tasks = useSelector(({ tasks }) => tasks.tasks);
  const { isTaskOwnedByCurrentUser } = useGroupTasks(tasks);

  const renderTasks = (specialTasksArray: Tasks) => {
    return specialTasksArray.map((task) => {
      if (isTaskOwnedByCurrentUser(task)) {
        return (
          <TaskListItem checked={task.done} text={task.name} key={task.id} />
        );
      } else {
        return null;
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
