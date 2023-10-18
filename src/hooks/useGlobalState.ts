import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import { Tasks } from "../types/types";

export default function useGlobalState() {
  const stateOfInput: boolean = useSelector(({ input }) => input);
  const userId: string = useSelector(({ users }) => users.user.id);
  const tasks: Tasks = useSelector(({ tasks }) => tasks.tasks);
  const dispatch = useDispatch();
  const theme = useTheme();
  return { stateOfInput, userId, theme, tasks, dispatch };
}
