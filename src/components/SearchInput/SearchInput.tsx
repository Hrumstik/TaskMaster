import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import { SearchInputProps } from "../../types/types";

const InputWrapper = styled.form`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const StyledLabel = styled.label`
  margin-right: 10px;
  margin-left: 10px;
`;

const SearchInputStyled = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.palette.background.default};
  font-size: 24px;
  color: ${({ theme }) => theme.palette.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default function SearchInput({
  searchValue,
  setSearchValue,
  isActiveButton,
  actualTaskArray,
  setFoundTasks,
  filterDateValue,
  searchTasks,
  sortByPeriod,
}: SearchInputProps) {
  const { theme } = useGlobalState();

  const handleChangeSearchInput = () => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const actualSearchValue = e.target.value;
      setSearchValue(actualSearchValue);
      if ("filter by date" === isActiveButton && !actualSearchValue) {
        handleFilterByDate();
      } else {
        setFoundTasks(searchTasks(actualSearchValue, actualTaskArray));
      }
    };
  };

  const handleCleanSearchInput = () => {
    setSearchValue("");
    setFoundTasks([]);
  };

  const handleFilterByDate = () => {
    const [startDate, endDate] = filterDateValue;
    if (startDate && endDate) {
      setFoundTasks(sortByPeriod(startDate, endDate));
    }
  };

  return (
    <InputWrapper theme={theme}>
      <StyledLabel>
        <SearchIcon sx={{ color: "icons.secondary", fontSize: 40 }} />
      </StyledLabel>
      <SearchInputStyled
        theme={theme}
        placeholder="Search task"
        value={searchValue}
        onChange={handleChangeSearchInput()}
      />
      <CloseIcon
        onClick={handleCleanSearchInput}
        sx={{ fontSize: 40, mr: "5px", cursor: "pointer" }}
      />
    </InputWrapper>
  );
}
