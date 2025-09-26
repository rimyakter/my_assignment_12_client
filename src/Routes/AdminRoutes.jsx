import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Shared/Loading";
import useUserRole from "../hooks/useUserRole";
import ForbiddenPage from "../Pages/Forbidden/ForbiddenPage";
import { Navigate } from "react-router";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (!user || role !== "admin") {
    return <Navigate to="/forbidden" state={location.pathname}></Navigate>;
  }
  return children;
};

export default AdminRoutes;
