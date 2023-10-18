import React, { useState } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GradeIcon from "@mui/icons-material/Grade";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  Box,
  Drawer,
  IconButton,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { useHttp } from "../../hooks/http.hook";
import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import useScreenSize from "../../hooks/useScreenSize";
import {
  sortTasksAlphabetically,
  showImportantTasks,
} from "../../reducers/featuresSlice";
import { Error, Task } from "../../types/types";
import AddTaskButton from "../addTaskButton/AddTaskButton";
import ListItem from "../ListItem/ListItem";
import { deleteAllTask } from "../TaskListItem/tasksSlice";

const StyledMenuContainer = styled(Box)<{ isMobile: boolean }>`
  background-color: ${({ theme }) => theme.palette.background.default};
  height: 100vh;
  box-shadow: 4px 0px 20px -10px rgba(0, 0, 0, 0.25);
  width: ${({ isMobile }) => (isMobile ? "8%" : "25%")};
`;

const StyledMenuHeader = styled.header<any>`
  padding-top: 40px;
  padding-left: 11%;
  padding-right: 10%;
  display: ${({ ismobile }) => (ismobile ? "flex" : "block")};
  justify-content: ${({ ismobile }) => (ismobile ? "center" : "initial")};
`;

const StyledMenuList = styled.ul`
  padding: 0;
  list-style: none;
`;

export default function Menu() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [error, setError] = useState<Error>({ status: false, message: "" });
  const tasks: Task[] = useSelector(({ tasks }) => tasks.tasks);
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();

  const dispatch = useDispatch();

  const { request } = useHttp();

  const theme = useTheme();

  const { isTaskOwnedByCurrentUser } = useGroupTasks(tasks);

  const deleteAllTasks = async (): Promise<void> => {
    try {
      dispatch(deleteAllTask());
      for (let i = 0; i < tasks.length; i++) {
        if (isTaskOwnedByCurrentUser(tasks[i])) {
          await request(tasks[i].id, "DELETE");
        }
        setError({ status: false, message: "" });
      }
    } catch (error) {
      setError({ status: true, message: "An error occurred" });
      console.error("An error occurred:", error);
    }
  };

  const { isMobile } = useScreenSize();

  const iconStyles = { fontSize: 25, color: "icons.primary" };

  return (
    <StyledMenuContainer theme={theme} isMobile={isMobile}>
      <StyledMenuHeader ismobile={isMobile ? true : false}>
        <IconButton onClick={() => setShowOptions(true)}>
          <MenuOutlinedIcon
            sx={{ fontSize: isMobile ? 25 : 40, color: "icons.primary" }}
          />
        </IconButton>
      </StyledMenuHeader>
      <main>
        <StyledMenuList>
          {/* Here I generete menu-items */}
          {[
            {
              path: "/my-day",
              text: "My day",
              icon: <WbSunnyOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/important",
              text: "Important",
              icon: <StarOutlineOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/planned",
              text: "Planned",
              icon: <DateRangeOutlinedIcon sx={iconStyles} />,
            },
            {
              path: "/",
              text: "All tasks",
              icon: <HomeOutlinedIcon sx={iconStyles} />,
            },
          ].map(({ path, text, icon }) => {
            return <ListItem path={path} text={text} icon={icon} key={text} />;
          })}
        </StyledMenuList>
        <Divider variant="middle" />
        <AddTaskButton />
        {error.status && (
          <Typography
            color="error"
            sx={{ display: "flex", justifyContent: "center", mt: "10px" }}
          >
            {error.message}
          </Typography>
        )}
      </main>

      {/* // Sorting menu located here */}
      <Drawer
        anchor="left"
        transitionDuration={200}
        hideBackdrop={false}
        onClose={() => setShowOptions(false)}
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
              onClick={() => dispatch(showImportantTasks())}
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
            <ListItemButton onClick={deleteAllTasks} divider>
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
