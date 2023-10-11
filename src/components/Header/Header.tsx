import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reducers/featuresSlice";
import { removeUser } from "../authentication/usersSlice";
import styled from "styled-components";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../SearchModal/SearchModal";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import useScreenSize from "../../hooks/useScreenSize";
import { toggleStateOfInput } from "../inputField/inputOpenSlice";

interface HeaderProps {
  text: string;
  icon: React.ReactNode;
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding-right: 18px;
  padding-left: 18px;
  margin-bottom: 37px;
`;

const HeaderLeftSection = styled(Box)`
  display: flex;
  gap: 9px;
  cursor: pointer;
`;

const HeaderRightSection = styled(Box)`
  display: flex;
  width: 35%;
  height: 100%;
  gap: 10px;
  justify-content: flex-end;
`;

const SearchTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const SearchButton = styled.button<{ theme: Theme }>`
  padding: 0 8px;
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.background.search};
  &:hover {
    border: 3px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.background.search_hover};

    & ${SearchTitle} {
      color: ${({ theme }) => theme.palette.text.focused};
    }
  }
`;

const LogOutButton = styled(Button)`
  width: 30%;
  border-radius: 30px !important;
  height: 40px;
  align-self: center;
  font-size: 12px !important;
  font-weight: bold !important;
`;

export const Header: React.FC<HeaderProps> = ({ text, icon }) => {
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLDivElement)
  >(null);
  const [showPrintFeature, setShowPrintFeature] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  const litghtThemeState = useSelector(
    ({ features }) => features.showLightTheme
  );

  const dispatch = useDispatch();

  const showPrintMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowPrintFeature(true);
    setAnchorEl(event.currentTarget);
  };

  const printThePage = () => {
    setShowPrintFeature(false);
    window.print();
  };
  const stateOfInput = useSelector(({ input }) => input);

  const logOut = () => {
    dispatch(removeUser());
    if (stateOfInput) {
      dispatch(toggleStateOfInput());
    }
  };

  const theme = useTheme();

  const { isMobile, isTablet } = useScreenSize();

  return (
    <StyledHeader>
      <HeaderLeftSection>
        <Typography variant="h1" color="text.secondary" fontSize="22px">
          <IconButton>{icon}</IconButton>
          {text}
        </Typography>

        {/* This block responsible for the feature of printing the page*/}
        <Typography onClick={showPrintMenu} color="text.secondary">
          ...
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={showPrintFeature}
          onClose={() => setShowPrintFeature(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={printThePage}>Print list</MenuItem>
        </Menu>
      </HeaderLeftSection>
      <HeaderRightSection>
        {isMobile || isTablet ? (
          <IconButton onClick={() => setShowSearchModal(true)}>
            <SearchIcon
              sx={{ fontSize: 40, color: "icons.secondary" }}
            ></SearchIcon>
          </IconButton>
        ) : (
          <SearchButton theme={theme} onClick={() => setShowSearchModal(true)}>
            <SearchIcon sx={{ mr: "5px", color: "icons.primary" }} />
            <SearchTitle theme={theme}>Search task</SearchTitle>
          </SearchButton>
        )}
        <Modal open={showSearchModal} onClose={() => setShowSearchModal(false)}>
          <SearchModal />
        </Modal>
        <IconButton onClick={() => dispatch(toggleTheme())}>
          {litghtThemeState ? (
            <ModeNightIcon
              sx={{
                fontSize: 40,
                color: "icons.secondary",
              }}
            />
          ) : (
            <LightModeIcon
              sx={{
                fontSize: 40,
                color: "icons.secondary",
              }}
            />
          )}
        </IconButton>
        {isMobile || isTablet ? (
          <IconButton onClick={logOut}>
            <LogoutIcon sx={{ color: "icons.secondary", fontSize: 40 }} />
          </IconButton>
        ) : (
          <LogOutButton
            startIcon={<LogoutIcon />}
            variant="contained"
            onClick={logOut}
          >
            Log out
          </LogOutButton>
        )}
      </HeaderRightSection>
    </StyledHeader>
  );
};
