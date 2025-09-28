import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Shared/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRouter;
