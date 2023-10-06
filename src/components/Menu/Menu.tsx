import React from "react";
import ListItem from "../ListItem/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  sortTasksAlphabetically,
  showImportantTasks,
} from "../../reducers/featuresSlice";
import { deleteAllTask } from "../TaskListItem/tasksSlice";
import useFeatures from "../../hooks/useFeatures";
import { useHttp } from "../../hooks/http.hook";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, Drawer, IconButton, List } from "@mui/material";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Divider from "@mui/material/Divider";
import AddTaskButton from "../addTaskButton/AddTaskButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

const StyledMenuContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.default};
  height: 100vh;
  box-shadow: 4px 0px 20px -10px rgba(0, 0, 0, 0.25);
  width: 25%;
`;

const StyledMenuHeader = styled.header`
  padding-top: 40px;
  padding-left: 11%;
  padding-right: 10%;
`;

const StyledMenuList = styled.ul`
  padding: 0;
  list-style: none;
`;

export default function Menu() {
  const [showOptions, setShowOptions] = useState(false);
  const tasks = useSelector(({ tasks }) => tasks.tasks);
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();
  const dispatch = useDispatch();
  const { request } = useHttp();

  const theme = useTheme();

  return (
    <StyledMenuContainer theme={theme}>
      <StyledMenuHeader>
        <IconButton onClick={() => setShowOptions(true)}>
          <MenuOutlinedIcon sx={{ fontSize: 40, color: "icons.primary" }} />
        </IconButton>
      </StyledMenuHeader>
      <main>
        <StyledMenuList>
          {[
            {
              path: "/my-day",
              text: "My day",
              icon: (
                <WbSunnyOutlinedIcon
                  sx={{
                    fontSize: 25,
                    color: "icons.primary",
                  }}
                />
              ),
            },
            {
              path: "/important",
              text: "Important",
              icon: (
                <StarOutlineOutlinedIcon
                  sx={{
                    fontSize: 25,
                    color: "icons.primary",
                  }}
                />
              ),
            },
            {
              path: "/planned",
              text: "Planned",
              icon: (
                <DateRangeOutlinedIcon
                  sx={{
                    fontSize: 25,
                    color: "icons.primary",
                  }}
                />
              ),
            },
            {
              path: "/",
              text: "All tasks",
              icon: (
                <HomeOutlinedIcon
                  sx={{
                    fontSize: 25,
                    color: "icons.primary",
                  }}
                />
              ),
            },
          ].map(({ path, text, icon }) => {
            return <ListItem path={path} text={text} icon={icon} key={text} />;
          })}
        </StyledMenuList>
        <Divider variant="middle" />
        <AddTaskButton />
      </main>
      <Drawer
        anchor="left"
        transitionDuration={200}
        hideBackdrop={false}
        onClose={() => {
          setShowOptions(false);
        }}
        open={showOptions}
      >
        <Box>
          <List sx={{ bgcolor: "background.paper" }}>
            <ListItemButton
              selected={sortTasksAlphabeticallyState}
              divider
              onClick={() => dispatch(sortTasksAlphabetically())}
            >
              <ListItemIcon>
                <CalendarMonthIcon sx={{ color: "icons.primary" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "text.primary" }}
                primary="Sort tasks alphabetically"
              />
            </ListItemButton>
            <ListItemButton
              selected={showImportantTasksState}
              onClick={() => {
                dispatch(showImportantTasks());
              }}
              divider={true}
            >
              <ListItemIcon>
                <GradeIcon sx={{ color: "icons.primary" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "text.primary" }}
                primary="Show important tasks"
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                dispatch(deleteAllTask());
                for (let i = 0; i < tasks.length; i++) {
                  request(tasks[i].id, "DELETE");
                }
              }}
              divider
            >
              <ListItemIcon>
                <DeleteForeverIcon sx={{ color: "icons.primary" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "text.primary" }}
                primary="Delete all tasks"
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </StyledMenuContainer>
  );
}
