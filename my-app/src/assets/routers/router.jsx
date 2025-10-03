import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../components/HomePage/HomePage";
import Login from "../../components/LoginPage/Login";
import RegisterdPage from "../../components/LoginPage/RegisterdPage";
import RootLayout from "../../components/layout/RootLayout";
import PrivateRoute from "./privateRoute";
import AdminPage from "../../components/Admin/AdminPage";
import AboutUs from "../../components/HomePage/AboutUs";
import PodcastPage from "../../components/PodcastPage/PodcastPage";
import PodcastDetail from "../../components/PodcastPage/PodcastDetail";
import StorePage from "../../components/StorePage/StorePage";
import CartPage from "../../components/CartPage/CartPage";
import CheckoutPage from "../../components/CheckoutPage/CheckoutPage";
import WriteLetterPage from "../../components/WriteLetterPage/WriteLetterPage";
import AdminServicePage from "../../components/Admin/AdminServicePage";
import AdminPodcastPage from "../../components/Admin/AdminPodcastPage";
import AdminLayout from "../../components/Admin/AdminLayout";
import AdminOrderPage from "../../components/Admin/AdminOrderPage";
import HealingDiaryPage from "../../components/HealingDiaryPage/HealingDiaryPage";
import TrackOrdersPage from "../../components/TrackOrdersPage/TrackOrdersPage";
import OTPVerificationPage from "../../components/LoginPage/OTPVerificationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "write-letter", element: <WriteLetterPage /> },
      { path: "registered", element: <RegisterdPage /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "store", element: <StorePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout/:userId", element: <CheckoutPage /> },
      { path: "healing-diary", element: <HealingDiaryPage /> },
      { path: "track-orders", element: <TrackOrdersPage /> },
      { path: "verify-otp", element: <OTPVerificationPage /> },
      {
        element: <PrivateRoute allowedRoles={["User", "Admin"]} />,
        children: [
          { path: "podcast/:id", element: <PodcastDetail /> },
          { path: "podcast", element: <PodcastPage /> },
        ],
      },
    ],
  },
  {
    path: "/Admin",
    element: <PrivateRoute allowedRoles={["Admin"]} />, // Thêm PrivateRoute protection
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPage /> }, // /admin
          { path: "postcard", element: <AdminPodcastPage /> }, // /admin/postcard
          { path: "packages", element: <AdminServicePage /> }, // /admin/packages
          { path: "orders", element: <AdminOrderPage /> }, // /admin/orders
        ],
      },
    ],
  },
]);

export default router;
