import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import useAuth from "../../hooks/use-auth";
import { Task, ArrayTasksProps } from "../../types/types";
import "./DoneTasksList.css";

const StyledCompletedBox = styled(Box)`
  display: flex;
  gap: 22px;
  padding-left: 32px;
`;

const StyledTitleOfDoneTasks = styled(Typography)`
  cursor: pointer;
`;

export const DoneTasksList: React.FC<ArrayTasksProps> = ({ tasksArray }) => {
  const [visibilityOfDoneTasks, setVisibilityOfDoneTasks] =
    useState<boolean>(false);
  const [doneTasksCount, setDoneTasksCount] = useState<number>(0);
  const tasks: Task[] = useSelector(({ tasks }) => tasks.tasks);
  const currentUserId: string = useSelector(({ users }) => users.user.id);

  const { isTaskOwnedByCurrentUser } = useAuth();

  const countDoneTasks = useCallback(() => {
    const doneTasksCount = tasksArray.reduce((acc, task) => {
      if (isTaskOwnedByCurrentUser(task) && task.done) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setDoneTasksCount(doneTasksCount);
  }, [tasksArray, currentUserId]);

  useEffect(() => {
    countDoneTasks();
  }, [countDoneTasks]);

  const animationDuration: number = 300;

  return (
    <>
      <StyledCompletedBox
        onClick={() => setVisibilityOfDoneTasks(!visibilityOfDoneTasks)}
      >
        <StyledTitleOfDoneTasks color="text.primary" fontWeight="bold">
          <IconButton>
            {visibilityOfDoneTasks ? (
              <KeyboardArrowDownIcon color="primary" />
            ) : (
              <KeyboardArrowRightOutlinedIcon color="primary" />
            )}
          </IconButton>
          Completed {doneTasksCount || null}
        </StyledTitleOfDoneTasks>
      </StyledCompletedBox>

      <CSSTransition
        in={Boolean(visibilityOfDoneTasks && tasks.length > 0)}
        timeout={animationDuration}
        classNames="done-tasks"
        // I use there CSS, because it is necessary for CSSTransition (animation)
        unmountOnExit
      >
        <Box>
          {tasksArray
            .filter((task) => isTaskOwnedByCurrentUser(task) && task.done)
            .map((task) => (
              <TaskListItem
                text={task.name}
                checked={task.done}
                key={task.id}
              />
            ))}
        </Box>
      </CSSTransition>
    </>
  );
};
