import React, { memo } from "react";

import { IconButton, Typography } from "@mui/material";
import styled from "styled-components";

import useScreenSize from "../../hooks/useScreenSize";
import { HeaderProps } from "../../types/types";
import LogOutButton from "../LogOutButton/LogOutButton";
import PrintButton from "../PrintButton/PrintButton";
import SearchButton from "../SearchButton/SearchButton";
import ThemeButton from "../ThemeButton/ThemeButton";

const StyledHeader = styled.header<any>`
  display: flex;
  justify-content: space-between;
  padding-right: 18px;
  padding-left: 18px;
  margin-bottom: 37px;
`;

const HeaderLeftSection = styled.div<any>`
  display: flex;
  gap: 9px;
  cursor: pointer;
`;

const HeaderRightSection = styled.div<any>`
  display: flex;
  width: 35%;
  height: 100%;
  gap: 10px;
  justify-content: flex-end;
`;

const Header: React.FC<HeaderProps> = ({ text, icon }) => {
  const { isMobile } = useScreenSize();
  return (
    <StyledHeader>
      <HeaderLeftSection>
        <Typography
          variant="h1"
          color="text.secondary"
          fontSize="22px"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!isMobile && <IconButton>{icon}</IconButton>}
          {text}
        </Typography>
        {!isMobile && <PrintButton />}
      </HeaderLeftSection>
      <HeaderRightSection>
        <SearchButton />
        <ThemeButton />
        <LogOutButton />
      </HeaderRightSection>
    </StyledHeader>
  );
};

export default memo(Header);
