import React, { useCallback, useState } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import TaskInputForm from "../../TaskInputForm/TaskInputForm";
import { AssignedTask, DateState } from "../../types/types";
import {
  determineUserIdFromLogin,
  makeAnObjectForNewTask,
} from "../../utils/utils";
import AssignTaskButton from "../AssignTaskButton/AssignTaskButton";
import CreateTaskDateButton from "../CreateTaskDateButton/CreateTaskDateButton";
import { addTask } from "../TaskListItem/tasksSlice";

import { toggleStateOfInput } from "./inputOpenSlice";
import "./InputField.css";

const InputFieldMainContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 32px;
  padding: 10px 5px 0 5px;
  box-shadow: 0px 4px 8px -3px rgba(0, 0, 0, 1);
`;

const FeaturesContainer = styled(Box)`
  height: 60px;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const DateAndImportanceContainer = styled(Box)`
  display: flex;
  align-self: center;
`;

export default function InputField() {
  const { stateOfInput, userId, theme, dispatch } = useGlobalState();
  const [inputValue, setInputValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [dateState, setDateState] = useState<DateState>({
    dateOfNewTask: dayjs(),
    showCalendar: false,
    dateIconClicked: false,
  });
  const [important, setAsImportant] = useState<boolean>(false);
  const [assignedTask, setAssignedTask] = useState<AssignedTask>({
    showSelectUser: false,
    responsibleForTheTaskUser: [],
    availableUsers: [],
  });
  const [error, setError] = useState<boolean>(false);

  const { request } = useHttp();

  const saveTask = useCallback(() => {
    const userIds = determineUserIdFromLogin(
      assignedTask.responsibleForTheTaskUser,
      assignedTask.availableUsers
    ) as string[];
    const task = makeAnObjectForNewTask(
      inputValue,
      userIds,
      userId,
      dateState,
      important
    );
    if (isValid) {
      dispatch(addTask(task));
      request(null, "POST", JSON.stringify(task));
      setInputValue("");
      dispatch(toggleStateOfInput());
      setAssignedTask((prevState) => ({
        ...prevState,
        showSelectUser: false,
        responsibleForTheTaskUser: [],
      }));
    }
  }, [
    assignedTask.responsibleForTheTaskUser,
    assignedTask.availableUsers,
    dateState,
    dispatch,
    important,
    inputValue,
    isValid,
    request,
    userId,
  ]);

  const onKeyDownSaveTheDateOfTheTask = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && dateState.showCalendar) {
      setDateState((prevState) => ({
        ...prevState,
        showCalendar: false,
      }));
    }
  };

  const onClickSaveTheDateOfThedask = () => {
    if (dateState.showCalendar) {
      setDateState((prevState) => ({
        ...prevState,
        showCalendar: false,
      }));
    }
  };

  return (
    <CSSTransition
      in={stateOfInput}
      timeout={500}
      classNames="text-field"
      unmountOnExit
    >
      <InputFieldMainContainer theme={theme}>
        <TaskInputForm
          isValid={isValid}
          saveTask={saveTask}
          setIsValid={setIsValid}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <FeaturesContainer
          onKeyDown={onKeyDownSaveTheDateOfTheTask}
          onClick={onClickSaveTheDateOfThedask}
        >
          <DateAndImportanceContainer>
            <CreateTaskDateButton
              dateState={dateState}
              setDateState={setDateState}
            />
            <IconButton onClick={() => setAsImportant(!important)}>
              {important ? (
                <StarIcon
                  sx={{
                    fontSize: 25,
                    color: "icons.primary",
                  }}
                />
              ) : (
                <StarBorderIcon sx={{ fontSize: 25, color: "icons.primary" }} />
              )}
            </IconButton>
          </DateAndImportanceContainer>
          <AssignTaskButton
            setError={setError}
            assignedTask={assignedTask}
            setAssignedTask={setAssignedTask}
          />
        </FeaturesContainer>
        {error ? (
          <Typography sx={{ color: "red" }}>Something went wrong</Typography>
        ) : null}
      </InputFieldMainContainer>
    </CSSTransition>
  );
}
