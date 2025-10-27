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
import background from "../../img/bg6.jpg";
import { registerRequest } from "../../redux/auth/register/registerSlice";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.register);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({ type: "RESET_REGISTER_STATE" });
  }, [dispatch]);

  useEffect(() => {
    if (success) {
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

        <Card className="relative z-10 w-96 p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl">
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
              className="w-full rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !h-12 border-0 shadow-lg"
            >
              Đến trang đăng nhập ngay
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Đăng ký
        </h2>

        <Form
          form={form}
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập họ tên!" },
              { min: 2, message: "Họ tên phải có ít nhất 2 ký tự!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Họ và tên"
              autoComplete="name"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

          <Form.Item
            name="username"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập tên đăng nhập!" },
              { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "Tên đăng nhập chỉ chứa chữ, số và gạch dưới!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Tên đăng nhập"
              autoComplete="username"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
              autoComplete="email"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                message: "Số điện thoại không hợp lệ! (VD: 0987654321)",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-gray-400" />}
              placeholder="Số điện thoại (VD: 0987654321)"
              autoComplete="tel"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu"
              autoComplete="new-password"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

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
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Xác nhận mật khẩu"
              autoComplete="new-password"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-orange-400 focus:!border-orange-500"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !h-12 !text-base font-semibold shadow-lg hover:shadow-xl transition-all border-0"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <span className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Đăng nhập ngay
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
