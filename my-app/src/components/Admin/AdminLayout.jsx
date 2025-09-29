import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { logoutRequest } from "../../redux/auth/authSlice";
import { getDisplayName } from "../../utils/role";
import logo from "../../img/logo.jpg";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.account);
  const displayName = getDisplayName(user);

  const menuItems = [
    { label: "Tài Khoản", to: "" },
    { label: "Postcard", to: "postcard" },
    { label: "Đơn Hàng", to: "orders" },
    { label: "Các Gói", to: "packages" },
    { label: "Sản Phẩm", to: "products" },
    { label: "Podcast", to: "podcast" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="h-14 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white font-extrabold">
              <img src={logo} alt="" />
            </div>
            <div className="font-semibold">Hành trình của cảm xúc</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-700 hidden sm:inline">
              {displayName}
            </span>
            <button
              onClick={() => {
                dispatch(logoutRequest());
                navigate("/login");
              }}
              className="inline-flex items-center rounded-md bg-slate-900 text-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 font-semibold">
            Quản lí tài khoản
          </div>
          <nav className="flex-1 p-2 overflow-y-auto">
            {menuItems.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-50"
              >
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-5 border-t border-slate-200 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-slate-200" />
            <div className="text-sm">
              <div className="font-semibold">{displayName}</div>
              <div className="text-slate-500">Quản trị viên</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
