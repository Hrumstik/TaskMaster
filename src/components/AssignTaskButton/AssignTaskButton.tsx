/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Dispatch, SetStateAction } from "react";

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

import { AssignedTask } from "../../types/types";

interface AssignTaskButtonProps {
  setError: Dispatch<SetStateAction<boolean>>;
  assignedTask: AssignedTask;
  setAssignedTask: Dispatch<SetStateAction<AssignedTask>>;
}

export default function AssignTaskButton({
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
          url: `http://localhost:3001/users/`,
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
  }, []);

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
            {assignedTask.availableUsers.map(({ login }) => {
              return <MenuItem value={login}>{login}</MenuItem>;
            })}
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
