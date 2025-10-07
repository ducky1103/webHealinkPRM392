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
import background from "../../img/bg3.webp";
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

  if (isValidating) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={background}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Đang xác thực token...</p>
        </div>
      </div>
    );
  }

  if (!tokenVerified) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={background}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
          <Result
            status="error"
            title={
              <span className="text-gray-800 text-xl">Token không hợp lệ!</span>
            }
            subTitle={
              <span className="text-gray-600">
                Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng yêu
                cầu đặt lại mật khẩu mới.
              </span>
            }
            extra={[
              <Button
                key="back"
                type="primary"
                onClick={() => navigate("/forgot-password")}
                className="!bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0 rounded-full !h-10"
              >
                Yêu cầu đặt lại mật khẩu
              </Button>,
              <Button
                key="login"
                type="default"
                onClick={() => navigate("/login")}
                className="!text-orange-600 hover:!text-orange-700 hover:!border-orange-400 rounded-full !h-10"
              >
                Quay lại đăng nhập
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  if (resetSuccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={background}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 w-96 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
          <Result
            status="success"
            title={
              <span className="text-gray-800 text-xl">
                Đặt lại mật khẩu thành công!
              </span>
            }
            subTitle={
              <span className="text-gray-600">
                Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật
                khẩu mới.
              </span>
            }
            extra={[
              <Button
                key="login"
                type="primary"
                onClick={() => navigate("/login")}
                className="!bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0 rounded-full !h-10"
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={background}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 w-96 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <LockOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Đặt lại mật khẩu
          </h2>
          <p className="text-sm text-gray-600">Nhập mật khẩu mới của bạn</p>
        </div>

        <Form
          form={form}
          name="resetPassword"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
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
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu mới"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

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
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Xác nhận mật khẩu mới"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !h-12 !text-base font-semibold shadow-lg hover:shadow-xl transition-all border-0"
            >
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-gray-600 text-center">
            🔒 Mật khẩu phải chứa ít nhất 6 ký tự
            <br />
            Bao gồm chữ hoa, chữ thường và số
          </p>
        </div>
      </div>
    </div>
  );
}
