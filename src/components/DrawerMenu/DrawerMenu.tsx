import React, { Dispatch, SetStateAction } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GradeIcon from "@mui/icons-material/Grade";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useHttp } from "../../hooks/http.hook";
import useFeatures from "../../hooks/useFeatures";
import useGlobalState from "../../hooks/useGlobalState";
import useGroupTasks from "../../hooks/useGroupTasks";
import {
  sortTasksAlphabetically,
  showImportantTasks,
} from "../../reducers/featuresSlice";
import { deleteAllTask } from "../TaskListItem/tasksSlice";

interface DrawerMenuProps {
  setError: Dispatch<SetStateAction<{ status: boolean; message: string }>>;
  showOptions: boolean;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
}

export default function DrawerMenu({
  setError,
  setShowOptions,
  showOptions,
}: DrawerMenuProps) {
  const { sortTasksAlphabeticallyState, showImportantTasksState } =
    useFeatures();

  const { dispatch, tasks } = useGlobalState();
  const { isTaskOwnedByCurrentUser } = useGroupTasks(tasks);

  const { request } = useHttp();

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

  return (
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
  );
}
