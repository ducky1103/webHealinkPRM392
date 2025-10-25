"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/User/changePassword/changePasswordSlice";
import { getProfile } from "../../../redux/User/profile/getProfileSlice";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Input, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.getProfile);
  const { loading, success, error } = useSelector((state) => state.changePass);
  const userId = useSelector((state) => state.account?.user?.id);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userId) dispatch(getProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      message.success("Đổi mật khẩu thành công!");
      setTimeout(() => navigate("/profile"), 1000);
    }
    if (error) {
      message.error(error);
    }
  }, [success, error, navigate]);

  const handleChangePassword = (values) => {
    if (!profile?.email) {
      message.error("Không tìm thấy email người dùng!");
      return;
    }

    const payload = {
      email: profile.email,
      password: values.oldPassword,
      newPassword: values.newPassword,
    };

    dispatch(changePassword(payload));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      {/* Header cố định */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <Header />
      </div>

      <div className="flex justify-center items-center mt-24 px-4">
        <div className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl relative">
          <button
            onClick={() => navigate("/profile")}
            className="absolute top-5 left-5 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeftOutlined className="text-lg" />
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Đổi mật khẩu</h1>
            <p className="text-muted-foreground text-sm">
              Cập nhật mật khẩu tài khoản của bạn
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6 bg-background/60 py-2 px-4 rounded-lg border border-border">
            <MailOutlined className="text-accent" />
            <span className="font-medium">
              {profile?.email || "Đang tải email..."}
            </span>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleChangePassword}
            className="space-y-4"
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu cũ"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu mới"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu mới"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
