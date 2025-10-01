/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import background from "../../img/background.jpg";
import { registerRequest } from "../../redux/auth/register/registerSlice";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.register);

  const [form] = Form.useForm();

  // Reset register state when component mounts
  useEffect(() => {
    dispatch({ type: "RESET_REGISTER_STATE" });
  }, [dispatch]);

  // Handle successful registration
  useEffect(() => {
    if (success) {
      // Auto navigate to login after 2 seconds
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onFinish = (values) => {
    dispatch(
      registerRequest({
        email: values.email,
        username: values.username,
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        password: values.password,
        onSuccess: (data) => {
          console.log("✅ Register success:", data);
          form.resetFields();
        },
        onError: (error) => {
          console.error("❌ Register error:", error);
        },
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (success) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={background} alt="" />
        </div>

        <Card className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <Title level={3} className="!text-green-600 !mb-2">
              Đăng ký thành công!
            </Title>
            <Text className="text-gray-600 block mb-4">
              Tài khoản của bạn đã được tạo thành công.
              <br />
              Bạn sẽ được chuyển đến trang đăng nhập sau 2 giây...
            </Text>
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700"
            >
              Đến trang đăng nhập ngay
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={background} alt="" />
      </div>

      {/* Register Card - Same style as Login */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Register
        </h2>

        <Form
          form={form}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Full Name */}
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "⚠ Please input your Full Name!" },
              { min: 2, message: "Full name must be at least 2 characters!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              autoComplete="name"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Username */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "⚠ Please input your Username!" },
              { min: 3, message: "Username must be at least 3 characters!" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers and underscore!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              autoComplete="username"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "⚠ Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              autoComplete="email"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "⚠ Please input your Phone Number!" },
              {
                pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                message:
                  "Invalid phone number! (Ex: 0987654321 or 84987654321)",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone Number (Ex: 0987654321)"
              autoComplete="tel"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "⚠ Please input your Password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="new-password"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "⚠ Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              autoComplete="new-password"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Register Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700"
            >
              {loading ? "Creating Account..." : "Register"}
            </Button>
          </Form.Item>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-purple-200">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-300 hover:text-white font-semibold"
              >
                Login now
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
