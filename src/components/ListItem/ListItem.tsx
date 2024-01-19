import React, { memo } from "react";

import "./ListItem.css";
import { IconButton, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import useScreenSize from "../../hooks/useScreenSize";
import { ListItemProps } from "../../types/types";

const StyledListItem = styled.li`
  height: 54px;
`;

function ListItem({ text, path, icon }: ListItemProps) {
  const { isMobile, isTablet } = useScreenSize();
  console.log(isTablet);
  return (
    <StyledListItem>
      <NavLink
        to={path}
        className={
          ({ isActive }) => (isActive ? "listItem-active" : "listItem")
          // I use CSS here because it's necessary for React Router (NavLink)
        }
      >
        <Typography
          variant="h6"
          component="span"
          color="text.primary"
          sx={{
            overflow: "hidden",
            display: "flex",
            justifyContent:
              isTablet || isMobile ? "center important!" : "start",
          }}
        >
          <IconButton
            sx={{
              mr: "25px",
              display: "flex",
            }}
          >
            {icon}
          </IconButton>
          {isMobile || isTablet ? null : text}
        </Typography>
      </NavLink>
    </StyledListItem>
  );
}

export default memo(ListItem);
