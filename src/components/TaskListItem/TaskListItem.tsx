import React from "react";
import "./TaskListItem.css";
import { useState, useCallback } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TextField } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { useHttp } from "../../hooks/http.hook";
import { Tasks } from "../../types/types";

import {
  setAsDoneTask,
  deleteTask,
  setAsImportantTask,
  setTheDateOfPerfomingTheTask,
  changeTheNameOfTask,
} from "./tasksSlice";

interface TaskListItemProps {
  text: string;
  checked: boolean;
}

const StyledMainTaskContainer = styled(Box)`
  margin-left: 18px;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StyledBasicTaskContainer = styled(Box)<{ focusedTask: boolean }>`
  height: 57px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding-left: 32px;
  display: flex;
  align-content: center;
  box-shadow: ${({ focusedTask }) =>
    focusedTask ? "0px 55px 8px -5px rgba(0, 0, 0, 0.25)" : "none"};
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
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [changingTheNameOfTask, setChangingTheNameOfTask] =
    useState<boolean>(false);
  const [valueOfInput, setTheValueOfInput] = useState<string>(text);

  const openAdditionalContainer = () => {
    setFocusedTask(true);
  };

  const closeAdditionalContainer = () => {
    setFocusedTask(false);
  };

  const tasks: Tasks = useSelector(({ tasks }) => tasks.tasks);

  const findIndexOfTheTask = useCallback(() => {
    return tasks.findIndex(({ name }) => name === text);
  }, [tasks, text]);

  const findIdOfTheTask = useCallback(() => {
    const index = tasks.findIndex(({ name }) => name === text);
    return tasks[index].id;
  }, [tasks, text]);

  const indexOfTheTask: number = findIndexOfTheTask();
  const idOfTheTask: string = findIdOfTheTask();

  const { request } = useHttp();

  const dispatch = useDispatch();

  const theme = useTheme();

  const handleSaveTodoName = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      dispatch(
        changeTheNameOfTask({
          id: tasks[indexOfTheTask].id,
          newName: valueOfInput,
        })
      );
      request(
        idOfTheTask,
        "PUT",
        JSON.stringify({
          ...tasks[indexOfTheTask],
          name: valueOfInput,
        })
      );
      setChangingTheNameOfTask(false);
    }
    if (e.key === "Escape") {
      setChangingTheNameOfTask(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    dispatch(setAsDoneTask(text));
    request(
      idOfTheTask,
      "PUT",
      JSON.stringify({
        ...tasks[indexOfTheTask],
        done: !tasks[indexOfTheTask].done,
      })
    );
  };

  const handeleSaveTaskDate = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      dispatch(
        setTheDateOfPerfomingTheTask({
          name: text,
          date: dayjs(date).format("DD.MM.YYYY"),
        })
      );
      request(
        idOfTheTask,
        "PUT",
        JSON.stringify({
          ...tasks[indexOfTheTask],
          date: dayjs(date).format("DD.MM.YYYY"),
        })
      );
      setShowCalendar(false);
      setFocusedTask(false);
    }
  };

  const handleSaveTaskAsImportant = () => {
    dispatch(setAsImportantTask(text));
    request(
      idOfTheTask,
      "PUT",
      JSON.stringify({
        ...tasks[indexOfTheTask],
        important: !tasks[indexOfTheTask].important,
      })
    );
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(text));
    request(idOfTheTask, "DELETE");
  };

  const handleDeleteTheTask = () => {
    setChangingTheNameOfTask(true);
    setFocusedTask(false);
  };

  const animationTime: number = 500;

  return (
    <StyledMainTaskContainer theme={theme}>
      {!changingTheNameOfTask ? (
        <>
          <StyledBasicTaskContainer theme={theme} focusedTask={focusedTask}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  icon={<RadioButtonUncheckedIcon color="secondary" />}
                  checkedIcon={<CheckCircleIcon color="secondary" />}
                />
              }
              label={<Typography color="text.primary">{text}</Typography>}
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
            <StyledAdditionalTaskContainer
              theme={theme}
              onKeyDown={handeleSaveTaskDate}
            >
              {showCalendar ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    autoFocus
                    onChange={(newValue) => setDate(newValue)}
                    format="DD.MM.YYYY"
                    value={date}
                    label="Set date"
                  />
                </LocalizationProvider>
              ) : (
                <IconButton onClick={() => setShowCalendar(true)}>
                  <DateRangeOutlinedIcon
                    sx={{ fontSize: 25, color: "icons.primary" }}
                  />
                </IconButton>
              )}
              <IconButton onClick={handleSaveTaskAsImportant}>
                {tasks[indexOfTheTask].important ? (
                  <StarIcon
                    sx={{
                      fontSize: 25,
                      color: "icons.primary",
                    }}
                  />
                ) : (
                  <StarBorderIcon
                    sx={{ fontSize: 25, color: "icons.primary" }}
                  />
                )}
              </IconButton>
              <IconButton onClick={handleDeleteTask}>
                <DeleteOutlineIcon
                  sx={{ fontSize: 25, color: "icons.primary" }}
                />
              </IconButton>
              <IconButton onClick={handleDeleteTheTask}>
                <CreateIcon sx={{ fontSize: 25, color: "icons.primary" }} />
              </IconButton>
            </StyledAdditionalTaskContainer>
          </CSSTransition>
        </>
      ) : (
        <Box onKeyDown={handleSaveTodoName}>
          <TextField
            value={valueOfInput}
            onChange={(e) => setTheValueOfInput(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder={text}
            helperText="Rename your task"
          />
        </Box>
      )}
    </StyledMainTaskContainer>
  );
};
