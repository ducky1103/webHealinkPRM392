import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutRequest } from "../../redux/auth/authSlice";
import { getDisplayName } from "../../utils/role";
import { getAllCart } from "../../redux/User/cartApi/fetchCart/getAllCartSlice";
import logo from "../../img/logo.jpg";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import Flashcard from "./Flashcard/Flashcard";

function Header() {
  const { user } = useSelector((state) => state.account);
  const { cart } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();

  const cartCount = cart?.items?.length || 0;

  useEffect(() => {
    if (user) {
      dispatch(getAllCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#BFAC82]/95 backdrop-blur-md shadow-lg border-b border-[#d38245]"
          : "bg-[#BFAC82]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-white">
            <LinkItem href="/" label="Trang chủ" />
            <LinkItem href="/podcast" label="Podcast" />
            <LinkItem href="/about-us" label="Về chúng tôi" />
            <LinkItem href="/store" label="Cửa hàng" />
            <LinkItem href="/favorites" label="Yêu thích" />
            {/* 🔹 Truyền cartCount xuống */}
            <CartButton user={user} cartCount={cartCount} />
          </nav>

          {/* User menu + Mobile button */}
          <div className="flex items-center gap-3">
            <UserMenu />
            <button
              className="md:hidden p-2 rounded-xl hover:bg-[#8B5E3C]/30 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#BFAC82]/95 backdrop-blur-md text-white border-t border-[#d38245]">
          <div className="flex flex-col space-y-2 py-4 px-4">
            <LinkItem
              href="/"
              label="Trang chủ"
              onClick={() => setMobileMenuOpen(false)}
            />
            <LinkItem
              href="/podcast"
              label="Podcast"
              onClick={() => setMobileMenuOpen(false)}
            />
            <LinkItem
              href="/about-us"
              label="Về chúng tôi"
              onClick={() => setMobileMenuOpen(false)}
            />
            <LinkItem
              href="/store"
              label="Cửa hàng"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* 🔹 Truyền cartCount vào menu mobile */}
            <CartButton
              user={user}
              cartCount={cartCount}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
          <Flashcard />
        </div>
      )}
    </header>
  );
}

export default Header;

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5E3C] to-[#d38245] rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition" />
        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#8B5E3C] to-[#d38245] flex items-center justify-center text-white font-bold shadow-md">
          <img
            src={logo}
            alt="Healink"
            className="h-8 w-8 rounded-md object-cover"
          />
        </div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
        Healink
      </span>
    </a>
  );
}

function LinkItem({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative text-sm font-semibold transition-all duration-300 hover:text-amber-200 group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

// ✅ CartButton có thêm prop cartCount
function CartButton({ user, cartCount, onClick }) {
  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Vui lòng đăng nhập để xem giỏ hàng 🛒");
    } else {
      window.location.href = "/cart";
    }
  };

  return (
    <a
      href="/cart"
      onClick={(e) => {
        handleClick(e);
        onClick?.();
      }}
      className="relative flex items-center p-2 rounded-xl hover:bg-[#8B5E3C]/40 transition"
    >
      <ShoppingCart className="w-5 h-5 text-white" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-br from-[#d38245] to-[#8B5E3C] text-xs font-bold text-white rounded-full h-4 w-4 flex items-center justify-center shadow-md">
          {cartCount}
        </span>
      )}
    </a>
  );
}

function MenuLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const displayName = useMemo(() => getDisplayName(user), [user]);

  const userid = useSelector((state) => state.account?.user?.id);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <a
        href="/login"
        className="hidden md:flex px-5 py-2.5 bg-[#8B5E3C] text-white font-semibold rounded-xl hover:bg-[#704a2f] transition-all duration-300 shadow-md"
      >
        Đăng nhập
      </a>
    );
  }

  return (
    <div className="relative hidden md:block" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d38245] to-[#8B5E3C] flex items-center justify-center text-white font-semibold">
          {displayName?.[0] || "U"}
        </div>
        <span className="truncate max-w-[120px]">{displayName}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden animate-fadeIn border border-slate-200 z-50">
          <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-slate-100">
            <p className="font-semibold text-slate-800 truncate">
              {displayName}
            </p>
            <p className="text-sm text-slate-600 truncate">{user?.email}</p>
          </div>

          <div className="py-2">
            <MenuLink
              to="/profile"
              label="Hồ sơ cá nhân"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              to="/write-letter"
              label="Viết thư cho tương lai"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              to="/healing-diary"
              label="Nhật ký chữa lành"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              to={`/track-orders/${userid}`}
              label="Theo dõi đơn hàng"
              onClick={() => setOpen(false)}
            />
            <MenuLink to="/game" label="Game" onClick={() => setOpen(false)} />
          </div>

          <div className="border-t border-slate-100 p-2">
            <button
              onClick={() => {
                setOpen(false);
                dispatch(logoutRequest());
                navigate("/login");
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
