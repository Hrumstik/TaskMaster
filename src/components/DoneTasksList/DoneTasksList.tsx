import React from "react";
import "./DoneTasksList.css";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Task {
  name: string;
  userId: string | string[];
  id: string;
  done: boolean;
}

interface DoneTasksListProps {
  tasksArray: Task[];
}

const StyledCompletedBox = styled(Box)`
  display: flex;
  gap: 22px;
  padding-left: 32px;
`;

const StyledTitleOfDoneTasks = styled(Typography)`
  cursor: pointer;
`;

export const DoneTasksList: React.FC<DoneTasksListProps> = ({ tasksArray }) => {
  const [visibilityOfDoneTasks, setVisibilityOfDoneTasks] = useState(false);
  const [doneTasksCount, setDoneTasksCount] = useState<null | number>(null);
  const tasks = useSelector(({ tasks }) => tasks.tasks);
  const currentUserId = useSelector(({ users }) => users.user.id);

  const countDoneTasks = useCallback(() => {
    const doneTasksCount = tasksArray.reduce((acc, task) => {
      if (task.done) {
        if (typeof task.userId === "string") {
          if (task.userId === currentUserId) {
            return acc + 1;
          }
        } else if (Array.isArray(task.userId)) {
          if (task.userId.includes(currentUserId)) {
            return acc + 1;
          }
        }
      }
      return acc;
    }, 0);

    setDoneTasksCount(doneTasksCount);
  }, [tasksArray, currentUserId]);

  useEffect(() => {
    countDoneTasks();
  }, [tasks, countDoneTasks]);

  return (
    <>
      <StyledCompletedBox
        onClick={() => {
          setVisibilityOfDoneTasks(!visibilityOfDoneTasks);
        }}
      >
        <StyledTitleOfDoneTasks color="text.primary" fontWeight="bold">
          <IconButton>
            {visibilityOfDoneTasks ? (
              <KeyboardArrowDownIcon color="primary" />
            ) : (
              <KeyboardArrowRightOutlinedIcon color="primary" />
            )}
          </IconButton>
          Completed {doneTasksCount ? doneTasksCount : null}
        </StyledTitleOfDoneTasks>
      </StyledCompletedBox>

      <CSSTransition
        in={visibilityOfDoneTasks && tasks.length}
        timeout={300}
        classNames="done-tasks"
        unmountOnExit
      >
        <Box>
          {tasksArray.map(({ name, done, id, userId }) => {
            if (typeof userId === "string") {
              if (done === true && currentUserId === userId) {
                return <TaskListItem text={name} checked={done} key={id} />;
              } else {
                return null;
              }
            }

            if (Array.isArray(userId) && done) {
              if (userId.find((id: string) => id === currentUserId)) {
                return <TaskListItem checked={done} text={name} key={id} />;
              } else {
                return null;
              }
            }
          })}
        </Box>
      </CSSTransition>
    </>
  );
};
