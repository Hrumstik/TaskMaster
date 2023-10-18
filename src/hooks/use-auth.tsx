import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../components/store/store";
import { Task } from "../types/types";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.users.auth);

  const currentUserId = useSelector(({ users }) => users.user.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const isTaskOwnedByCurrentUser = (task: Task) => {
    if (
      (typeof task.userId === "string" && task.userId === currentUserId) ||
      (Array.isArray(task.userId) &&
        task.userId.find((id: string) => id === currentUserId))
    ) {
      return true;
    }
    return false;
  };

  return { isTaskOwnedByCurrentUser };
};

export default useAuth;
