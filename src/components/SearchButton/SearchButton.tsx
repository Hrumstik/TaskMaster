import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";

import useScreenSize from "../../hooks/useScreenSize";
import SearchModal from "../SearchModal/SearchModal";

const SearchTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const SearchButtonStyled = styled.button<{ theme: Theme }>`
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

export default function SearchButton() {
  const { isMobile, isTablet } = useScreenSize();
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <>
      {isMobile || isTablet ? (
        <IconButton onClick={() => setShowSearchModal(true)}>
          <SearchIcon
            sx={{ fontSize: 40, color: "icons.secondary" }}
          ></SearchIcon>
        </IconButton>
      ) : (
        <SearchButtonStyled
          theme={theme}
          onClick={() => setShowSearchModal(true)}
        >
          <SearchIcon sx={{ mr: "5px", color: "icons.primary" }} />
          <SearchTitle theme={theme}>Search task</SearchTitle>
        </SearchButtonStyled>
      )}
      <Modal open={showSearchModal} onClose={() => setShowSearchModal(false)}>
        <SearchModal />
      </Modal>
    </>
  );
}
