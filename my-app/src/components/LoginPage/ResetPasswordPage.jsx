/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import background from "../../img/background.jpg";
import {
  resetPasswordRequest,
  verifyResetTokenRequest,
} from "../../redux/auth/forgotPassword/forgotPasswordSlice";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const { loading, resetSuccess, tokenValid, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [tokenVerified, setTokenVerified] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  const token = searchParams.get("token");

  // Verify token khi component mount
  useEffect(() => {
    if (token) {
      dispatch(
        verifyResetTokenRequest({
          token: token,
          onSuccess: () => {
            setTokenVerified(true);
            setIsValidating(false);
          },
          onError: () => {
            setTokenVerified(false);
            setIsValidating(false);
          },
        })
      );
    } else {
      setIsValidating(false);
      setTokenVerified(false);
    }
  }, [token, dispatch]);

  const onFinish = (values) => {
    dispatch(
      resetPasswordRequest({
        token: token,
        newPassword: values.newPassword,
        onSuccess: () => {
          // Success được handle bởi saga với toast
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (error) => {
          console.error("Reset password error:", error);
        },
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Nếu đang validate token
  if (isValidating) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Đang xác thực token...</p>
        </div>
      </div>
    );
  }

  // Nếu token không hợp lệ
  if (!tokenVerified) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
          <Result
            status="error"
            title={
              <span className="text-white text-xl">Token không hợp lệ!</span>
            }
            subTitle={
              <span className="text-purple-200">
                Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu
                cầu đặt lại mật khẩu mới.
              </span>
            }
            extra={[
              <Button
                key="back"
                type="primary"
                onClick={() => navigate("/forgot-password")}
                className="!bg-purple-600 hover:!bg-purple-700 border-0"
              >
                Yêu cầu đặt lại mật khẩu
              </Button>,
              <Button
                key="login"
                type="text"
                onClick={() => navigate("/login")}
                className="!text-white hover:!text-purple-300"
              >
                Quay lại đăng nhập
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  // Nếu đã reset thành công
  if (resetSuccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
          <Result
            status="success"
            title={
              <span className="text-white text-xl">
                Đặt lại mật khẩu thành công!
              </span>
            }
            subTitle={
              <span className="text-purple-200">
                Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật
                khẩu mới.
              </span>
            }
            extra={[
              <Button
                key="login"
                type="primary"
                onClick={() => navigate("/login")}
                className="!bg-purple-600 hover:!bg-purple-700 border-0"
              >
                Đăng nhập ngay
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={background} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Reset Password Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <LockOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Đặt lại mật khẩu</h2>
          <p className="text-sm text-purple-200">Nhập mật khẩu mới của bạn</p>
        </div>

        <Form
          form={form}
          name="resetPassword"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* New Password Input */}
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "⚠ Mật khẩu phải có ít nhất 6 ký tự!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "⚠ Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu mới"
              className="bg-white/20 text-white placeholder-gray-300 border-white/30"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Confirm Password Input */}
          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "⚠ Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("⚠ Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu mới"
              className="bg-white/20 text-white placeholder-gray-300 border-white/30"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Reset Password Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700 h-12 text-lg font-semibold"
            >
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>

        {/* Tips */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="text-xs text-purple-100 text-center">
            🔒 Mật khẩu phải chứa ít nhất 6 ký tự
            <br />
            Bao gồm chữ hoa, chữ thường và số
          </p>
        </div>
      </div>
    </div>
  );
}
