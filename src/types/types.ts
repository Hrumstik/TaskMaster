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
}

export interface Error {
  status: boolean;
  message: string;
}

export type Tasks = Task[];
