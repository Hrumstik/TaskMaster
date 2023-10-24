import React, { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import { setAsDoneTask } from "../TaskListItem/tasksSlice";

interface TaskNameContainerProps {
  text: string;
  idOfTheTask: string;
  indexOfTheTask: number;
  checked: boolean;
}

export default function TaskNameContainer({
  text,
  idOfTheTask,
  indexOfTheTask,
  checked,
}: TaskNameContainerProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { dispatch, tasks } = useGlobalState();
  const { request } = useHttp();

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

  return (
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
  );
}
