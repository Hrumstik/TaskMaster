import React, { useMemo, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import useGroupTasks from "../../hooks/useGroupTasks";
import { ArrayTasksProps } from "../../types/types";
import { TaskListItem } from "../TaskListItem/TaskListItem";
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

  const { doneTasksCount, isTaskOwnedByCurrentUser } =
    useGroupTasks(tasksArray);

  const renderedTasks = useMemo(() => {
    return tasksArray
      .filter((task) => isTaskOwnedByCurrentUser(task) && task.done)
      .map((task) => (
        <TaskListItem text={task.name} checked={task.done} key={task.id} />
      ));
  }, [tasksArray, isTaskOwnedByCurrentUser]);

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
        in={Boolean(visibilityOfDoneTasks && doneTasksCount > 0)}
        timeout={animationDuration}
        classNames="done-tasks"
        // I use there CSS, because it is necessary for CSSTransition (animation)
        unmountOnExit
      >
        <Box>{renderedTasks}</Box>
      </CSSTransition>
    </>
  );
};
