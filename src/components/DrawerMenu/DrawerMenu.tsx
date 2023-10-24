import React, { Dispatch, SetStateAction } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GradeIcon from "@mui/icons-material/Grade";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import useFeatures from "../../hooks/useFeatures";
import useGlobalState from "../../hooks/useGlobalState";
import {
  sortTasksAlphabetically,
  showImportantTasks,
} from "../../reducers/featuresSlice";

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

  const { dispatch } = useGlobalState();

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
        </List>
      </Box>
    </Drawer>
  );
}
