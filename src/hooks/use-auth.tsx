import { useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Task {
  id: string;
  name: string;
  userId: string | string[];
  date: null | string;
  done: boolean;
  important: boolean;
}

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.users.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const currentUserId = useSelector(({ users }) => users.user.id);

  const isTaskOwnedByCurrentUser = (task: Task) => {
    if (
      (typeof task.userId === "string" && task.userId === currentUserId) ||
      (Array.isArray(task.userId) &&
        task.userId.find((id: string) => id === currentUserId))
    ) {
      return true;
    }
  };

  return { isTaskOwnedByCurrentUser };
};

export default useAuth;
