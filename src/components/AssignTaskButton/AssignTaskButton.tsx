import React, { memo, useEffect, useMemo } from "react";

import PeopleIcon from "@mui/icons-material/People";
import {
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";

import { AssignTaskButtonProps } from "../../types/types";

function AssignTaskButton({
  setError,
  assignedTask,
  setAssignedTask,
}: AssignTaskButtonProps) {
  const showUserSelect = () => {
    setAssignedTask((prevState) => ({
      ...prevState,
      showSelectUser: true,
    }));
  };

  const handleUserSelect = (e: SelectChangeEvent<string[]>) => {
    setAssignedTask((prevState) => ({
      ...prevState,
      responsibleForTheTaskUser: e.target.value as string[],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          method: "GET",
          url: process.env.REACT_APP_BASE_URL_TASKS,
          headers: { "Content-Type": "application/json" },
        };

        const response = await axios(config);
        setAssignedTask((prevState) => ({
          ...prevState,
          availableUsers: response.data,
        }));
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, [setAssignedTask, setError]);

  const renderedUsers = useMemo(() => {
    return assignedTask.availableUsers.map(({ login, id }) => {
      return (
        <MenuItem key={id} value={login}>
          {login}
        </MenuItem>
      );
    });
  }, [assignedTask]);

  return (
    <>
      {assignedTask.showSelectUser ? (
        <FormControl variant="standard" sx={{ minWidth: 160 }} color="primary">
          <InputLabel>User</InputLabel>
          <Select
            multiple
            value={assignedTask.responsibleForTheTaskUser}
            onChange={handleUserSelect}
            defaultOpen
          >
            {renderedUsers}
          </Select>
        </FormControl>
      ) : (
        <Button
          variant="text"
          sx={{ alignSelf: "center" }}
          endIcon={<PeopleIcon />}
          onClick={showUserSelect}
        >
          Assign a task
        </Button>
      )}
    </>
  );
}

export default memo(AssignTaskButton);
