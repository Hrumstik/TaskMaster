import React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import useScreenSize from "../../hooks/useScreenSize";
import { toggleStateOfInput } from "../inputField/inputOpenSlice";

const LogOutButtonStyled = styled(Button)`
  width: 30%;
  border-radius: 30px !important;
  height: 40px;
  align-self: center;
  font-size: 12px !important;
  font-weight: bold !important;
`;

export default function LogOutButton() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useScreenSize();
  const { dispatch, stateOfInput } = useGlobalState();

  const logOut = (): void => {
    localStorage.removeItem("token");
    if (stateOfInput) {
      dispatch(toggleStateOfInput());
    }
    navigate("/login");
  };
  return (
    <>
      {isMobile || isTablet ? (
        <IconButton onClick={logOut}>
          <LogoutIcon sx={{ color: "icons.secondary", fontSize: 40 }} />
        </IconButton>
      ) : (
        <LogOutButtonStyled
          startIcon={<LogoutIcon />}
          variant="contained"
          onClick={logOut}
        >
          Log out
        </LogOutButtonStyled>
      )}
    </>
  );
}
