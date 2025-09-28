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
import DonorSearchPage from "../Pages/DonorSearchPage/DonorSearchPage";
import DetailsDonationRequest from "../Pages/Home/DetailsDonationRequest/DetailsDonationRequest";
import EditDonationRequest from "../Pages/Donor/EditDonationRequest/EditDonationRequest";
import AllUsersPage from "../Pages/Admin/AllUsersPage";
import AllBloodDonationRequests from "../Pages/Admin/AllBloodDonationRequests";
import ContentManagement from "../Pages/Admin/ContentManagement";
import AddBlog from "../Pages/Admin/AddBlogPage";
import BlogListPage from "../Pages/BlogList/BlogListPage";
import ForbiddenPage from "../Pages/Forbidden/ForbiddenPage";
import AdminRoutes from "./AdminRoutes";
import MainDashboardHome from "../Pages/Home/MainDashboardHome";
import BlogDetails from "../Pages/BlogList/BlogDetails";
import FundingPage from "../Pages/Funding/FundingPage";
import Fund from "../Pages/Funding/Fund";

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
        path: "/forbidden",
        element: <ForbiddenPage></ForbiddenPage>,
      },
      {
        path: "/all-donation-pending",
        element: <AllDonationRequests></AllDonationRequests>,
      },
      {
        path: "/searchPage",
        element: <DonorSearchPage></DonorSearchPage>,
      },
      {
        path: "/blogs",
        element: <BlogListPage></BlogListPage>,
      },
      {
        path: "/blogs/:id",
        element: (
          <PrivateRouter>
            <BlogDetails></BlogDetails>
          </PrivateRouter>
        ),
      },

      {
        path: "/detailsDonationRequest/:id",
        element: (
          <PrivateRouter>
            <DetailsDonationRequest></DetailsDonationRequest>
          </PrivateRouter>
        ),
      },
      {
        path: "/updateDonationRequest/:id",
        element: (
          <PrivateRouter>
            <EditDonationRequest></EditDonationRequest>
          </PrivateRouter>
        ),
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
        index: true,
        element: <MainDashboardHome></MainDashboardHome>,
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
        path: "/dashboard/profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoutes>
            <AllUsersPage></AllUsersPage>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllBloodDonationRequests></AllBloodDonationRequests>,
      },
      {
        path: "/dashboard/content-management",
        element: <ContentManagement></ContentManagement>,
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/dashboard/fundingPage",
        element: (
          <PrivateRouter>
            <FundingPage></FundingPage>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/fundingPage/giveFund",
        element: (
          <PrivateRouter>
            <Fund></Fund>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
