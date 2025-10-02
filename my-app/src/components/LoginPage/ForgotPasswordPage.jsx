/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Result } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import background from "../../img/background.jpg";
import { forgotPasswordRequest } from "../../redux/auth/forgotPassword/forgotPasswordSlice";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, emailSent, error } = useSelector(
    (state) => state.forgotPassword
  );

  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(
      forgotPasswordRequest({
        email: values.email,
        onSuccess: () => {
          // Success handled by saga
        },
        onError: (error) => {
          console.error("Forgot password error:", error);
        },
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (emailSent) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
          <Result
            status="success"
            title={
              <span className="text-white text-xl">Email đã được gửi!</span>
            }
            subTitle={
              <span className="text-purple-200">
                Chúng tôi đã gửi link khôi phục mật khẩu đến email của bạn. Vui
                lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </span>
            }
            extra={[
              <Button
                key="back"
                type="primary"
                onClick={() => navigate("/login")}
                className="!bg-purple-600 hover:!bg-purple-700 border-0"
              >
                Quay lại đăng nhập
              </Button>,
              <Button
                key="resend"
                type="text"
                onClick={() => {
                  form.submit();
                }}
                className="!text-white hover:!text-purple-300"
                loading={loading}
              >
                Gửi lại email
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

      {/* Forgot Password Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <MailOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Quên mật khẩu?</h2>
          <p className="text-sm text-purple-200">
            Nhập email của bạn và chúng tôi sẽ gửi link để đặt lại mật khẩu
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
            />
          </Form.Item>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Send Email Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700 h-12 text-lg font-semibold"
            >
              Gửi email khôi phục
            </Button>
          </Form.Item>

          {/* Back to Login */}
          <div className="text-center">
            <Button
              type="link"
              onClick={() => navigate("/login")}
              className="!text-white hover:!text-purple-300 !p-0 font-semibold"
              icon={<ArrowLeftOutlined />}
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
            Link khôi phục có hiệu lực trong 15 phút
          </p>
        </div>
      </div>
    </div>
  );
}
