import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import background from "../../img/background.jpg";

export default function RegisterdPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.account);

  const onFinish = (values) => {
    const registerData = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    };

    dispatch(
      fetchRegister({
        ...registerData,
        onSuccess: () => {
          // Điều hướng đến trang OTP với email
          navigate("/verify-otp", { state: { email: values.email } });
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

      {/* Register Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Đăng ký</h2>

        <Form
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Họ và tên */}
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "⚠ Vui lòng nhập Họ và tên!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Họ và tên"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập Email!" },
              { type: "email", message: "⚠ Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email của bạn"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "⚠ Vui lòng nhập Mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
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
                    new Error("⚠ Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" noStyle>
              <Checkbox className="!text-white hover:!text-purple-700">
                Ghi nhớ mật khẩu
              </Checkbox>
            </Form.Item>
            <a href="#" className="text-sm hover:!text-purple-700 !text-white">
              Quên mật khẩu?
            </a>
          </div>

          {/* Register Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700"
            >
              Đăng ký
            </Button>
          </Form.Item>

          {/* Hoặc */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-white/30"></div>
            <span className="px-2 text-sm text-white">HOẶC</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-6 mb-4">
            <Button
              shape="circle"
              icon={<i className="fab fa-facebook-f"></i>}
              className="!bg-white !text-blue-600"
            />
            <Button
              shape="circle"
              icon={<i className="fab fa-google"></i>}
              className="!bg-white !text-red-600"
            />
          </div>

          {/* Đã có tài khoản */}
          <p className="text-center text-sm">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="font-bold hover:underline">
              Đăng nhập
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
}
