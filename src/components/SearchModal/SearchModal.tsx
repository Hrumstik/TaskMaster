import React, { FC, useMemo, useState } from "react";

import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import useGroupTasks from "../../hooks/useGroupTasks";
import useScreenSize from "../../hooks/useScreenSize";
import {
  Task,
  UseGroupTasksTypes,
  SearchPanelType,
  FilterButtonType,
  Tasks,
} from "../../types/types";
import SearchInput from "../SearchInput/SearchInput";

import TaskSearchItem from "./TaskSearchItem";

const SearchPanel = styled(Box)<SearchPanelType>`
  position: fixed;
  top: 15%;
  left: 55%;
  display: "flex"
  flex-direction: "column";
  transform: translate(-55%, -15%);
  width: ${({ ismobile, istablet }) => (ismobile || istablet ? "90%" : "50%")};
  height: ${({ foundTasks }) => (foundTasks.length ? "70%" : "45%")};
  padding: 15px 15px 0px 15px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.background.search};
  overflow: auto; 
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px ;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius: 10px;
  }
`;

const TitleNoTask = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-top: 15px;
  margin-bottom: 15px;
`;

const ButtonFilter = styled.button<FilterButtonType>`
  color: ${({ theme }) => theme.palette.text.searchItem};
  background-color: ${({ theme, isActive }) => {
    return isActive
      ? theme.palette.background.searchItemActive
      : theme.palette.background.searchItem;
  }};
  font-size: 16px;
  padding: 4px 16px;
  cursor: pointer;
  border-radius: 4px;
  transform: ${({ isActive }) => {
    return isActive ? "scale(0.93)" : null;
  }};
  box-shadow: ${({ isActive }) => {
    return isActive ? "0 2px 4px rgba(0, 0, 0, 0.2);" : null;
  }};
`;

const NoTaskFoundContainer = styled(Box)`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const TaskListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchModal: FC = () => {
  const { tasks, theme } = useGlobalState();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActiveButton, setIsActiveButton] = useState<string>("all tasks");
  const [actualTaskArray, setActualTaskArray] = useState<Task[]>(tasks);
  const [foundTasks, setFoundTasks] = useState<Tasks>([]);
  const [filterDateValue, setFilterDateValue] = useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs(),
  ]);

  const {
    unfinishedTasks,
    importantAllTasks,
    overdueTasks,
    isTaskOwnedByCurrentUser,
  }: UseGroupTasksTypes = useGroupTasks(tasks);

  const searchTasks = (searchValue: string, arrTasks: Tasks) => {
    let selectedTasks: Tasks = [];
    if (searchValue.trim().length > 0) {
      selectedTasks = arrTasks.filter((task: Task) => {
        if (isTaskOwnedByCurrentUser(task)) {
          return task.name
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim());
        } else {
          return null;
        }
      });
    }
    return selectedTasks;
  };

  const applyFilter = (nameOfTheFilter: string, filteredTaskArray: Tasks) => {
    setIsActiveButton(nameOfTheFilter);
    setActualTaskArray(filteredTaskArray);
    setFoundTasks(searchTasks(searchValue, filteredTaskArray));
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
      } else {
        return null;
      }
    });
  };

  const handleChangeOfDateRanger = (newFilterDateValue: DateRange<Dayjs>) => {
    setFilterDateValue(newFilterDateValue);
    const [startDate, endDate] = newFilterDateValue;
    if (startDate && endDate) {
      setFoundTasks(sortByPeriod(startDate, endDate));
      setActualTaskArray(sortByPeriod(startDate, endDate));
    }
  };

  const displayTheTasks =
    foundTasks.length ||
    (filterDateValue && "filter by date" === isActiveButton);

  const { isMobile, isTablet } = useScreenSize();

  const renderedTasks = useMemo(() => {
    return foundTasks.map(({ name, important, date, id, userId, done }) => {
      return (
        <TaskSearchItem
          key={id}
          userId={userId}
          done={done}
          id={id}
          name={name}
          important={important}
          date={date}
        />
      );
    });
  }, [foundTasks]);

  return (
    <SearchPanel
      theme={theme}
      foundTasks={foundTasks}
      ismobile={isMobile}
      istablet={isTablet}
    >
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isActiveButton={isActiveButton}
        actualTaskArray={actualTaskArray}
        setFoundTasks={setFoundTasks}
        filterDateValue={filterDateValue}
        searchTasks={searchTasks}
        sortByPeriod={sortByPeriod}
      />
      <FilterContainer>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <ButtonFilter
            onClick={() => applyFilter("all tasks", tasks)}
            theme={theme}
            isActive={isActiveButton === "all tasks"}
          >
            All tasks
          </ButtonFilter>
          <ButtonFilter
            onClick={() => applyFilter("unfinished tasks", unfinishedTasks)}
            theme={theme}
            isActive={isActiveButton === "unfinished tasks"}
          >
            Unfinished tasks
          </ButtonFilter>
          <ButtonFilter
            onClick={() => applyFilter("important tasks", importantAllTasks)}
            theme={theme}
            isActive={isActiveButton === "important tasks"}
          >
            Important tasks
          </ButtonFilter>
          <ButtonFilter
            onClick={() => applyFilter("overdue tasks", overdueTasks)}
            theme={theme}
            isActive={isActiveButton === "overdue tasks"}
          >
            Overdue tasks
          </ButtonFilter>
          <ButtonFilter
            onClick={() => setIsActiveButton("filter by date")}
            theme={theme}
            isActive={isActiveButton === "filter by date"}
          >
            Filter by date
          </ButtonFilter>
        </Box>

        {"filter by date" === isActiveButton && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{ start: "From", end: "To" }}
              format="D MMM YYYY"
              value={filterDateValue}
              onChange={handleChangeOfDateRanger}
            />
          </LocalizationProvider>
        )}
      </FilterContainer>

      {displayTheTasks ? (
        <TaskListContainer>{renderedTasks}</TaskListContainer>
      ) : searchValue === "" ? (
        <TitleNoTask fontSize={24} theme={theme}>
          Start typing to search for tasks...
        </TitleNoTask>
      ) : (
        <NoTaskFoundContainer>
          <SearchOffIcon sx={{ fontSize: 60, color: "icons.secondary" }} />
          <TitleNoTask fontSize={24} theme={theme}>
            Task "{searchValue}" not found among {isActiveButton}
          </TitleNoTask>
        </NoTaskFoundContainer>
      )}
    </SearchPanel>
  );
};

export default SearchModal;
