import React, { memo } from "react";

import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";

import { ChangeTaskNameButtonProps } from "../../types/types";

function ChangeTaskNameButton({
  setChangingTheNameOfTask,
  setFocusedTask,
}: ChangeTaskNameButtonProps) {
  const handleChangeTheNameOfTheTask = () => {
    setChangingTheNameOfTask(true);
    setFocusedTask(false);
  };

  return (
    <IconButton onClick={handleChangeTheNameOfTheTask}>
      <CreateIcon sx={{ fontSize: 25, color: "icons.primary" }} />
    </IconButton>
  );
}

export default memo(ChangeTaskNameButton);
