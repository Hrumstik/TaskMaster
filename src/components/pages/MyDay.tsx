import React from "react";
import { useSelector } from "react-redux";
import useFeatures from "../../hooks/useFeatures";
import useRenderTasks from "../../hooks/useRenderTasks";
import useGroupTasks from "../../hooks/useGroupTasks";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import Menu from "../Menu/Menu";
import { Header } from "../Header/Header";
import { Box } from "@mui/material";
import InputField from "../inputField/InputField";
import { DoneTasksList } from "../DoneTasksList/DoneTasksList";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
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

export default function MyDay() {
  const tasks = useSelector(({ tasks }) => tasks.tasks);

  const stateOfInput = useSelector(({ input }) => input);

  const theme = useTheme();

  const {
    todayTasks,
    sortedAlphabeticallyTodayTasks,
    importantTodayTasks,
    sortedAlphabeticallyTodayTasksWithImportance,
  } = useGroupTasks(tasks);

  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();

  const { renderTasks } = useRenderTasks();

  const renderingTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyTodayTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantTodayTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyTodayTasksWithImportance
      : todayTasks;

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer>
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
          {todayTasks.length || stateOfInput ? (
            <Box sx={{ height: "100%" }}>
              {renderTasks(renderingTasks)}
              <DoneTasksList tasksArray={todayTasks} />
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
