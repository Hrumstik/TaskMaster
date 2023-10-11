import React from "react";
import { DoneTasksList } from "../DoneTasksList/DoneTasksList";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import InputField from "../inputField/InputField";
import Menu from "../Menu/Menu";
import { Header } from "../Header/Header";
import { useSelector } from "react-redux";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
import useFeatures from "../../hooks/useFeatures";
import useAuth from "../../hooks/use-auth";
import { Box } from "@mui/material";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { Task, UseGroupTasksTypes } from "../../types/types";

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

export default function Important() {
  const tasks: Task[] = useSelector(({ tasks }) => tasks.tasks);
  const stateOfInput: boolean = useSelector(({ input }) => input);

  const theme = useTheme();

  const { isTaskOwnedByCurrentUser } = useAuth();

  const {
    importantAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
  }: UseGroupTasksTypes = useGroupTasks(tasks);
  const { renderTasks } = useRenderTasks();
  const { sortTasksAlphabeticallyState } = useFeatures();
  const renderingTasks = sortTasksAlphabeticallyState
    ? sortedAlphabeticallyAllTasksWithImportance
    : importantAllTasks.filter((task) => isTaskOwnedByCurrentUser(task));

  useAuth();

  return (
    <AppContainer theme={theme}>
      <Menu />
      <MainContainer>
        <Header
          text="Important"
          icon={
            <StarOutlineOutlinedIcon
              sx={{ fontSize: 40, color: "icons.secondary" }}
            />
          }
        />

        <ContentContainer>
          {renderingTasks.length || stateOfInput ? (
            <Box sx={{ height: "100%" }}>
              {renderTasks(renderingTasks)}
              <DoneTasksList tasksArray={importantAllTasks} />
            </Box>
          ) : (
            <NoTaskScreen
              firstTitle="You have"
              secondTitle="no important"
              thirdTitle="tasks"
              icon={
                <RemoveDoneIcon
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
