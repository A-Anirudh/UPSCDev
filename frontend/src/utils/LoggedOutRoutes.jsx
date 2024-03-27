import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const LoggedOutRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.data?.pid ?<Navigate to="/home" replace />  : <Outlet />;
};
