import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRouter from "./PrivateRouter";
import CreateDonationRequest from "../Pages/Donor/CreateDonationRequest";
import MyDonationRequests from "../Pages/Donor/MyDonationRequest";
import DashboardLayout from "../Layouts/DashboardLayout";
import ProfilePage from "../Pages/Shared/ProfilePage";
import AllDonationRequests from "../Pages/Home/AllDonationRequests/AllDonationRequests";
import DashboardHome from "../Pages/Donor/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-donation-pending",
        element: <AllDonationRequests></AllDonationRequests>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "/dashboard/My-donation-request",
        element: <MyDonationRequests></MyDonationRequests>,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
]);
