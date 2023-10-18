import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../components/store/store";

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
