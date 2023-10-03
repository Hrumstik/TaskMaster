import React from "react";
import "./InputField.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { CSSTransition } from "react-transition-group";
import { addTask } from "../TaskListItem/tasksSlice";
import { toggleStateOfInput } from "./inputOpenSlice";
import { v4 as uuidv4 } from "uuid";
import { TextField, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

interface StateOfInput {
  input: boolean;
}

export default function InputField() {
  const stateOfInput = useSelector((state: StateOfInput) => state.input);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { request } = useHttp();

  const saveTask = () => {
    const task = makeAnObjectForNewTask(inputValue);
    if (isValid) {
      dispatch(addTask({ name: inputValue, id: task.id }));
      request(null, "POST", JSON.stringify(task));
      setInputValue("");
      dispatch(toggleStateOfInput());
    }
  };

  const makeAnObjectForNewTask = (taskName: string) => ({
    id: uuidv4(),
    name: taskName,
    date: null,
    done: false,
    important: false,
  });

  const validateText = (text: string) => {
    return text.length > 2 && text.trim().length > 2;
  };

  const handleKeyDownSaveTask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsValid(validateText(inputValue));
      if (validateText(inputValue)) {
        saveTask();
      }
    }
  };

  const handleClickSaveTask = () => {
    setIsValid(validateText(inputValue));
    if (validateText(inputValue)) {
      saveTask();
    }
  };

  return (
    <CSSTransition
      in={stateOfInput}
      timeout={500}
      classNames="text-field"
      unmountOnExit
    >
      <Box sx={{ display: "flex", mb: "25px" }}>
        <TextField
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
    </CSSTransition>
  );
}
