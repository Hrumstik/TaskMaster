import React, { useMemo } from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/Header/Header";
import InputField from "../components/inputField/InputField";
import Menu from "../components/Menu/Menu";
import NoTaskScreen from "../components/NoTaskScreen/NoTaskScreen";
import { TaskListItem } from "../components/TaskListItem/TaskListItem";
import useFeatures from "../hooks/useFeatures";
import useGroupTasks from "../hooks/useGroupTasks";
import useRenderTasks from "../hooks/useRenderTasks";
import useScreenSize from "../hooks/useScreenSize";
import { Task, UseGroupTasksTypes } from "../types/types";

const AppContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
`;

const MainContainer = styled(Box)<any>`
  width: ${({ $ismobile }) => ($ismobile ? "75%" : "87%")};
`;

const ContentContainer = styled(Box)`
  height: 86%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
`;

const DateTitle = styled(Typography)`
  padding-left: 45px;
`;

const TasksContainer = styled(Box)`
  height: 100%;
`;

export default function Planned() {
  const tasks: Task[] = useSelector(({ tasks }) => tasks.tasks);
  const stateOfInput: boolean = useSelector(({ input }) => input);

  const {
    todayTasks,
    tomorrowTasks,
    dayAfterTommorowTasks,
    nextWeekTasks,
    tasksWithoutDate,
    otherTaks,
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
    sortedAlphabeticallyTasksWithoutDate,
    importantTasksWithoutDate,
    sortedAlphabeticallyTasksWithoutDateWithImportance,
    unfinishedTasks,
    isTaskOwnedByCurrentUser,
  }: UseGroupTasksTypes = useGroupTasks(tasks);

  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();
  const { renderTasks, checkTheStatusOfTask } = useRenderTasks();

  const theme = useTheme();

  const renderingTodayTasks = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTodayTasks;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantTodayTasks;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTodayTasksWithImportance;
    } else {
      sortedTasks = todayTasks;
    }

    return sortedTasks.filter(({ done }) => !done);
  }, [
    importantTodayTasks,
    sortTasksAlphabeticallyState,
    todayTasks,
    showImportantTasksState,
    sortedAlphabeticallyTodayTasksWithImportance,
    sortedAlphabeticallyTodayTasks,
  ]);

  const renderingTommorovTasks = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTomorrowTasks;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantTomorrowTasks;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTomorrowTasksWithImportance;
    } else {
      sortedTasks = tomorrowTasks.filter(({ done }) => !done);
    }

    return sortedTasks;
  }, [
    importantTomorrowTasks,
    sortTasksAlphabeticallyState,
    tomorrowTasks,
    showImportantTasksState,
    sortedAlphabeticallyTomorrowTasksWithImportance,
    sortedAlphabeticallyTomorrowTasks,
  ]);

  const renderingDayAfterTommorovTasks = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyDayAfterTommorowTasks;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantDayAfterTommorowTasks;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyDayAfterTommorowTasksWithImportance;
    } else {
      sortedTasks = dayAfterTommorowTasks.filter(({ done }) => !done);
    }

    return sortedTasks;
  }, [
    importantDayAfterTommorowTasks,
    sortTasksAlphabeticallyState,
    dayAfterTommorowTasks,
    showImportantTasksState,
    sortedAlphabeticallyDayAfterTommorowTasksWithImportance,
    sortedAlphabeticallyDayAfterTommorowTasks,
  ]);

  const renderingNextWeekTasks = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyNextWeekTasks;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantNextWeekTasks;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyNextWeekTasksWithImportance;
    } else {
      sortedTasks = nextWeekTasks.filter(({ done }) => !done);
    }

    return sortedTasks;
  }, [
    importantNextWeekTasks,
    sortTasksAlphabeticallyState,
    nextWeekTasks,
    showImportantTasksState,
    sortedAlphabeticallyNextWeekTasksWithImportance,
    sortedAlphabeticallyNextWeekTasks,
  ]);

  const renderingTasksWithoutDate = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTasksWithoutDate;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantTasksWithoutDate;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyTasksWithoutDateWithImportance;
    } else {
      sortedTasks = tasksWithoutDate.filter(({ done }) => !done);
    }

    return sortedTasks;
  }, [
    importantTasksWithoutDate,
    sortTasksAlphabeticallyState,
    tasksWithoutDate,
    showImportantTasksState,
    sortedAlphabeticallyTasksWithoutDateWithImportance,
    sortedAlphabeticallyTasksWithoutDate,
  ]);

  const renderindOtherTasks = otherTaks.filter(
    (task) => isTaskOwnedByCurrentUser(task) && !task.done
  );

  const actualForUserUnfinishedTasks = unfinishedTasks.filter((task) =>
    isTaskOwnedByCurrentUser(task)
  );

  const { isMobile } = useScreenSize();

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer $isMobile={Boolean(isMobile)}>
        <Header
          text="Planned"
          icon={
            <DateRangeOutlinedIcon
              sx={{ fontSize: 40, color: "icons.secondary" }}
            />
          }
        />

        <ContentContainer>
          {actualForUserUnfinishedTasks.length || stateOfInput ? (
            <TasksContainer>
              {renderingTodayTasks.length &&
              checkTheStatusOfTask(todayTasks) ? (
                <Box sx={{ mb: "20px" }}>
                  <DateTitle color="text.primary" variant="h5">
                    Today tasks:
                  </DateTitle>
                  {renderTasks(renderingTodayTasks)}
                </Box>
              ) : null}

              {renderingTommorovTasks.length &&
              checkTheStatusOfTask(tomorrowTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Tomorrow tasks:
                  </DateTitle>
                  {renderTasks(renderingTommorovTasks)}
                </Box>
              ) : null}

              {renderingDayAfterTommorovTasks.length &&
              checkTheStatusOfTask(dayAfterTommorowTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Day after tomorrow tasks:
                  </DateTitle>
                  {renderTasks(renderingDayAfterTommorovTasks)}
                </Box>
              ) : null}

              {renderingNextWeekTasks.length &&
              checkTheStatusOfTask(nextWeekTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Next week tasks:
                  </DateTitle>
                  {renderTasks(renderingNextWeekTasks)}
                </Box>
              ) : null}

              {renderingTasksWithoutDate.length &&
              checkTheStatusOfTask(tasksWithoutDate) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Tasks without date:
                  </DateTitle>
                  {renderTasks(renderingTasksWithoutDate)}
                </Box>
              ) : null}

              {renderindOtherTasks.length ? (
                <Box>
                  {renderindOtherTasks.map((task) => {
                    if (!task.done) {
                      return (
                        <React.Fragment key={task.id}>
                          <DateTitle color="text.primary" variant="h5">
                            Task for the date {task.date}:
                          </DateTitle>
                          <TaskListItem
                            checked={task.done}
                            text={task.name}
                            key={task.id}
                          />
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Box>
              ) : null}
            </TasksContainer>
          ) : (
            <NoTaskScreen
              firstTitle="You"
              secondTitle="don't have any"
              thirdTitle="planned tasks."
              icon={
                <SentimentSatisfiedIcon
                  sx={{
                    fontSize: 300,
                    display: "flex",
                    alignSelf: "center",
                    color: "icons.secondary",
                  }}
                />
              }
            />
          )}

          <InputField />
        </ContentContainer>
      </MainContainer>
    </AppContainer>
  );
}
