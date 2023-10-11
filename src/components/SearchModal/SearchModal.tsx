import React, { FC, useState } from "react";
import useGroupTasks from "../../hooks/useGroupTasks";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TaskSearchItem from "./TaskSearchItem";
import { Theme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import useScreenSize from "../../hooks/useScreenSize";

interface Task {
  id: string;
  name: string;
  userId: string | string[];
  date: null | string;
  done: boolean;
  important: boolean;
}

interface SearchPanelType {
  foundTasks: Task[];
  theme: Theme;
  isMobile: boolean;
  isTablet: boolean;
}

interface FilterButtonType {
  isActive: string | boolean;
  theme: Theme;
}

const SearchPanel = styled(Box)<SearchPanelType>`
  position: fixed;
  top: 15%;
  left: 55%;
  display: "flex"
  flex-direction: "column";
  transform: translate(-55%, -15%);
  width: ${({ isMobile, isTablet }) => (isMobile || isTablet ? "90%" : "50%")};
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

const SearchInput = styled.input`
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

const StyledLabel = styled.label`
  margin-right: 10px;
  margin-left: 10px;
`;

const TaskListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SearchModal: FC = () => {
  const theme = useTheme();
  const tasks = useSelector(({ tasks }) => tasks.tasks);
  const [searchValue, setSearchValue] = useState("");
  const [isActiveButton, setIsActiveButton] = useState<string>("all tasks");
  const [actualTaskArray, setActualTaskArray] = useState<Task[]>(tasks);
  const [foundTasks, setFoundTasks] = useState<Task[]>([]);
  const [filterDateValue, setFilterDateValue] = useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs(),
  ]);
  const currentUserId = useSelector(({ users }) => users.user.id);

  const { unfinishedTasks, importantAllTasks, overdueTasks } =
    useGroupTasks(tasks);

  const searchCondition = (task: Task) => {
    if (
      (typeof task.userId === "string" && task.userId === currentUserId) ||
      (Array.isArray(task.userId) &&
        task.userId.find((id: string) => id === currentUserId))
    ) {
      return true;
    }
  };

  const searchTasks = (searchValue: string, arrTasks: Task[]) => {
    let selectedTaks: Task[] = [];
    if (searchValue.trim().length > 0) {
      selectedTaks = arrTasks.filter((task: Task) => {
        if (searchCondition(task)) {
          return task.name
            .toLowerCase()
            .includes(searchValue.toLowerCase().trim());
        }
      });
    }
    return selectedTaks;
  };

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

  const handleFilterByDate = () => {
    const [startDate, endDate] = filterDateValue;
    if (startDate && endDate) {
      setFoundTasks(sortByPeriod(startDate, endDate));
    }
  };

  const handleCleanSearchInput = () => {
    setSearchValue("");
    setFoundTasks([]);
  };

  const applyFilter = (nameOfTheFilter: string, filteredTaskArray: Task[]) => {
    setIsActiveButton(nameOfTheFilter);
    setActualTaskArray(filteredTaskArray);
    setFoundTasks(searchTasks(searchValue, filteredTaskArray));
  };

  const sortByPeriod = (firstDate: Dayjs, secondDate: Dayjs) => {
    return tasks.filter((task: Task) => {
      const taskDate = dayjs(task.date, "DD.MM.YYYY");
      return (
        (taskDate.isBefore(secondDate, "day") ||
          taskDate.isSame(secondDate, "day")) &&
        (taskDate.isAfter(firstDate, "day") ||
          taskDate.isSame(firstDate, "day"))
      );
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

  return (
    <SearchPanel
      theme={theme}
      foundTasks={foundTasks}
      isMobile={isMobile}
      isTablet={isTablet}
    >
      <InputWrapper theme={theme}>
        <StyledLabel>
          <SearchIcon sx={{ color: "icons.secondary", fontSize: 40 }} />
        </StyledLabel>
        <SearchInput
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
        <TaskListContainer>
          {foundTasks.map(({ name, important, date, id }) => {
            return (
              <TaskSearchItem
                key={id}
                name={name}
                important={important}
                date={date}
              />
            );
          })}
        </TaskListContainer>
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
