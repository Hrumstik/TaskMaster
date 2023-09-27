import { Typography } from "@mui/material";

export default function NoTaskScreen({
  firstTitle,
  secondTitle,
  thirdTitle,
  fourthTitle,
  icon,
}) {
  return (
    <>
      {icon}
      <Typography
        align="center"
        sx={{ fontFamily: "Roboto", fontSize: "34px", color: "text.primary" }}
        variant="h2"
      >
        {firstTitle}
        <br />
        {secondTitle}
        <br />
        {thirdTitle}
      </Typography>
      <Typography
        align="center"
        sx={{ fontFamily: "Roboto", fontSize: "24px", color: "text.primary" }}
        variant="h3"
      >
        <br />
        {fourthTitle}
      </Typography>
    </>
  );
}
