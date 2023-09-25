import "./Menu.css";
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

export default function Menu() {
  const [showOptions, setShowOptions] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();
  const dispatch = useDispatch();
  const { request } = useHttp();

  return (
    <Box sx={{ bgcolor: "background.default" }} className="menu">
      <header className="menu__header">
        <IconButton onClick={() => setShowOptions(true)}>
          <MenuOutlinedIcon
            className="icon"
            sx={{ fontSize: 40, color: "icons.primary" }}
          />
        </IconButton>
      </header>
      <main>
        <ul className="menu_list">
          <ListItem
            path={"/my-day"}
            active={false}
            height="54px"
            mr="25px"
            text="My day"
            icon={
              <WbSunnyOutlinedIcon
                sx={{
                  fontSize: 25,
                  color: "icons.primary",
                }}
              />
            }
          />
          <ListItem
            path={"/important"}
            active={false}
            height="54px"
            mr="25px"
            text="Important"
            icon={
              <StarOutlineOutlinedIcon
                sx={{
                  fontSize: 25,
                  color: "icons.primary",
                }}
              />
            }
          />
          <ListItem
            path={"/planned"}
            active={false}
            height="54px"
            mr="25px"
            text="Planned"
            icon={
              <DateRangeOutlinedIcon
                sx={{
                  fontSize: 25,
                  color: "icons.primary",
                }}
              />
            }
          />
          <ListItem
            path={"/"}
            active={true}
            height="54px"
            mr="25px"
            text="Tasks"
            icon={
              <HomeOutlinedIcon
                sx={{
                  fontSize: 25,
                  color: "icons.primary",
                }}
              />
            }
          />
        </ul>
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
        <Box
          sx={{
            backgroundColor: "#FAF9F8",
            width: "280px",
            display: "flex",
            gap: "30px",
          }}
        >
          <List>
            <ListItemButton
              selected={sortTasksAlphabeticallyState}
              divider={true}
              onClick={() => {
                dispatch(sortTasksAlphabetically());
              }}
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
                  request(
                    `http://localhost:3001/tasks/${tasks[i].id}`,
                    "DELETE"
                  );
                }
              }}
              divider={true}
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
    </Box>
  );
}
