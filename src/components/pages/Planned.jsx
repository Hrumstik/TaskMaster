import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import InputField from "../inputField/InputField";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import TaskListItem from "../TaskListItem/TaskListItem";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import useFeatures from "../../hooks/useFeatures";
import useRenderTasks from "../../hooks/useRenderTasks";
import useGroupTasks from "../../hooks/useGroupTasks";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

const AppContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
`;

const MainContainer = styled(Box)`
  width: 75%;
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

export default function Planned() {
  const tasks = useSelector(({ tasks }) => tasks.tasks);
  const stateOfInput = useSelector(({ input }) => input);

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
  } = useGroupTasks(tasks);

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
      : todayTasks;

  const renderingTommorovTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTomorrowTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTomorrowTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTomorrowTasksWithImportance
      : tomorrowTasks;

  const renderingDayAfterTommorovTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyDayAfterTommorowTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantDayAfterTommorowTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyDayAfterTommorowTasksWithImportance
      : dayAfterTommorowTasks;

  const renderingNextWeekTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyNextWeekTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantNextWeekTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyNextWeekTasksWithImportance
      : nextWeekTasks;

  const renderingTasksWithoutDate =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTasksWithoutDate
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTasksWithoutDate
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTasksWithoutDateWithImportance
      : tasksWithoutDate;

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer>
        <Header
          text="Planned"
          icon={
            <DateRangeOutlinedIcon
              sx={{ fontSize: 40, color: "icons.secondary" }}
            />
          }
        />

        <ContentContainer>
          {tasks.length || stateOfInput ? (
            <Box sx={{ height: "100%" }}>
              {todayTasks.length && checkTheStatusOfTask(todayTasks) ? (
                <Box sx={{ mb: "20px" }}>
                  <DateTitle color="text.primary" variant="h5">
                    Today tasks:
                  </DateTitle>
                  {renderTasks(renderingTodayTasks)}
                </Box>
              ) : null}

              {tomorrowTasks.length && checkTheStatusOfTask(tomorrowTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Tomorrow tasks:
                  </DateTitle>
                  {renderTasks(renderingTommorovTasks)}
                </Box>
              ) : null}

              {dayAfterTommorowTasks.length &&
              checkTheStatusOfTask(dayAfterTommorowTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Day after tomorrow tasks:
                  </DateTitle>
                  {renderTasks(renderingDayAfterTommorovTasks)}
                </Box>
              ) : null}

              {nextWeekTasks.length && checkTheStatusOfTask(nextWeekTasks) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Next week tasks:
                  </DateTitle>
                  {renderTasks(renderingNextWeekTasks)}
                </Box>
              ) : null}

              {tasksWithoutDate.length &&
              checkTheStatusOfTask(tasksWithoutDate) ? (
                <Box>
                  <DateTitle color="text.primary" variant="h5">
                    Tasks without date:
                  </DateTitle>
                  {renderTasks(renderingTasksWithoutDate)}
                </Box>
              ) : null}

              {otherTaks.length ? (
                <Box>
                  {otherTaks.map((task, i) => {
                    if (!task.done) {
                      return (
                        <>
                          <DateTitle color="text.primary" variant="h5">
                            Task for the date {task.date}:
                          </DateTitle>
                          <TaskListItem text={task.name} key={i} />
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Box>
              ) : null}
            </Box>
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
