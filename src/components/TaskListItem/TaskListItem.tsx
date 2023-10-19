import React, { useMemo } from "react";
import "./TaskListItem.css";
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { TaskListItemProps, Tasks } from "../../types/types";
import ChangeTaskNameButton from "../ChangeTaskNameButton/ChangeTaskNameButton";
import ChangeTaskNameInput from "../ChangeTaskNameInput/ChangeTaskNameInput";
import DateTaskButton from "../DateTaskButton.tsx/DateTaskButton";
import DeleteTaskButton from "../DeleteTaskButton/DeleteTaskButton";
import ImportanceButton from "../ImportanceButton/ImportanceButton";
import TaskNameContainer from "../TaskNameContainer/TaskNameContainer";

const StyledMainTaskContainer = styled(Box)`
  margin-left: 18px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StyledBasicTaskContainer = styled(Box)<any>`
  height: 57px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding-left: 32px;
  display: flex;
  align-content: center;
  box-shadow: ${({ $focusedTask }) =>
    $focusedTask ? "0px 55px 8px -5px rgba(0, 0, 0, 0.25)" : "none"};
`;

const StyledAdditionalTaskContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  gap: 15px;
  height: 57px;
  padding-left: 29px;
  box-shadow: 0px 4px 8px -3px rgba(0, 0, 0, 0.25);
`;

export const TaskListItem: React.FC<TaskListItemProps> = ({
  text,
  checked,
}) => {
  const [focusedTask, setFocusedTask] = useState<boolean>(false);

  const [changingTheNameOfTask, setChangingTheNameOfTask] =
    useState<boolean>(false);

  const openAdditionalContainer = () => {
    setFocusedTask(true);
  };

  const closeAdditionalContainer = () => {
    setFocusedTask(false);
  };

  const tasks: Tasks = useSelector(({ tasks }) => tasks.tasks);

  const indexOfTheTask = useMemo(() => {
    return tasks.findIndex(({ name }) => name === text);
  }, [tasks, text]);

  const idOfTheTask = useMemo(() => {
    const index = tasks.findIndex(({ name }) => name === text);
    return tasks[index].id;
  }, [tasks, text]);

  const theme = useTheme();

  const animationTime: number = 500;

  return (
    <StyledMainTaskContainer theme={theme}>
      {!changingTheNameOfTask ? (
        <>
          <StyledBasicTaskContainer theme={theme} $focusedTask={focusedTask}>
            <TaskNameContainer
              text={text}
              idOfTheTask={idOfTheTask}
              indexOfTheTask={indexOfTheTask}
              checked={checked}
            />

            <IconButton
              onClick={
                focusedTask ? closeAdditionalContainer : openAdditionalContainer
              }
            >
              {focusedTask ? (
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 25, color: "icons.secondary" }}
                />
              ) : (
                <KeyboardArrowRightOutlinedIcon
                  sx={{ fontSize: 25, color: "icons.secondary" }}
                />
              )}
            </IconButton>
          </StyledBasicTaskContainer>

          <CSSTransition
            in={focusedTask}
            timeout={animationTime}
            classNames="todo-additional-container"
            unmountOnExit
          >
            <StyledAdditionalTaskContainer theme={theme}>
              <DateTaskButton
                idOfTheTask={idOfTheTask}
                indexOfTheTask={indexOfTheTask}
                setFocusedTask={setFocusedTask}
              />

              <ImportanceButton
                text={text}
                idOfTheTask={idOfTheTask}
                indexOfTheTask={indexOfTheTask}
              />

              <DeleteTaskButton idOfTheTask={idOfTheTask} text={text} />

              <ChangeTaskNameButton
                setChangingTheNameOfTask={setChangingTheNameOfTask}
                setFocusedTask={setFocusedTask}
              />
            </StyledAdditionalTaskContainer>
          </CSSTransition>
        </>
      ) : (
        <ChangeTaskNameInput
          text={text}
          indexOfTheTask={indexOfTheTask}
          idOfTheTask={idOfTheTask}
          setChangingTheNameOfTask={setChangingTheNameOfTask}
        />
      )}
    </StyledMainTaskContainer>
  );
};
