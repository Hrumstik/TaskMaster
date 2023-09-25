import "./ListItem.css";
import { NavLink } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import styled from "styled-components";

const StyledListItem = styled.li`
  height: 54px;
`;

export default function ListItem({ text, path, icon }) {
  return (
    <StyledListItem className="">
      <NavLink
        to={path}
        className={
          ({ isActive }) => (isActive ? "listItem-active" : "listItem")
          // I use CSS here because it's necessary for React Router (NavLink)
        }
      >
        <Typography variant="h6" component="span" color="text.primary">
          <IconButton sx={{ mr: "25px" }}>{icon}</IconButton>
          {text}
        </Typography>
      </NavLink>
    </StyledListItem>
  );
}
