import React, { useState } from "react";

import { Box } from "@mui/material";
import { TextField } from "@mui/material";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import { ChangeTaskNameInputProps } from "../../types/types";
import { changeTheNameOfTask } from "../TaskListItem/tasksSlice";

export default function ChangeTaskNameInput({
  text,
  indexOfTheTask,
  idOfTheTask,
  setChangingTheNameOfTask,
}: ChangeTaskNameInputProps) {
  const { dispatch, tasks } = useGlobalState();
  const { request } = useHttp();
  const [valueOfInput, setTheValueOfInput] = useState<string>(text);

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

  return (
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
  );
}
