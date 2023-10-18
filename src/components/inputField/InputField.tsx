import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TextField, Box, IconButton, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { AssignedTask, DateState } from "../../types/types";
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
  const stateOfInput: boolean = useSelector(({ input }) => input);
  const userId: string = useSelector(({ users }) => users.user.id);
  const dispatch = useDispatch();
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

  const formatTaskData = () =>
    dateState.dateIconClicked
      ? dayjs(dateState.dateOfNewTask).format("DD.MM.YYYY")
      : null;

  const saveTask = () => {
    const task = makeAnObjectForNewTask(inputValue);
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
  };

  const makeAnObjectForNewTask = (taskName: string) => {
    const userIds = determineUserIdFromLogin();
    return {
      id: uuidv4(),
      userId: assignedTask.showSelectUser && userIds.length ? userIds : userId,
      name: taskName,
      date: formatTaskData(),
      done: false,
      important,
    };
  };

  const determineUserIdFromLogin = () => {
    return assignedTask.responsibleForTheTaskUser
      .map((login) => {
        const user = assignedTask.availableUsers.find((u) => u.login === login);
        return user ? user.id : "";
      })
      .filter(Boolean);
  };

  const validateText = (text: string) => {
    return text.length > 2 && text.trim().length > 2;
  };

  const handleKeyDownSaveTask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsValid(validateText(inputValue));
      if (validateText(inputValue)) {
        saveTask();
      }
    } else if (e.key === "Escape") {
      dispatch(toggleStateOfInput());
    }
  };

  const handleClickSaveTask = () => {
    setIsValid(validateText(inputValue));
    if (validateText(inputValue)) {
      saveTask();
    }
  };

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

  const hadleOnChangeOfTextField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const theme = useTheme();

  return (
    <CSSTransition
      in={stateOfInput}
      timeout={500}
      classNames="text-field"
      unmountOnExit
    >
      <InputFieldMainContainer theme={theme}>
        <Box sx={{ display: "flex" }}>
          <TextField
            autoFocus
            color="primary"
            onKeyDown={handleKeyDownSaveTask}
            onChange={hadleOnChangeOfTextField}
            value={inputValue}
            error={!isValid}
            label="Write your task"
            variant="filled"
            helperText={
              isValid
                ? null
                : "The text must contain at least 2 characters and not consist only of spaces"
            }
            fullWidth
          />
          <Button
            color="primary"
            onClick={handleClickSaveTask}
            sx={{ ml: "15px" }}
            size="medium"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>

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
