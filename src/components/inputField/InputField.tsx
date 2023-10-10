import React, { useEffect } from "react";
import "./InputField.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { CSSTransition } from "react-transition-group";
import { addTask } from "../TaskListItem/tasksSlice";
import { toggleStateOfInput } from "./inputOpenSlice";
import { v4 as uuidv4 } from "uuid";
import { TextField, Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import PeopleIcon from "@mui/icons-material/People";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios, { AxiosRequestConfig } from "axios";

interface User {
  email: string;
  login: string;
  id: string;
}

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
  const stateOfInput = useSelector(({ input }) => input);
  const userId = useSelector(({ users }) => users.user.id);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [dateOfNewTask, setDateOfNewTask] = useState<Dayjs | null>(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);
  const [important, setAsImportant] = useState(false);
  const [showSelectUser, setShowSelectUser] = useState(false);
  const [dateIconClicked, setDateIconClicked] = useState(false);
  const [responsibleForTheTaskUser, setResponsibleForTheTaskUser] = useState<
    string[]
  >([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedResponsibleUsers, setSelectedResponsibleUsers] =
    useState(false);
  const { request } = useHttp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          method: "GET",
          url: `http://localhost:3001/users/`,
          headers: { "Content-Type": "application/json" },
        };

        const response = await axios(config);
        setAvailableUsers(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const saveTask = () => {
    const task = makeAnObjectForNewTask(inputValue);
    const userIds = determineUserIdFromLogin();
    let taskDate = dateIconClicked
      ? dayjs(dateOfNewTask).format("DD.MM.YYYY")
      : null;
    if (isValid) {
      dispatch(
        addTask({
          name: inputValue,
          id: task.id,
          userId: selectedResponsibleUsers ? userIds : userId,
          date: taskDate,
          important,
        })
      );
      request(null, "POST", JSON.stringify(task));
      setInputValue("");
      dispatch(toggleStateOfInput());
    }
  };

  const makeAnObjectForNewTask = (taskName: string) => {
    let taskDate = dateIconClicked
      ? dayjs(dateOfNewTask).format("DD.MM.YYYY")
      : null;
    const userIds = determineUserIdFromLogin();
    return {
      id: uuidv4(),
      userId: selectedResponsibleUsers ? userIds : userId,
      name: taskName,
      date: taskDate,
      done: false,
      important,
    };
  };

  const determineUserIdFromLogin = () => {
    return responsibleForTheTaskUser
      .map((login) => {
        const user = availableUsers.find((u) => u.login === login);
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
    if (event.key === "Enter" && showCalendar) {
      setShowCalendar(false);
    }
  };

  const onClickSaveTheDateOfThedask = () => {
    if (showCalendar) {
      setShowCalendar(false);
    }
  };

  const handleUserSelect = (e: SelectChangeEvent<string[]>) => {
    setResponsibleForTheTaskUser(e.target.value as string[]);
  };

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
            onChange={(e) => setInputValue(e.target.value)}
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
            {showCalendar ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  autoFocus
                  onChange={(newValue) => setDateOfNewTask(newValue)}
                  format="DD.MM.YYYY"
                  value={dateOfNewTask}
                  label="Set date"
                />
              </LocalizationProvider>
            ) : (
              <IconButton
                onClick={() => {
                  setShowCalendar(true);
                  setDateIconClicked(true);
                }}
              >
                <DateRangeOutlinedIcon
                  sx={{ fontSize: 25, color: "icons.primary" }}
                />
              </IconButton>
            )}
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
          {showSelectUser ? (
            <FormControl
              variant="standard"
              sx={{ minWidth: 160 }}
              color="primary"
            >
              <InputLabel>User</InputLabel>
              <Select
                multiple
                value={responsibleForTheTaskUser}
                onChange={handleUserSelect}
                defaultOpen
              >
                {availableUsers.map(({ login }) => {
                  return <MenuItem value={login}>{login}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ) : (
            <Button
              variant="text"
              sx={{ alignSelf: "center" }}
              endIcon={<PeopleIcon />}
              onClick={() => {
                setShowSelectUser(true);
                setSelectedResponsibleUsers(true);
              }}
            >
              Assign a task
            </Button>
          )}
        </FeaturesContainer>
      </InputFieldMainContainer>
    </CSSTransition>
  );
}
