/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import background from "../../img/bg6.jpg";
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

    dispatch(
      checkEmailExistsRequest({
        email: values.email,
        onSuccess: () => {
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={background}
          alt=""
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/">
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            className="!bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !border-0 shadow-lg rounded-full !h-10 !px-6"
          >
            Về trang chủ
          </Button>
        </Link>
      </div>

      <div className="relative z-10 w-96 p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <MailOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Quên mật khẩu?
          </h2>
          <p className="text-sm text-gray-600">
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
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập email!" },
              { type: "email", message: "⚠ Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Nhập email của bạn"
              size="large"
              disabled={loading}
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
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
              Gửi mã OTP
            </Button>
          </Form.Item>

          <div className="text-center">
            <Button
              type="link"
              onClick={() => navigate("/login")}
              className="!text-orange-600 hover:!text-orange-700 !p-0 font-semibold"
              icon={<ArrowLeftOutlined />}
              disabled={loading}
            >
              Quay lại đăng nhập
            </Button>
          </div>
        </Form>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-gray-600 text-center">
            💡 Kiểm tra cả hộp thư spam nếu không thấy email
            <br />
            Mã OTP có hiệu lực trong 5 phút
          </p>
        </div>
      </div>
    </div>
  );
}
