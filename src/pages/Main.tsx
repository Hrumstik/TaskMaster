import React from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box } from "@mui/material";
import styled from "styled-components";

import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import TasksList from "../components/TasksList/TasksList";
import useScreenSize from "../hooks/useScreenSize";

const MainContainer = styled(Box)<any>`
  width: ${({ $ismobile }) => ($ismobile ? "75%" : "87%")};
`;

export default function Main() {
  const { isMobile } = useScreenSize();

  return (
    <Box
      sx={{ bgcolor: "background.paper", display: "flex", height: "100dvh" }}
    >
      <Menu />
      <MainContainer $isMobile={isMobile}>
        <Header
          text="Tasks"
          icon={
            <HomeOutlinedIcon sx={{ fontSize: 40, color: "icons.secondary" }} />
          }
        />
        <TasksList />
      </MainContainer>
    </Box>
  );
}
