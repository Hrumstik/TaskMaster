import React, { Dispatch, SetStateAction } from "react";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IconButton } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

import { DateState } from "../../types/types";

interface CreateTaskDateButtonProprs {
  dateState: DateState;
  setDateState: Dispatch<SetStateAction<DateState>>;
}

export default function CreateTaskDateButton({
  dateState,
  setDateState,
}: CreateTaskDateButtonProprs) {
  const showCalendar = () => {
    setDateState((prevState) => ({
      ...prevState,
      showCalendar: true,
      dateIconClicked: true,
    }));
  };

  const handleChangeDateField = (newValue: Dayjs | null) => {
    setDateState((prevState) => ({
      ...prevState,
      dateOfNewTask: newValue,
    }));
  };

  return (
    <>
      {dateState.showCalendar ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            autoFocus
            onChange={handleChangeDateField}
            format="DD.MM.YYYY"
            value={dateState.dateOfNewTask}
            label="Set date"
          />
        </LocalizationProvider>
      ) : (
        <IconButton onClick={showCalendar}>
          <DateRangeOutlinedIcon
            sx={{ fontSize: 25, color: "icons.primary" }}
          />
        </IconButton>
      )}
    </>
  );
}
