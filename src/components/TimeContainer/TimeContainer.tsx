import React from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Typography } from "@mui/material";

type TimeContainerProps = {
  text: string;
};

const TimeContainer: React.FC<TimeContainerProps> = ({ text }) => {
  return (
    <Box sx={{ display: "flex", paddingLeft: "32px" }}>
      <CalendarMonthIcon sx={{ mr: "15px", color: "red", fontSize: 30 }} />
      <Typography variant="h5" sx={{ color: "red", dalignContent: "center" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default TimeContainer;
