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
} from "@ant-design/icons";
import { getProfile } from "../../../redux/User/profile/getProfileSlice";
import Header from "../Header";

export default function ProfilePage() {
  const dispatch = useDispatch();
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

  // --- Không có user ---
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-3xl text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Không tìm thấy người dùng
          </h3>
          <p className="text-muted-foreground">
            Vui lòng đăng nhập để xem hồ sơ của bạn.
          </p>
        </div>
      </div>
    );
  }

  // --- Đang tải ---
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

  // --- Lỗi tải dữ liệu ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full bg-card/50 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CloseCircleOutlined className="text-3xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Lỗi tải dữ liệu
          </h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={handleReload}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // --- Không có profile ---
  if (!profile || !profile.id) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">Không có dữ liệu người dùng</p>
        </div>
      </div>
    );
  }

  // --- Giao diện chính ---
  return (
    <div className="min-h-screen bg-background">
      {/* Header cố định trên cùng */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <Header />
      </div>

      {/* Nội dung */}
      <div className="flex items-center justify-center p-4 md:p-8 mt-20">
        <div className="w-full max-w-2xl">
          {/* Tiêu đề */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                Hồ sơ cá nhân
              </h1>
              <p className="text-muted-foreground">
                Thông tin chi tiết về tài khoản của bạn
              </p>
            </div>
            <button
              onClick={handleReload}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all hover:rotate-180 duration-500"
              aria-label="Tải lại"
            >
              <ReloadOutlined className="text-lg" />
            </button>
          </div>
          {/* Thẻ hồ sơ */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Ảnh đại diện */}
            <div className="relative bg-secondary/30 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-accent/20 flex items-center justify-center border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <UserOutlined className="text-4xl md:text-5xl text-accent" />
                  </div>
                  {profile.active && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                      <CheckCircleOutlined className="text-white text-sm" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
                    {profile.fullName || "Người dùng"}
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    @{profile.username}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 text-sm">
                    <MailOutlined className="text-accent" />
                    <span className="text-foreground">{profile.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="grid gap-6">
                {/* Số điện thoại */}
                <div className="flex items-start gap-4 pb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <PhoneOutlined className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      Số điện thoại
                    </p>
                    <p className="text-foreground">
                      {profile.phoneNumber || (
                        <span className="text-muted-foreground italic">
                          Chưa cập nhật
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Trạng thái tài khoản */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    {profile.active ? (
                      <CheckCircleOutlined className="text-green-400" />
                    ) : (
                      <CloseCircleOutlined className="text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      Trạng thái tài khoản
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          profile.active
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {profile.active ? "Hoạt động" : "Bị khóa"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end card */}
        </div>
      </div>
    </div>
  );
}
