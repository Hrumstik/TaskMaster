import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleStateOfInput } from "../inputField/inputOpenSlice";

export default function AddTaskButton() {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "15px" }}>
      <Button
        color="primary"
        onClick={() => {
          dispatch(toggleStateOfInput());
        }}
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
      >
        Add new task
      </Button>
    </Box>
  );
}
