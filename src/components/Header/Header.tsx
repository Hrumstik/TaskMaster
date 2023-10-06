import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reducers/featuresSlice";
import styled from "styled-components";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import SearchModal from "../SearchModal/SearchModal";
import Modal from "@mui/material/Modal";

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

const FirstStyledHeaderSection = styled(Box)`
  display: flex;
  gap: 9px;
  cursor: pointer;
`;

const SecondtyledHeaderSection = styled(Box)`
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: space-between;
`;

const SearchTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const SearchButton = styled.button<{ theme: Theme }>`
  margin-left: 15px;
  padding: 0 8px;
  width: 100%;
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

export const Header: React.FC<HeaderProps> = ({ text, icon }) => {
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLDivElement)
  >(null);
  const [showPrintFeature, setShowPrintFeature] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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

  const theme = useTheme();

  return (
    <StyledHeader>
      <FirstStyledHeaderSection>
        <Typography variant="h1" color="text.secondary" fontSize="22px">
          <IconButton>{icon}</IconButton>
          {text}
        </Typography>
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
      </FirstStyledHeaderSection>
      <SecondtyledHeaderSection>
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
        <SearchButton theme={theme} onClick={() => setShowSearchModal(true)}>
          <SearchIcon sx={{ mr: "5px", color: "icons.primary" }} />
          <SearchTitle theme={theme}>Search task</SearchTitle>
        </SearchButton>
        <Modal open={showSearchModal} onClose={() => setShowSearchModal(false)}>
          <SearchModal />
        </Modal>
      </SecondtyledHeaderSection>
    </StyledHeader>
  );
};
