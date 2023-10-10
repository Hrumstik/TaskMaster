import { useSelector } from "react-redux";
import { RootState } from "../components/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAuth = () => {
  const auth = useSelector((state: RootState) => state.users.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);
};

export default useAuth;
