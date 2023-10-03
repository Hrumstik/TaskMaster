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

const StyledTitleSection = styled(Box)`
  display: flex;
  gap: 9px;
  cursor: pointer;
`;

export const Header: React.FC<HeaderProps> = ({ text, icon }) => {
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLDivElement)
  >(null);
  const [showPrintFeature, setShowPrintFeature] = useState(false);

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

  return (
    <StyledHeader>
      <StyledTitleSection>
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
      </StyledTitleSection>
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
    </StyledHeader>
  );
};
