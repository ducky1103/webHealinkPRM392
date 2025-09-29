/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import background from "../../img/background.jpg";
import { verifyOTP, resendOTP } from "../../redux/auth/authSlice";

export default function OTPVerificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.account);

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Lấy email từ state truyền từ trang đăng ký
  const email = location.state?.email || "";

  // Countdown timer cho resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const onFinish = (values) => {
    const otpData = {
      email: email,
      otp: values.otp,
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
        },
      })
    );
  };

  const handleResendOTP = () => {
    dispatch(
      resendOTP({
        email: email,
        onSuccess: () => {
          message.success("Mã OTP mới đã được gửi!");
          setCountdown(60);
          setCanResend(false);
        },
        onError: () => {
          message.error("Không thể gửi lại mã OTP!");
        },
      })
    );
  };

  const handleOTPChange = (value) => {
    setOtpValue(value);
    // Auto submit khi nhập đủ 6 số
    if (value.length === 6) {
      onFinish({ otp: value });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={background} alt="" className="w-full h-full object-cover" />
      </div>

      {/* OTP Verification Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <MailOutlined className="text-2xl text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Xác thực OTP</h2>
          <p className="text-sm text-purple-200">
            Chúng tôi đã gửi mã xác thực 6 chữ số đến
          </p>
          <p className="text-sm font-semibold text-white mt-1">
            {email || "email@example.com"}
          </p>
        </div>

        <Form
          name="otpVerification"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* OTP Input */}
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập mã OTP!" },
              { len: 6, message: "⚠ Mã OTP phải có đúng 6 chữ số!" },
              { pattern: /^[0-9]+$/, message: "⚠ Mã OTP chỉ chứa số!" },
            ]}
          >
            <Input
              placeholder="Nhập mã OTP 6 chữ số"
              maxLength={6}
              className="bg-white/20 text-white placeholder-gray-300 border-white/30 text-center text-2xl font-bold tracking-widest"
              style={{
                fontSize: "24px",
                letterSpacing: "8px",
                textAlign: "center",
                height: "60px",
              }}
              onChange={(e) => handleOTPChange(e.target.value)}
              value={otpValue}
            />
          </Form.Item>

          {/* Countdown Timer */}
          <div className="text-center mb-4">
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-purple-200">
                <ClockCircleOutlined />
                <span className="text-sm">Gửi lại mã sau {countdown}s</span>
              </div>
            ) : (
              <Button
                type="link"
                onClick={handleResendOTP}
                className="!text-white hover:!text-purple-300 !p-0"
                loading={loading}
              >
                Gửi lại mã OTP
              </Button>
            )}
          </div>

          {/* Verify Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700 h-12 text-lg font-semibold"
            >
              Xác thực
            </Button>
          </Form.Item>

          {/* Hoặc */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="px-3 text-sm text-white/70">HOẶC</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Back to Register */}
          <div className="text-center">
            <p className="text-sm text-purple-200 mb-2">Không nhận được mã?</p>
            <Button
              type="link"
              onClick={() => navigate("/registered")}
              className="!text-white hover:!text-purple-300 !p-0 font-semibold"
            >
              ← Quay lại đăng ký
            </Button>
          </div>
        </Form>

        {/* Tips */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <p className="text-xs text-purple-100 text-center">
            💡 Mã OTP có hiệu lực trong 5 phút
            <br />
            Kiểm tra cả hộp thư spam nếu không thấy email
          </p>
        </div>
      </div>
    </div>
  );
}
