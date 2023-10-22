import { Dispatch, SetStateAction } from "react";

import { Theme } from "@mui/material/styles";
import { DateRange } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";

export interface Task {
  id: string;
  userId: string | string[];
  name: string;
  date: null | string;
  done: boolean;
  important: boolean;
}

export interface ArrayTasksProps {
  tasksArray: Task[];
}

export interface User {
  email: string | null;
  login?: string;
  token: string | null;
  id: string | null;
}

export interface Authentication {
  user: User;
  auth: boolean;
}

export interface UseGroupTasksTypes {
  todayTasks: Task[];
  tomorrowTasks: Task[];
  dayAfterTommorowTasks: Task[];
  nextWeekTasks: Task[];
  tasksWithoutDate: Task[];
  otherTaks: Task[];
  importantAllTasks: Task[];
  sortedAlphabeticallyAllTasks: Task[];
  sortedAlphabeticallyAllTasksWithImportance: Task[];
  sortedAlphabeticallyTodayTasks: Task[];
  importantTodayTasks: Task[];
  sortedAlphabeticallyTodayTasksWithImportance: Task[];
  sortedAlphabeticallyTomorrowTasks: Task[];
  importantTomorrowTasks: Task[];
  sortedAlphabeticallyTomorrowTasksWithImportance: Task[];
  sortedAlphabeticallyDayAfterTommorowTasks: Task[];
  importantDayAfterTommorowTasks: Task[];
  sortedAlphabeticallyDayAfterTommorowTasksWithImportance: Task[];
  sortedAlphabeticallyNextWeekTasks: Task[];
  importantNextWeekTasks: Task[];
  sortedAlphabeticallyNextWeekTasksWithImportance: Task[];
  sortedAlphabeticallyOtherTaks: Task[];
  importantOtherTaks: Task[];
  sortedAlphabeticallyOtherTaksWithImportance: Task[];
  sortedAlphabeticallyTasksWithoutDate: Task[];
  importantTasksWithoutDate: Task[];
  sortedAlphabeticallyTasksWithoutDateWithImportance: Task[];
  unfinishedTasks: Task[];
  overdueTasks: Task[];
  isTaskOwnedByCurrentUser: Function;
}

export interface Error {
  status: boolean;
  message: string;
}

export type Tasks = Task[];

export interface SearchPanelType {
  foundTasks: Task[];
  theme: Theme;
  ismobile: boolean;
  istablet: boolean;
}

export interface FilterButtonType {
  isActive: string | boolean;
  theme: Theme;
}

export interface AssignedTask {
  showSelectUser: boolean;
  responsibleForTheTaskUser: string[];
  availableUsers: User[];
}

export interface DateState {
  dateOfNewTask: Dayjs | null;
  showCalendar: boolean;
  dateIconClicked: boolean;
}

export interface ListItemProps {
  text: string;
  path: string;
  icon: React.ReactNode;
}

export interface AssignTaskButtonProps {
  setError: Dispatch<SetStateAction<boolean>>;
  assignedTask: AssignedTask;
  setAssignedTask: Dispatch<SetStateAction<AssignedTask>>;
}

export interface ChangeTaskNameButtonProps {
  setChangingTheNameOfTask: Dispatch<SetStateAction<boolean>>;
  setFocusedTask: Dispatch<SetStateAction<boolean>>;
}

export interface ChangeTaskNameInputProps {
  text: string;
  indexOfTheTask: number;
  idOfTheTask: string;
  setChangingTheNameOfTask: Dispatch<SetStateAction<boolean>>;
}

export interface DateTaskButtonProps {
  idOfTheTask: string;
  indexOfTheTask: number;
  setFocusedTask: Dispatch<SetStateAction<boolean>>;
}

export interface DeleteTaskButtonProps {
  idOfTheTask: string;
  text: string;
}

export interface HeaderProps {
  text: string;
  icon: React.ReactNode;
}

export interface ImportanceButtonProps {
  text: string;
  idOfTheTask: string;
  indexOfTheTask: number;
}

export interface SearchInputProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  isActiveButton: string;
  actualTaskArray: Tasks;
  setFoundTasks: Dispatch<SetStateAction<Tasks>>;
  filterDateValue: DateRange<Dayjs>;
  searchTasks: (searchValue: string, arrTasks: Tasks) => Tasks;
  sortByPeriod: (firstDate: Dayjs, secondDate: Dayjs) => Tasks;
}

export interface TaskListItemProps {
  text: string;
  checked: boolean;
}

export interface BodyRequest {
  email: string;
  login: string;
  id: string;
}
