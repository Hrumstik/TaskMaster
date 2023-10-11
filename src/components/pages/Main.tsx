import React from "react";
import Menu from "../Menu/Menu";
import { Header } from "../Header/Header";
import styled from "styled-components";
import useAuth from "../../hooks/use-auth";
import useScreenSize from "../../hooks/useScreenSize";
import TasksList from "../TasksList/TasksList";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box } from "@mui/material";

const MainContainer = styled(Box)<any>`
  width: ${({ ismobile }) => (ismobile ? "92%" : "75%")};
`;

export default function Main() {
  useAuth();
  const { isMobile } = useScreenSize();

  return (
    <Box sx={{ bgcolor: "background.paper", display: "flex" }}>
      <Menu />
      <MainContainer ismobile={isMobile}>
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
