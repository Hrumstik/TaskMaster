import { useCallback } from "react";

import dayjs from "dayjs";

import { Tasks } from "../types/types";
import {
  sortTasksAlphabetically,
  showImportantTasks,
  sortAlphabeticallyTasksWithImportance,
  sortUnfinishedTasks,
} from "../utils/utils";

const useGroupTasks = (arrTasks: Tasks) => {
  const sortTasksByDate = useCallback(() => {
    const today = dayjs();
    const tomorrow = today.add(1, "day");
    const dayAfterTommorow = today.add(2, "day");
    const nextWeek = today.add(7, "day");

    const todayTasks = arrTasks.filter((task) => {
      const taskDate = dayjs(task.date, "DD.MM.YYYY");
      return taskDate.isSame(today, "day");
    });

    const tomorrowTasks = arrTasks.filter((task) => {
      const taskDate = dayjs(task.date, "DD.MM.YYYY");
      return taskDate.isSame(tomorrow, "day");
    });

    const dayAfterTommorowTasks = arrTasks.filter((task) => {
      const taskDate = dayjs(task.date, "DD.MM.YYYY");
      return taskDate.isSame(dayAfterTommorow, "day");
    });

    const nextWeekTasks = arrTasks.filter((task) => {
      const taskDate = dayjs(task.date, "DD.MM.YYYY");
      return (
        taskDate.isBefore(nextWeek, "day") &&
        taskDate.isAfter(dayAfterTommorow, "day")
      );
    });

    const overdueTasks = arrTasks.filter(({ date, done }) => {
      const taskDate = dayjs(date, "DD.MM.YYYY");
      return taskDate.isBefore(today, "day") && !done;
    });

    const tasksWithoutDate = arrTasks.filter(({ date }) => date === null);

    const unfinishedTasks = sortUnfinishedTasks(arrTasks);

    const otherTaks = arrTasks.filter((task) => {
      return ![
        todayTasks,
        tomorrowTasks,
        dayAfterTommorowTasks,
        nextWeekTasks,
        tasksWithoutDate,
      ].some((arr) => arr.includes(task));
    });

    return {
      todayTasks,
      tomorrowTasks,
      dayAfterTommorowTasks,
      nextWeekTasks,
      tasksWithoutDate,
      otherTaks,
      unfinishedTasks,
      overdueTasks,
    };
  }, [arrTasks]);

  const {
    todayTasks,
    tomorrowTasks,
    dayAfterTommorowTasks,
    nextWeekTasks,
    tasksWithoutDate,
    otherTaks,
    unfinishedTasks,
    overdueTasks,
  } = sortTasksByDate();

  const countDoneTasks = () => {
    const doneTasksCount = tasksArray.reduce((acc, task) => {
      if (isTaskOwnedByCurrentUser(task) && task.done) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setDoneTasksCount(doneTasksCount);
  };

  const importantAllTasks = showImportantTasks(arrTasks);
  const sortedAlphabeticallyAllTasks = sortTasksAlphabetically(arrTasks);
  const sortedAlphabeticallyAllTasksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantAllTasks);
  const sortedAlphabeticallyTodayTasks = sortTasksAlphabetically(todayTasks);
  const importantTodayTasks = showImportantTasks(todayTasks);
  const sortedAlphabeticallyTodayTasksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantTodayTasks);
  const sortedAlphabeticallyTomorrowTasks =
    sortTasksAlphabetically(tomorrowTasks);
  const importantTomorrowTasks = showImportantTasks(tomorrowTasks);
  const sortedAlphabeticallyTomorrowTasksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantTomorrowTasks);
  const sortedAlphabeticallyDayAfterTommorowTasks = sortTasksAlphabetically(
    dayAfterTommorowTasks
  );
  const importantDayAfterTommorowTasks = showImportantTasks(
    dayAfterTommorowTasks
  );
  const sortedAlphabeticallyDayAfterTommorowTasksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantDayAfterTommorowTasks);
  const sortedAlphabeticallyNextWeekTasks =
    sortTasksAlphabetically(nextWeekTasks);
  const importantNextWeekTasks = showImportantTasks(nextWeekTasks);
  const sortedAlphabeticallyNextWeekTasksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantNextWeekTasks);
  const sortedAlphabeticallyOtherTaks = sortTasksAlphabetically(otherTaks);
  const importantOtherTaks = showImportantTasks(otherTaks);
  const sortedAlphabeticallyOtherTaksWithImportance =
    sortAlphabeticallyTasksWithImportance(importantOtherTaks);
  const sortedAlphabeticallyTasksWithoutDate =
    sortTasksAlphabetically(tasksWithoutDate);
  const importantTasksWithoutDate = showImportantTasks(tasksWithoutDate);
  const sortedAlphabeticallyTasksWithoutDateWithImportance =
    sortAlphabeticallyTasksWithImportance(importantTasksWithoutDate);
  return {
    todayTasks,
    tomorrowTasks,
    dayAfterTommorowTasks,
    nextWeekTasks,
    tasksWithoutDate,
    otherTaks,
    importantAllTasks,
    sortedAlphabeticallyAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
    sortedAlphabeticallyTodayTasks,
    importantTodayTasks,
    sortedAlphabeticallyTodayTasksWithImportance,
    sortedAlphabeticallyTomorrowTasks,
    importantTomorrowTasks,
    sortedAlphabeticallyTomorrowTasksWithImportance,
    sortedAlphabeticallyDayAfterTommorowTasks,
    importantDayAfterTommorowTasks,
    sortedAlphabeticallyDayAfterTommorowTasksWithImportance,
    sortedAlphabeticallyNextWeekTasks,
    importantNextWeekTasks,
    sortedAlphabeticallyNextWeekTasksWithImportance,
    sortedAlphabeticallyOtherTaks,
    importantOtherTaks,
    sortedAlphabeticallyOtherTaksWithImportance,
    sortedAlphabeticallyTasksWithoutDate,
    importantTasksWithoutDate,
    sortedAlphabeticallyTasksWithoutDateWithImportance,
    unfinishedTasks,
    overdueTasks,
  };
};

export default useGroupTasks;
