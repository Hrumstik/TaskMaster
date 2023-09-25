import "./TaskListItem.css";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import dayjs from "dayjs";
import {
  setAsDoneTask,
  deleteTask,
  setAsImportantTask,
  setTheDateOfPerfomingTheTask,
  changeTheNameOfTask,
} from "./tasksSlice";
import { CSSTransition } from "react-transition-group";
import { TextField } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CreateIcon from "@mui/icons-material/Create";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers";

export default function TaskListItem({ text, checked }) {
  const [focusedTask, setFocusedTask] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);
  const [changingTheNameOfTask, setChangingTheNameOfTask] = useState(false);
  const [valueOfInput, setTheValueOfInput] = useState(text);
  const [indexOfTheTask, setTheIndexOfTheTask] = useState(null);
  const [idOfTheTask, setTheIdOfTheTask] = useState(null);

  const openAdditionalContainer = () => {
    setFocusedTask(true);
  };

  const closeAdditionalContainer = () => {
    setFocusedTask(false);
  };

  const tasks = useSelector((state) => state.tasks.tasks);

  const findIndexOfTheTask = useCallback(() => {
    return tasks.findIndex((task) => task.name === text);
  }, [tasks, text]);

  const findIdOfTheTask = useCallback(() => {
    const index = tasks.findIndex((task) => task.name === text);
    return tasks[index].id;
  }, [tasks, text]);

  useEffect(() => {
    setTheIndexOfTheTask(findIndexOfTheTask());
  }, [tasks, findIndexOfTheTask]);

  useEffect(() => {
    setTheIdOfTheTask(findIdOfTheTask());
  }, [tasks, findIdOfTheTask]);

  const { request } = useHttp();

  const dispatch = useDispatch();

  return (
    <Box sx={{ mb: "18px", bgcolor: "background.paper" }}>
      {changingTheNameOfTask ? (
        <Box
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(
                changeTheNameOfTask({
                  id: tasks[indexOfTheTask].id,
                  newName: valueOfInput,
                })
              );
              request(
                `http://localhost:3001/tasks/${idOfTheTask}`,
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
          }}
        >
          <TextField
            value={valueOfInput}
            onChange={(e) => {
              setTheValueOfInput(e.target.value);
            }}
            fullWidth={true}
            variant="outlined"
            placeholder={text}
            helperText="Rename your task"
          />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: "57px",
              bgcolor: "background.paper",
              paddingLeft: "32px",
              display: "flex",
              alignContent: "center",
              boxShadow: focusedTask
                ? "0px 55px 8px -5px rgba(0, 0, 0, 0.25)"
                : "none",
            }}
          >
            <FormControlLabel
              sx={{ width: "100%" }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                    dispatch(setAsDoneTask(text));
                    request(
                      `http://localhost:3001/tasks/${idOfTheTask}`,
                      "PUT",
                      JSON.stringify({
                        ...tasks[indexOfTheTask],
                        done: !tasks[indexOfTheTask].done,
                      })
                    );
                  }}
                  icon={
                    <RadioButtonUncheckedIcon
                      sx={{ color: "icons.secondary" }}
                    />
                  }
                  checkedIcon={
                    <CheckCircleIcon sx={{ color: "icons.secondary" }} />
                  }
                />
              }
              label={
                <Typography sx={{ color: "text.primary" }}>{text}</Typography>
              }
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
          </Box>

          <CSSTransition
            in={focusedTask}
            timeout={500}
            classNames="todo-additional-container"
            unmountOnExit
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                display: "flex",
                gap: "15px",
                height: "57px",
                paddingLeft: "29px",
                boxShadow: "0px 4px 8px -3px rgba(0, 0, 0, 0.25)",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    setTheDateOfPerfomingTheTask({
                      name: text,
                      date: dayjs(date).format("DD.MM.YYYY"),
                    })
                  );
                  request(
                    `http://localhost:3001/tasks/${idOfTheTask}`,
                    "PUT",
                    JSON.stringify({
                      ...tasks[indexOfTheTask],
                      date: dayjs(date).format("DD.MM.YYYY"),
                    })
                  );
                  setShowCalendar(false);
                  setFocusedTask(false);
                }
              }}
            >
              {showCalendar ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    autoFocus={true}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    format="DD.MM.YYYY"
                    value={date}
                    label="Set date"
                  />
                </LocalizationProvider>
              ) : (
                <IconButton
                  onClick={() => {
                    setShowCalendar(true);
                  }}
                >
                  <DateRangeOutlinedIcon
                    sx={{ fontSize: 25, color: "icons.primary" }}
                  />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  dispatch(setAsImportantTask(text));
                  request(
                    `http://localhost:3001/tasks/${idOfTheTask}`,
                    "PUT",
                    JSON.stringify({
                      ...tasks[indexOfTheTask],
                      important: !tasks[indexOfTheTask].important,
                    })
                  );
                }}
              >
                {indexOfTheTask !== null &&
                tasks[indexOfTheTask] &&
                tasks[indexOfTheTask].important ? (
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
              <IconButton
                onClick={() => {
                  dispatch(deleteTask(text));
                  request(
                    `http://localhost:3001/tasks/${idOfTheTask}`,
                    "DELETE"
                  );
                }}
              >
                <DeleteOutlineIcon
                  sx={{ fontSize: 25, color: "icons.primary" }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setChangingTheNameOfTask(true);
                  setFocusedTask(false);
                }}
              >
                <CreateIcon sx={{ fontSize: 25, color: "icons.primary" }} />
              </IconButton>
            </Box>
          </CSSTransition>
        </>
      )}
    </Box>
  );
}
