import React from "react";

import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "styled-components";

import useAuth from "../../hooks/use-auth";
import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
import useScreenSize from "../../hooks/useScreenSize";
import { Task, UseGroupTasksTypes } from "../../types/types";
import { DoneTasksList } from "../DoneTasksList/DoneTasksList";
import { Header } from "../Header/Header";
import InputField from "../inputField/InputField";
import Menu from "../Menu/Menu";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";

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

export default function MyDay() {
  useAuth();
  const tasks: Task[] = useSelector(({ tasks }) => tasks.tasks);

  const stateOfInput: boolean = useSelector(({ input }) => input);

  const theme = useTheme();

  const {
    todayTasks,
    sortedAlphabeticallyTodayTasks,
    importantTodayTasks,
    sortedAlphabeticallyTodayTasksWithImportance,
    isTaskOwnedByCurrentUser,
  }: UseGroupTasksTypes = useGroupTasks(tasks);

  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();

  const { renderTasks } = useRenderTasks();

  const { isMobile } = useScreenSize();

  const renderingTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTodayTasks.filter((task: Task) => !task.done)
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTodayTasks.filter((task: Task) => !task.done)
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTodayTasksWithImportance
      : todayTasks.filter(
          (task) => isTaskOwnedByCurrentUser(task) && !task.done
        );

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer isMobile={isMobile ? true : false}>
        <Header
          text="My day"
          icon={
            <WbSunnyOutlinedIcon
              sx={{
                fontSize: 40,
                color: "icons.secondary",
              }}
            />
          }
        />

        <ContentContainer>
          {renderingTasks.length || stateOfInput ? (
            <Box sx={{ height: "100%" }}>
              {renderTasks(renderingTasks)}
              <DoneTasksList tasksArray={renderingTasks} />
            </Box>
          ) : (
            <NoTaskScreen
              firstTitle="You have"
              secondTitle="no tasks"
              thirdTitle="for this day."
              icon={
                <AccessibilityNewIcon
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
