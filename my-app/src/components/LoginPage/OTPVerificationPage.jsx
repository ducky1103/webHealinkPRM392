/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Form, Button, message, Modal, Input } from "antd";
import {
  MailOutlined,
  ClockCircleOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import background from "../../img/bg6.jpg";
import { verifyOTP, resendOTP } from "../../redux/auth/authSlice";
import { resetPasswordRequest } from "../../redux/auth/forgotPassword/forgotPasswordSlice";

export default function OTPVerificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.account);
  const { loading: resetLoading } = useSelector(
    (state) => state.forgotPassword
  );

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm] = Form.useForm();
  const inputRefs = useRef([]);

  const email = location.state?.email || "";
  const isFromForgotPassword = location.state?.isFromForgotPassword || false;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all filled
    if (newOtp.every((digit) => digit !== "") && index === 4) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    while (newOtp.length < 5) newOtp.push("");
    setOtp(newOtp);

    if (pastedData.length === 5) {
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = (otpValue) => {
    if (isFromForgotPassword) {
      setShowPasswordModal(true);
    } else {
      const otpData = {
        email: email,
        otp: otpValue,
      };

      dispatch(
        verifyOTP({
          ...otpData,
          onSuccess: () => {
            message.success("Xác thực thành công!");
            navigate("/login");
          },
          onError: (error) => {
            message.error("Mã OTP không đúng hoặc đã hết hạn!");
            setOtp(["", "", "", "", ""]);
            inputRefs.current[0]?.focus();
          },
        })
      );
    }
  };

  const handlePasswordSubmit = (values) => {
    const otpValue = otp.join("");
    dispatch(
      resetPasswordRequest({
        otpCode: otpValue,
        email: email,
        newPassword: values.newPassword,
        onSuccess: () => {
          setShowPasswordModal(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (error) => {
          console.error("❌ Password reset failed:", error);
        },
      })
    );
  };

  const handleResendOTP = () => {
    if (isFromForgotPassword) {
      message.info("Vui lòng yêu cầu gửi lại email từ trang quên mật khẩu!");
    } else {
      dispatch(
        resendOTP({
          email: email,
          onSuccess: () => {
            message.success("Mã OTP mới đã được gửi!");
            setCountdown(60);
            setCanResend(false);
            setOtp(["", "", "", "", ""]);
            inputRefs.current[0]?.focus();
          },
          onError: () => {
            message.error("Không thể gửi lại mã OTP!");
          },
        })
      );
    }
  };

  return (
    <>
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

        {/* OTP Verification Card */}
        <div className="relative z-10 w-96 p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <MailOutlined className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              {isFromForgotPassword ? "Xác thực OTP" : "Xác thực tài khoản"}
            </h2>
            <p className="text-sm text-gray-600">
              Nhập mã OTP 5 chữ số đã được gửi đến
            </p>
            <p className="text-sm font-semibold text-orange-600 mt-1">
              {email || "email@example.com"}
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-all bg-white text-gray-800 shadow-sm hover:border-orange-400"
                disabled={loading}
              />
            ))}
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-6">
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <ClockCircleOutlined />
                <span className="text-sm">Gửi lại mã sau {countdown}s</span>
              </div>
            ) : (
              <Button
                type="link"
                onClick={handleResendOTP}
                className="!text-orange-600 hover:!text-orange-700 !p-0 font-semibold"
                loading={loading}
              >
                Gửi lại mã OTP
              </Button>
            )}
          </div>

          {/* Verify Button */}
          <Button
            type="primary"
            onClick={() => handleSubmit(otp.join(""))}
            loading={loading}
            disabled={otp.some((digit) => digit === "")}
            className="w-full rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !h-12 !text-base font-semibold shadow-lg hover:shadow-xl transition-all border-0"
          >
            {isFromForgotPassword ? "Xác thực và đặt mật khẩu" : "Xác thực"}
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">HOẶC</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Không nhận được mã?</p>
            <Button
              type="link"
              onClick={() =>
                navigate(
                  isFromForgotPassword ? "/forgot-password" : "/register"
                )
              }
              className="!text-orange-600 hover:!text-orange-700 !p-0 font-semibold"
            >
              ←{" "}
              {isFromForgotPassword
                ? "Quay lại quên mật khẩu"
                : "Quay lại đăng ký"}
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs text-gray-600 text-center">
              💡 Mã OTP có hiệu lực trong 5 phút
              <br />
              Kiểm tra cả hộp thư spam nếu không thấy email
            </p>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <Modal
        title={
          <span className="text-orange-800 text-xl font-bold">
            Đặt mật khẩu mới
          </span>
        }
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
        centered
      >
        <Form
          form={passwordForm}
          onFinish={handlePasswordSubmit}
          layout="vertical"
        >
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
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
              className="!border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
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
              className="!border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={resetLoading}
              className="w-full h-12 text-lg font-semibold rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-0 shadow-lg"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
