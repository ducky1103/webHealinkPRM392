"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  ReloadOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../redux/User/profile/getProfileSlice";
import Header from "../Header";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading, error } = useSelector((state) => state.getProfile);
  const userId = useSelector((state) => state.account?.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [dispatch, userId]);

  const handleReload = () => {
    if (userId) dispatch(getProfile(userId));
  };

  const goToChangePassword = () => {
    navigate("/change-password");
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 text-center shadow-md">
          <UserOutlined className="text-3xl text-accent mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Không tìm thấy người dùng
          </h3>
          <p className="text-muted-foreground">
            Vui lòng đăng nhập để xem hồ sơ của bạn.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full bg-card border border-red-500/20 rounded-2xl p-8 text-center shadow-md">
          <CloseCircleOutlined className="text-3xl text-red-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={handleReload}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!profile || !profile.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Không có dữ liệu người dùng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌿 Nền nâu ấm, thư giãn */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-amber-100/40 to-stone-50" />
      {/* Blobs trang trí */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-orange-300/25 blur-3xl" />

      <div className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-amber-900/5">
        <Header />
      </div>

      <div className="flex items-center justify-center p-4 md:p-8 mt-16">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1 text-amber-950">
                Hồ sơ cá nhân
              </h1>
              <p className="text-stone-700/70">
                Nuôi dưỡng bình an – chăm sóc chính mình mỗi ngày
              </p>
            </div>
            <button
              onClick={handleReload}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-600/10 text-amber-800 hover:bg-amber-600/20 transition-all hover:rotate-180 duration-500"
            >
              <ReloadOutlined />
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-amber-900/10 rounded-3xl shadow-[0_20px_40px_-20px_rgba(217,119,6,0.25)] overflow-hidden">
            <div className="relative bg-gradient-to-br from-amber-50 to-amber-100/60 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center ring-8 ring-white shadow-xl">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-stone-700 flex items-center justify-center text-white">
                    <UserOutlined className="text-4xl" />
                  </div>
                </div>
                {profile.active && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircleOutlined className="text-white text-sm" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2 text-amber-950">
                  {profile.fullName || "Người dùng"}
                </h2>
                <p className="text-stone-700/70 mb-1">@{profile.username}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-sm text-stone-800">
                  <MailOutlined className="text-amber-700" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-amber-900/10">
                <PhoneOutlined className="text-amber-700 text-xl" />
                <div className="flex-1">
                  <p className="text-sm text-stone-700/70 mb-1">
                    Số điện thoại
                  </p>
                  <p>
                    {profile.phoneNumber || (
                      <span className="text-stone-600/70 italic">
                        Chưa cập nhật
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-amber-900/10">
                {profile.active ? (
                  <CheckCircleOutlined className="text-emerald-600 text-xl" />
                ) : (
                  <CloseCircleOutlined className="text-red-400 text-xl" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-stone-700/70 mb-1">
                    Trạng thái tài khoản
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      profile.active
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {profile.active ? "Hoạt động" : "Bị khóa"}
                  </span>
                </div>
              </div>

              {/* ✅ Nút đổi mật khẩu */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={goToChangePassword}
                  className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-700 to-stone-700 text-white text-base font-semibold shadow-[0_10px_24px_-10px_rgba(217,119,6,0.45)] hover:shadow-[0_14px_30px_-12px_rgba(68,64,60,0.6)] hover:scale-[1.03] transition-all duration-300 border border-white/20"
                >
                  <LockOutlined /> Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
