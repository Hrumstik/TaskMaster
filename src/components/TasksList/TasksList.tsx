import React, { useEffect } from "react";

import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import useRenderTasks from "../../hooks/useRenderTasks";
import { Task } from "../../types/types";
import { DoneTasksList } from "../DoneTasksList/DoneTasksList";
import InputField from "../inputField/InputField";
import NoTaskScreen from "../NoTaskScreen/NoTaskScreen";
import { AppDispatch } from "../store/store";
import { fetchTasks } from "../TaskListItem/tasksSlice";

const StyledMainTaskListContainer = styled(Box)`
  height: 86%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
`;

function TasksList() {
  const tasks = useSelector(({ tasks }) => tasks.tasks);
  const tasksStatus = useSelector(({ tasks }) => tasks.status);
  const stateOfInput = useSelector(({ input }) => input);

  const {
    sortedAlphabeticallyAllTasks,
    importantAllTasks,
    sortedAlphabeticallyAllTasksWithImportance,
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

  const renderingTasks =
    sortTasksAlphabeticallyState && !showImportantTasksState
      ? sortedAlphabeticallyAllTasks
      : !sortTasksAlphabeticallyState && showImportantTasksState
      ? importantAllTasks
      : sortTasksAlphabeticallyState && showImportantTasksState
      ? sortedAlphabeticallyAllTasksWithImportance
      : tasks.filter((task: Task) => !task.done);

  return (
    <StyledMainTaskListContainer>
      {tasks.length || stateOfInput ? (
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
