import React, { useEffect } from "react";
import logo from "../../img/logo.jpg";
import { useMemo, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutRequest } from "../../redux/auth/authSlice";
import { getDisplayName } from "../../utils/role";
import { toast } from "react-toastify";
function Header() {
  const { user } = useSelector((state) => state.account);
  return (
    <div>
      <header className="sticky top-0 z-40 bg-[#5C4033]/95 backdrop-blur border-b border-[#d38245] transition-all duration-500 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 font-extrabold hover:scale-105 transition-transform duration-500"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#8B5E3C] text-white shadow-md">
                <img src={logo} alt="" />
              </span>
              <span className="text-white">Healink</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm text-white">
              <a
                href="/"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                Trang chủ
              </a>
              <a
                href="/podcast"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                Podcast
              </a>
              <a
                href="/about-us"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                Về chúng tôi
              </a>

              <a
                href="/store"
                className="hover:text-amber-200 transition-colors duration-300"
              >
                Cửa hàng
              </a>
              <a
                href="/cart"
                className="hover:text-amber-200 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  if (!user) {
                    toast.error("Vui lòng đăng nhập để xem giỏ hàng 🛒");
                    return;
                  } else {
                    window.location.href = "/cart";
                  }
                }}
              >
                Giỏ hàng
              </a>
            </nav>

            <UserMenu />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const displayName = useMemo(() => getDisplayName(user), [user]);

  if (!user) {
    return (
      <div className="hidden sm:flex items-center gap-3">
        <a
          href="/login"
          className="inline-flex items-center rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition-all duration-500 hover:scale-105 shadow-md"
        >
          Tài khoản
        </a>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-3 relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md"
      >
        {displayName}
        <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-44 rounded-xl border border-slate-200 bg-white shadow-lg py-2 z-50">
          <Link
            to="/registered"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/write-letter"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Viết thư cho tương lai
          </Link>
          <Link
            to="/healing-diary"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Viết nhật ký chữa lành
          </Link>
          <Link
            to="/track-orders"
            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Theo dõi đơn hàng
          </Link>
          <button
            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpen(false);
              dispatch(logoutRequest());
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
