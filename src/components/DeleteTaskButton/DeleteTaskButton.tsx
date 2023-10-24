import React, { memo } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import { DeleteTaskButtonProps } from "../../types/types";
import { deleteTask } from "../TaskListItem/tasksSlice";

function DeleteTaskButton({ idOfTheTask, text }: DeleteTaskButtonProps) {
  const { dispatch } = useGlobalState();
  const { request } = useHttp();

  const handleDeleteTask = () => {
    dispatch(deleteTask(text));
    request(idOfTheTask, "DELETE");
  };

  return (
    <IconButton onClick={handleDeleteTask}>
      <DeleteOutlineIcon sx={{ fontSize: 25, color: "icons.primary" }} />
    </IconButton>
  );
}

export default memo(DeleteTaskButton);
