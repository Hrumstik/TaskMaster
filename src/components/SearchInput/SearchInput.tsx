import React, { Dispatch, SetStateAction } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import useGroupTasks from "../../hooks/useGroupTasks";
import { Task, Tasks } from "../../types/types";

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

interface SearchInputProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  isActiveButton:
    | "all tasks"
    | "unfinished tasks"
    | "important tasks"
    | "overdue tasks"
    | "filter by date";
  actualTaskArray: Tasks;
  setFoundTasks: Dispatch<SetStateAction<Tasks>>;
  filterDateValue: DateRange<Dayjs>;
}

export default function SearchInput({
  searchValue,
  setSearchValue,
  isActiveButton,
  actualTaskArray,
  setFoundTasks,
  filterDateValue,
}: SearchInputProps) {
  const { theme, tasks } = useGlobalState();

  const { isTaskOwnedByCurrentUser } = useGroupTasks(tasks);

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

  const searchTasks = (searchValue: string, arrTasks: Tasks) => {
    let selectedTasks: Tasks = [];
    if (searchValue.trim().length > 0) {
      selectedTasks = arrTasks.filter((task: Task) => {
        if (isTaskOwnedByCurrentUser(task)) {
          return task.name
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim());
        }
      });
    }
    return selectedTasks;
  };

  const sortByPeriod = (firstDate: Dayjs, secondDate: Dayjs) => {
    return tasks.filter((task: Task) => {
      if (isTaskOwnedByCurrentUser(task)) {
        const taskDate = dayjs(task.date, "DD.MM.YYYY");
        return (
          (taskDate.isBefore(secondDate, "day") ||
            taskDate.isSame(secondDate, "day")) &&
          (taskDate.isAfter(firstDate, "day") ||
            taskDate.isSame(firstDate, "day"))
        );
      }
    });
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
