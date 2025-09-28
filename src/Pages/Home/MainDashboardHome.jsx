import React from "react";
import useUserRole from "../../hooks/useUserRole";
import DashboardHome from "../Donor/DashboardHome/DashboardHome";
import AdminHome from "./AdminHome";
import Loading from "../Shared/Loading";
import VolunteerHome from "./VolunteerHome";
import ForbiddenPage from "../Forbidden/ForbiddenPage";

const MainDashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  // console.log(role);

  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "donor") {
    return <DashboardHome></DashboardHome>;
  } else if (role === "admin") {
    return <AdminHome></AdminHome>;
  } else if (role === "volunteer") {
    return <VolunteerHome></VolunteerHome>;
  } else return <ForbiddenPage></ForbiddenPage>;
};

export default MainDashboardHome;
