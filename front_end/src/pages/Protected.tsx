// ProtectRouter.js
import React, { ReactNode } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectRouter= ({children}: {children: ReactNode}) => {
  const accessToken = window.localStorage.getItem("token");

  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  return <>
  {children}
  </>;
};

export default ProtectRouter;