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
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <Header />
      </div>

      <div className="flex items-center justify-center p-4 md:p-8 mt-20">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Hồ sơ cá nhân</h1>
              <p className="text-muted-foreground">
                Thông tin chi tiết về tài khoản của bạn
              </p>
            </div>
            <button
              onClick={handleReload}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-all hover:rotate-180 duration-500"
            >
              <ReloadOutlined />
            </button>
          </div>

          <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="relative bg-secondary/30 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center border-4 border-background shadow-inner">
                  <UserOutlined className="text-4xl text-accent" />
                </div>
                {profile.active && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                    <CheckCircleOutlined className="text-white text-sm" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">
                  {profile.fullName || "Người dùng"}
                </h2>
                <p className="text-muted-foreground mb-1">
                  @{profile.username}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 text-sm">
                  <MailOutlined className="text-accent" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-start gap-4 pb-6 border-b border-border">
                <PhoneOutlined className="text-accent text-xl" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Số điện thoại
                  </p>
                  <p>
                    {profile.phoneNumber || (
                      <span className="text-muted-foreground italic">
                        Chưa cập nhật
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-border">
                {profile.active ? (
                  <CheckCircleOutlined className="text-green-400 text-xl" />
                ) : (
                  <CloseCircleOutlined className="text-red-400 text-xl" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Trạng thái tài khoản
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      profile.active
                        ? "bg-green-500/10 text-green-500"
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 from-primary to-accent text-white text-base font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
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
