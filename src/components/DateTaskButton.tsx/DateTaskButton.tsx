import React, { memo, useState } from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { Box, IconButton } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

import { useHttp } from "../../hooks/http.hook";
import useGlobalState from "../../hooks/useGlobalState";
import { DateTaskButtonProps } from "../../types/types";
import { setTheDateOfPerfomingTheTask } from "../TaskListItem/tasksSlice";

function DateTaskButton({
  idOfTheTask,
  indexOfTheTask,
  setFocusedTask,
}: DateTaskButtonProps) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { dispatch, tasks } = useGlobalState();
  const { request } = useHttp();

  const handeleSaveTaskDate = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      dispatch(
        setTheDateOfPerfomingTheTask({
          date: dayjs(date).format("DD.MM.YYYY"),
        })
      );
      request(
        idOfTheTask,
        "PUT",
        JSON.stringify({
          ...tasks[indexOfTheTask],
          date: dayjs(date).format("DD.MM.YYYY"),
        })
      );
      setShowCalendar(false);
      setFocusedTask(false);
    }
  };
  return (
    <>
      {showCalendar ? (
        <Box onKeyDown={handeleSaveTaskDate}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              autoFocus
              onChange={(newValue) => setDate(newValue)}
              format="DD.MM.YYYY"
              value={date}
              label="Set date"
            />
          </LocalizationProvider>
        </Box>
      ) : (
        <IconButton onClick={() => setShowCalendar(true)}>
          <DateRangeOutlinedIcon
            sx={{ fontSize: 25, color: "icons.primary" }}
          />
        </IconButton>
      )}
    </>
  );
}

export default memo(DateTaskButton);
