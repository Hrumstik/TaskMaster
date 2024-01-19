import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { Button, Box, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

import useScreenSize from "../../hooks/useScreenSize";
import { toggleStateOfInput } from "../inputField/inputOpenSlice";

function AddTaskButton() {
  const dispatch = useDispatch();

  const { isMobile, isTablet } = useScreenSize();

  const openInputField = () => {
    dispatch(toggleStateOfInput());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "15px" }}>
      {isMobile || isTablet ? (
        <IconButton onClick={openInputField} sx={{ color: "icons.primary" }}>
          <AddIcon />
        </IconButton>
      ) : (
        <Button
          color="primary"
          onClick={openInputField}
          startIcon={<AddIcon />}
          variant="contained"
          size="large"
        >
          ADD NEW TASK
        </Button>
      )}
    </Box>
  );
}

export default AddTaskButton;
