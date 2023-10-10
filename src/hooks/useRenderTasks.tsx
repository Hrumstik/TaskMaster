import React from "react";
import { TaskListItem } from "../components/TaskListItem/TaskListItem";
import { useSelector } from "react-redux";

interface Task {
  id: string;
  userId?: string | string[];
  name: string;
  date: null | string;
  done: boolean;
  important: boolean;
}

export default function useRenderTasks() {
  const currentUserId = useSelector(({ users }) => users.user.id);

  const renderTasks = (specialTasksArray: Task[]) => {
    return specialTasksArray.map(({ done, userId, id, name }) => {
      if (typeof userId === "string") {
        if (!done && userId === currentUserId) {
          return <TaskListItem text={name} key={id} />;
        } else {
          return null;
        }
      }

      if (Array.isArray(userId) && !done) {
        if (userId.find((id) => id === currentUserId)) {
          return <TaskListItem text={name} key={id} />;
        } else {
          return null;
        }
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
