import React, { useEffect } from "react";
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
  const token = searchParams.get("token");

  const { loading, tokenValid, resetSuccess, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      dispatch(
        verifyResetTokenRequest({
          token,
          onError: () => {
            // Token invalid, redirect to forgot password
            setTimeout(() => navigate("/forgot-password"), 2000);
          },
        })
      );
    } else {
      navigate("/forgot-password");
    }
  }, [token, dispatch, navigate]);

  const onFinish = (values) => {
    dispatch(
      resetPasswordRequest({
        token,
        newPassword: values.password,
        onSuccess: () => {
          // Success handled by saga
          setTimeout(() => navigate("/login"), 3000);
        },
      })
    );
  };

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
                Mật khẩu của bạn đã được cập nhật. Bạn sẽ được chuyển đến trang
                đăng nhập.
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

  if (!tokenValid && !loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
          <Result
            status="error"
            title={
              <span className="text-white text-xl">Link không hợp lệ</span>
            }
            subTitle={
              <span className="text-purple-200">
                Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
              </span>
            }
            extra={[
              <Button
                key="retry"
                type="primary"
                onClick={() => navigate("/forgot-password")}
                className="!bg-purple-600 hover:!bg-purple-700 border-0"
              >
                Yêu cầu lại
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
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-purple-200">Đang xác thực...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <LockOutlined className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Đặt lại mật khẩu</h2>
              <p className="text-sm text-purple-200">
                Nhập mật khẩu mới cho tài khoản của bạn
              </p>
            </div>

            <Form
              form={form}
              name="resetPassword"
              onFinish={onFinish}
              layout="vertical"
            >
              {/* New Password */}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "⚠ Vui lòng nhập mật khẩu mới!" },
                  { min: 6, message: "⚠ Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu mới"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  className="bg-white/20 text-white placeholder-gray-300 border-white/30"
                  size="large"
                />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "⚠ Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("⚠ Mật khẩu không khớp!")
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
                  className="bg-white/20 text-white placeholder-gray-300 border-white/30"
                  size="large"
                />
              </Form.Item>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
                  <p className="text-red-200 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Reset Button */}
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
          </>
        )}
      </div>
    </div>
  );
}
