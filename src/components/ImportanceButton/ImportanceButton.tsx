import React, { memo } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton } from "@mui/material";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import { ImportanceButtonProps } from "../../types/types";
import { setAsImportantTask } from "../TaskListItem/tasksSlice";

function ImportanceButton({
  text,
  idOfTheTask,
  indexOfTheTask,
}: ImportanceButtonProps) {
  const { dispatch, tasks } = useGlobalState();
  const { request } = useHttp();

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

  return (
    <IconButton onClick={handleSaveTaskAsImportant}>
      {tasks[indexOfTheTask].important ? (
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
  );
}

export default memo(ImportanceButton);
