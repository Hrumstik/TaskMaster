import React, { Dispatch, SetStateAction, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import { toggleStateOfInput } from "../components/inputField/inputOpenSlice";
import { validateText } from "../utils/utils";

interface TaskInputFormProps {
  saveTask: () => void;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export default function TaskInputForm({
  saveTask,
  isValid,
  setIsValid,
}: TaskInputFormProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const dispatch = useDispatch();

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

  const hadleOnChangeOfTextField = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  return (
    <>
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
    </>
  );
}
