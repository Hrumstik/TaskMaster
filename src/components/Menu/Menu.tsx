import React, { useState } from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Box, IconButton, Divider, Typography } from "@mui/material";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import useScreenSize from "../../hooks/useScreenSize";
import { Error } from "../../types/types";
import AddTaskButton from "../addTaskButton/AddTaskButton";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import ListItem from "../ListItem/ListItem";

const StyledMenuContainer = styled(Box)<{ isMobile: boolean }>`
  background-color: ${({ theme }) => theme.palette.background.default};
  height: 100vh;
  box-shadow: 4px 0px 20px -10px rgba(0, 0, 0, 0.25);
  width: ${({ isMobile }) => (isMobile ? "8%" : "25%")};
`;

const StyledMenuHeader = styled.header<any>`
  padding-top: 40px;
  padding-left: 11%;
  padding-right: 10%;
  display: ${({ ismobile }) => (ismobile ? "flex" : "block")};
  justify-content: ${({ ismobile }) => (ismobile ? "center" : "initial")};
`;

const StyledMenuList = styled.ul`
  padding: 0;
  list-style: none;
`;

export default function Menu() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ status: false, message: "" });

  const { theme } = useGlobalState();

  const { isMobile } = useScreenSize();

  const iconStyles = { fontSize: 25, color: "icons.primary" };

  return (
    <StyledMenuContainer theme={theme} isMobile={isMobile}>
      <StyledMenuHeader ismobile={isMobile ? true : false}>
        <IconButton onClick={() => setShowOptions(true)}>
          <MenuOutlinedIcon
            sx={{ fontSize: isMobile ? 25 : 40, color: "icons.primary" }}
          />
        </IconButton>
      </StyledMenuHeader>
      <main>
        <StyledMenuList>
          {/* Here I generete menu-items */}
          {[
            {
              path: "/my-day",
              text: "My day",
              icon: <WbSunnyOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/important",
              text: "Important",
              icon: <StarOutlineOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/planned",
              text: "Planned",
              icon: <DateRangeOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/",
              text: "All tasks",
              icon: <HomeOutlinedIcon sx={iconStyles} />,
            },
          ].map(({ path, text, icon }) => {
            return <ListItem path={path} text={text} icon={icon} key={text} />;
          })}
        </StyledMenuList>
        <Divider variant="middle" />
        <AddTaskButton />
        {error.status && (
          <Typography
            color="error"
            sx={{ display: "flex", justifyContent: "center", mt: "10px" }}
          >
            {error.message}
          </Typography>
        )}
      </main>

      {/* // Sorting menu located here */}
      <DrawerMenu
        setError={setError}
        setShowOptions={setShowOptions}
        showOptions={showOptions}
      />
    </StyledMenuContainer>
  );
}
