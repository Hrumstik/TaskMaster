import React, { useEffect, useMemo } from "react";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import useFeatures from "../../hooks/useFeatures";
import useGlobalState from "../../hooks/useGlobalState";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
import useScreenSize from "../../hooks/useScreenSize";
import { Task } from "../../types/types";
import { DoneTasksList } from "../DoneTasksList/DoneTasksList";
import InputField from "../inputField/InputField";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import { AppDispatch } from "../store/store";
import { fetchTasks } from "../TaskListItem/tasksSlice";

const StyledMainTaskListContainer = styled(Box)<any>`
  height: 86%;
  padding-right: ${({ $isMobile }) => ($isMobile ? "0px" : "20px")};
  padding-left: ${({ $isMobile }) => ($isMobile ? "2px" : "20px")};
  display: flex;
  flex-direction: column;
`;

function TasksList() {
  const { stateOfInput, tasks, tasksStatus } = useGlobalState();
  const { isMobile } = useScreenSize();
  const {
    sortedAlphabeticallyAllTasks,
    importantAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
    isTaskOwnedByCurrentUser,
  } = useGroupTasks(tasks);
  const { renderTasks } = useRenderTasks();
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasksStatus]);

  const renderingTasks = useMemo(() => {
    let sortedTasks;
    if (sortTasksAlphabeticallyState && !showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyAllTasks;
    } else if (!sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = importantAllTasks;
    } else if (sortTasksAlphabeticallyState && showImportantTasksState) {
      sortedTasks = sortedAlphabeticallyAllTasksWithImportance;
    } else {
      sortedTasks = tasks;
    }
    return sortedTasks.filter(
      (task: Task) => !task.done && isTaskOwnedByCurrentUser(task)
    );
  }, [
    importantAllTasks,
    showImportantTasksState,
    sortTasksAlphabeticallyState,
    sortedAlphabeticallyAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
    tasks,
    isTaskOwnedByCurrentUser,
  ]);

  return (
    <StyledMainTaskListContainer $isMobile={isMobile}>
      {renderingTasks.length || stateOfInput ? (
        <Box sx={{ height: "100%" }}>
          {renderTasks(renderingTasks)}
          <DoneTasksList tasksArray={tasks} />
        </Box>
      ) : (
        <NoTaskScreen
          firstTitle="Do something"
          secondTitle="of the planned for the upcoming"
          thirdTitle="day."
          fourthTitle="Best wishes."
          icon={
            <SelfImprovementIcon
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
      <Box>
        <InputField />
      </Box>
    </StyledMainTaskListContainer>
  );
}

export default TasksList;
