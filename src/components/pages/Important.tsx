import React from "react";

import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import styled from "styled-components";

import useAuth from "../../hooks/use-auth";
import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
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

  const {
    importantAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
    isTaskOwnedByCurrentUser,
  }: UseGroupTasksTypes = useGroupTasks(tasks);

  const { renderTasks } = useRenderTasks();
  const { sortTasksAlphabeticallyState } = useFeatures();
  const renderingTasks = sortTasksAlphabeticallyState
    ? sortedAlphabeticallyAllTasksWithImportance.filter(
        (task: Task) => !task.done
      )
    : importantAllTasks.filter(
        (task) => isTaskOwnedByCurrentUser(task) && !task.done
      );

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
