import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);
};

export default useAuth;
