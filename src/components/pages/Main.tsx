import React, { useEffect } from "react";
import Menu from "../Menu/Menu";
import { Header } from "../Header/Header";
import TasksList from "../TasksList/TasksList";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box } from "@mui/material";
import useAuth from "../../hooks/use-auth";

export default function Main() {
  useAuth();

  return (
    <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
      <Menu />
      <Box sx={{ width: "75%" }}>
        <Header
          text="Tasks"
          icon={
            <HomeOutlinedIcon sx={{ fontSize: 40, color: "icons.secondary" }} />
          }
        />
        <TasksList />
      </Box>
    </Box>
  );
}
