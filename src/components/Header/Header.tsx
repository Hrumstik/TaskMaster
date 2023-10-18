import React from "react";

import { Box, IconButton, Typography } from "@mui/material";
import styled from "styled-components";

import LogOutButton from "../LogOutButton/LogOutButton";
import PrintButton from "../PrintButton/PrintButton";
import SearchButton from "../SearchButton/SearchButton";
import ThemeButton from "../ThemeButton/ThemeButton";

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

export const Header: React.FC<HeaderProps> = ({ text, icon }) => {
  return (
    <StyledHeader>
      <HeaderLeftSection>
        <Typography variant="h1" color="text.secondary" fontSize="22px">
          <IconButton>{icon}</IconButton>
          {text}
        </Typography>

        <PrintButton />
      </HeaderLeftSection>
      <HeaderRightSection>
        <SearchButton />
        <ThemeButton />
        <LogOutButton />
      </HeaderRightSection>
    </StyledHeader>
  );
};
