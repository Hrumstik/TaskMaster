import React from "react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box } from "@mui/material";
import styled from "styled-components";

import useScreenSize from "../../hooks/useScreenSize";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import TasksList from "../TasksList/TasksList";

const MainContainer = styled(Box)<any>`
  width: ${(props) => (props.$isMobile ? "92%" : "75%")};
`;

export default function Main() {
  const { isMobile } = useScreenSize();

  return (
    <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
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
