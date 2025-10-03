/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Result } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import background from "../../img/background.jpg";
import {
  forgotPasswordRequest,
  checkEmailExistsRequest,
} from "../../redux/auth/forgotPassword/forgotPasswordSlice";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, emailSent, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [form] = Form.useForm();
  const [submittedEmail, setSubmittedEmail] = useState("");

  const onFinish = (values) => {
    setSubmittedEmail(values.email);

    // Chỉ cần check email - API này sẽ gửi OTP luôn
    dispatch(
      checkEmailExistsRequest({
        email: values.email,
        onSuccess: () => {
          // Email tồn tại và OTP đã được gửi, navigate đến trang OTP luôn
          navigate("/otp-verification", {
            state: {
              email: values.email,
              isFromForgotPassword: true,
            },
          });
        },
        onError: (error) => {
          console.error("Email check failed:", error);
        },
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={background} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Forgot Password Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <MailOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quên mật khẩu?</h2>
          <p className="text-sm text-purple-200">
            Nhập email của bạn và chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu
          </p>
        </div>

        <Form
          form={form}
          name="forgotPassword"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập email!" },
              { type: "email", message: "⚠ Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email của bạn"
              className="bg-white/20 text-white placeholder-gray-300 border-white/30"
              size="large"
              disabled={loading}
            />
          </Form.Item>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700 h-12 text-lg font-semibold"
            >
              Gửi mã OTP
            </Button>
          </Form.Item>

          {/* Back to Login */}
          <div className="text-center">
            <Button
              type="link"
              onClick={() => navigate("/login")}
              className="!text-white hover:!text-purple-300 !p-0 font-semibold"
              icon={<ArrowLeftOutlined />}
              disabled={loading}
            >
              Quay lại đăng nhập
            </Button>
          </div>
        </Form>

        {/* Tips */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="text-xs text-purple-100 text-center">
            💡 Kiểm tra cả hộp thư spam nếu không thấy email
            <br />
            Mã OTP có hiệu lực trong 5 phút
          </p>
        </div>
      </div>
    </div>
  );
}
