import React from "react";

import { Outlet } from "react-router-dom";

import useAuth from "../../hooks/use-auth";

export const ProtectedRoute = () => {
  useAuth();
  return <Outlet />;
};
