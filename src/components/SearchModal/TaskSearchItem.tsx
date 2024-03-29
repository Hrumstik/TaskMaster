import React, { FC } from "react";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styled from "styled-components";

import useGlobalState from "../../hooks/useGlobalState";
import { Task } from "../../types/types";

dayjs.extend(customParseFormat);

const TaskSearchItemContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.searchItem};
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
`;

const TaskSearchItem: FC<Task> = ({ name, important, date }) => {
  const { theme } = useGlobalState();
  const formattedDate = dayjs(date, "DD.MM.YYYY").format("D MMM YYYY");

  return (
    <TaskSearchItemContainer theme={theme}>
      <Typography fontSize={20} color="text.searchItem">
        {name}
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Typography color="text.searchItem">
          {formattedDate !== "Invalid Date"
            ? formattedDate
            : "Task without deadline"}
        </Typography>
        {important ? (
          <StarIcon
            sx={{
              fontSize: 25,
              color: "icons.searchItem",
            }}
          />
        ) : (
          <StarBorderIcon sx={{ fontSize: 25, color: "icons.searchItem" }} />
        )}
      </Box>
    </TaskSearchItemContainer>
  );
};

export default TaskSearchItem;
