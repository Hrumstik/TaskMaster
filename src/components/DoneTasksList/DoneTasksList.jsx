import "./DoneTasksList.css";
import TaskListItem from "../TaskListItem/TaskListItem";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledCompletedBox = styled(Box)`
  display: flex;
  gap: 22px;
`;

const StyledTitleOfDoneTasks = styled(Typography)`
  cursor: pointer;
`;

export default function DoneTasksList({ tasksArray }) {
  const [visibilityOfDoneTasks, setVisibilityOfDoneTasks] = useState(false);
  const [doneTasksCount, setDoneTasksCount] = useState(null);
  const tasks = useSelector(({ tasks }) => tasks.tasks);

  const countDoneTasks = useCallback(() => {
    const doneTasksArray = tasksArray.filter((task) => task.done === true);
    setDoneTasksCount(doneTasksArray.length);
  }, [tasksArray]);

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
          {tasksArray.map(({ name, done, id }) => {
            if (done === true) {
              return <TaskListItem text={name} checked={done} key={id} />;
            } else {
              return null;
            }
          })}
        </Box>
      </CSSTransition>
    </>
  );
}
