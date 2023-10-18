import React from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "styled-components";

import useAuth from "../../hooks/use-auth";
import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
import useScreenSize from "../../hooks/useScreenSize";
import { Task, UseGroupTasksTypes } from "../../types/types";
import { Header } from "../Header/Header";
import InputField from "../inputField/InputField";
import Menu from "../Menu/Menu";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import { TaskListItem } from "../TaskListItem/TaskListItem";

const AppContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
`;

const MainContainer = styled(Box)<any>`
  width: ${({ ismobile }) => (ismobile ? "92%" : "75%")};
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

  const renderingTodayTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTodayTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTodayTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTodayTasksWithImportance
      : todayTasks.filter(
          (task) => isTaskOwnedByCurrentUser(task) && !task.done
        );

  const renderingTommorovTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTomorrowTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTomorrowTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTomorrowTasksWithImportance
      : tomorrowTasks.filter(
          (task) => isTaskOwnedByCurrentUser(task) && !task.done
        );

  const renderingDayAfterTommorovTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyDayAfterTommorowTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantDayAfterTommorowTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyDayAfterTommorowTasksWithImportance
      : dayAfterTommorowTasks.filter(
          (task) => isTaskOwnedByCurrentUser(task) && !task.done
        );

  const renderingNextWeekTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyNextWeekTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantNextWeekTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyNextWeekTasksWithImportance
      : nextWeekTasks.filter((task) => isTaskOwnedByCurrentUser(task));

  const renderingTasksWithoutDate =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTasksWithoutDate
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTasksWithoutDate
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTasksWithoutDateWithImportance
      : tasksWithoutDate.filter(
          (task) => isTaskOwnedByCurrentUser(task) && !task.done
        );

  const renderindOtherTasks = otherTaks.filter(
    (task) => isTaskOwnedByCurrentUser(task) && !task.done
  );

  useAuth();

  const actualForUserUnfinishedTasks = unfinishedTasks.filter((task) =>
    isTaskOwnedByCurrentUser(task)
  );

  const { isMobile } = useScreenSize();

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer ismobile={isMobile}>
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
                        <>
                          <DateTitle color="text.primary" variant="h5">
                            Task for the date {task.date}:
                          </DateTitle>
                          <TaskListItem
                            checked={task.done}
                            text={task.name}
                            key={task.id}
                          />
                        </>
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
