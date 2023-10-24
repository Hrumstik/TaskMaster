import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

import { DateState, Tasks, User } from "../types/types";

export function sortTasksAlphabetically(arr: Tasks) {
  return [...arr].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

export function showImportantTasks(arr: Tasks) {
  return arr.filter(({ important }) => {
    return important;
  });
}

export const sortAlphabeticallyTasksWithImportance = (
  tasksWithImportance: Tasks
) => {
  return [...tasksWithImportance].sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};

export const sortUnfinishedTasks = (arr: Tasks) => {
  return arr.filter(({ done }) => !done);
};

export const makeAnObjectForNewTask = (
  taskName: string,
  userIds: string[],
  userId: string,
  dateState: DateState,
  important: boolean
) => {
  const formatTaskData = () =>
    dateState.dateIconClicked
      ? dayjs(dateState.dateOfNewTask).format("DD.MM.YYYY")
      : null;

  return {
    id: uuidv4(),
    userId: userIds.length > 0 ? userIds : userId,
    name: taskName,
    date: formatTaskData(),
    done: false,
    important,
  };
};

export const determineUserIdFromLogin = (
  responsibleForTheTaskUser: string[],
  availableUsers: User[]
) => {
  return responsibleForTheTaskUser
    .map((login) => {
      const user = availableUsers.find((u) => u.login === login);
      return user ? user.id : "";
    })
    .filter(Boolean);
};

export const validateText = (text: string) => {
  return text.length > 2 && text.trim().length > 2;
};
