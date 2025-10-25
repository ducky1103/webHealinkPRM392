import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../../components/HomePage/HomePage";
import Login from "../../components/LoginPage/Login";
import RegisterPage from "../../components/LoginPage/RegisterPage";
import ProfilePage from "../../components/HomePage/Profile/Profile";
import PrivateRoute from "./privateRoute";
import AdminPage from "../../components/Admin/AdminPage";
import AboutUs from "../../components/HomePage/AboutUs";
import PodcastPage from "../../components/PodcastPage/PodcastPage";
import PodcastDetail from "../../components/PodcastPage/PodcastDetail";
import StorePage from "../../components/StorePage/StorePage";
import CartPage from "../../components/CartPage/CartPage";
import CheckoutPage from "../../components/CheckoutPage/CheckoutPage";
import PaymentSuccess from "../../components/PaymentMethod/PaymentSuccess";
import PaymentCancel from "../../components/PaymentMethod/PaymentCancel";
import WriteLetterPage from "../../components/WriteLetterPage/WriteLetterPage";
import AdminServicePage from "../../components/Admin/AdminServicePage";
import AdminPodcastPage from "../../components/Admin/AdminPodcastPage";
import AdminLayout from "../../components/Admin/AdminLayout";
import AdminOrderPage from "../../components/Admin/AdminOrderPage";
import HealingDiaryPage from "../../components/HealingDiaryPage/HealingDiaryPage";
import TrackOrdersPage from "../../components/TrackOrdersPage/TrackOrdersPage";
import OTPVerificationPage from "../../components/LoginPage/OTPVerificationPage";
import ForgotPasswordPage from "../../components/LoginPage/ForgotPasswordPage";
import ResetPasswordPage from "../../components/LoginPage/ResetPasswordPage";
import RootLayout from "../../components/Root/RootLayout";
import AdminProductPage from "../../components/Admin/AdminProduct";
import AdminCategoryPage from "../../components/Admin/AdminCategoryPage";
import ChangePasswordPage from "../../components/HomePage/ChangePassword/ChangePassword";
import Game from "../../components/Game/Game";
import ProductDetailPage from "../../components/ProductDetailPage/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "write-letter", element: <WriteLetterPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "store", element: <StorePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout/:id", element: <CheckoutPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
      { path: "payment-cancel", element: <PaymentCancel /> },
      { path: "healing-diary", element: <HealingDiaryPage /> },
      { path: "track-orders/:id", element: <TrackOrdersPage /> },
      { path: "verify-otp", element: <OTPVerificationPage /> },
      { path: "otp-verification", element: <OTPVerificationPage /> }, // Thêm route này
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "change-password", element: <ChangePasswordPage /> },
      { path: "game", element: <Game /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      {
        element: <PrivateRoute allowedRoles={["User", "admin"]} />,
        children: [
          { path: "podcast/:id", element: <PodcastDetail /> },
          { path: "podcast", element: <PodcastPage /> },
        ],
      },
    ],
  },
  {
    path: "/Admin",
    element: <PrivateRoute Route allowedRoles={["Admin"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPage /> },
          { path: "postcard", element: <AdminPodcastPage /> },
          { path: "packages", element: <AdminServicePage /> },
          // ⚡ thêm redirect khi vào /Admin/orders
          {
            path: "orders",
            element: <Navigate to="/Admin/orders/1" replace />,
          },
          { path: "orders/:userId", element: <AdminOrderPage /> },
          { path: "podcast", element: <AdminPodcastPage /> },
          { path: "products", element: <AdminProductPage /> },
          {
            path: "categories",
            element: <AdminCategoryPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
