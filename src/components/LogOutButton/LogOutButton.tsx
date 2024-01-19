import React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Button } from "@mui/material";
import styled from "styled-components";

import useScreenSize from "../../hooks/useScreenSize";

const LogOutButtonStyled = styled(Button)`
  width: 30%;
  border-radius: 30px !important;
  height: 40px;
  align-self: center;
  font-size: 12px !important;
  font-weight: bold !important;
`;

export default function LogOutButton() {
  const { isMobile, isTablet } = useScreenSize();

  const logOut = (): void => {
    localStorage.removeItem("token");
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
