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
    { label: "Đơn Hàng", to: "orders" },
    // { label: "Các Gói", to: "packages" },
    { label: "Sản Phẩm", to: "products" },
    { label: "Podcast", to: "podcast" },
    { label: "Categories", to: "categories" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf8f4]">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: { duration: 3000 },
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#e7d4b5] text-slate-800 border-b border-amber-200 shadow-sm">
        <div className="h-14 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Healink"
              className="h-8 w-8 rounded-lg object-cover shadow-sm"
            />
            <h1 className="font-bold text-lg tracking-tight">Healink Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:inline">
              {displayName}
            </span>
            <button
              onClick={() => {
                dispatch(logoutRequest());
                navigate("/login");
              }}
              className="px-3 py-1.5 bg-[#8b6b43] hover:bg-[#735835] text-white rounded-lg text-sm font-semibold shadow transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#fffdf9] border-r border-amber-100 shadow-sm flex flex-col">
          <div className="px-4 py-4 font-semibold text-[#5b4636] border-b border-amber-100">
            Quản lí tài khoản
          </div>
          <nav className="flex-1 p-2 overflow-y-auto space-y-1">
            {menuItems.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-[#5b4636] hover:bg-[#f3e7d4] hover:text-[#8b6b43] transition-colors"
              >
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-5 border-t border-amber-100 flex items-center gap-3 bg-[#fffaf4]">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-[#8b6b43]">
              {displayName?.[0] || "U"}
            </div>
            <div className="text-sm">
              <div className="font-semibold">{displayName}</div>
              <div className="text-amber-700">Quản trị viên</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#fffaf6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
