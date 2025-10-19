import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import background from "../../img/bg3.webp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "../../redux/auth/authSlice";
import { resolveUserRole } from "../../utils/role";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, user } = useSelector((state) => state.account);

  useEffect(() => {
    if (token) {
      const role = resolveUserRole(user);
      navigate(role === "Admin" ? "/Admin" : "/");
    }
  }, [token, user, navigate]);

  const onFinish = (values) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    dispatch(fetchLogin(payload));
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
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-96 p-8 bg-white/50 backdrop-blur-md rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Username */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "⚠ Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Tên đăng nhập"
              autoComplete="username"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-purple-400 focus:!border-purple-500"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "⚠ Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu"
              autoComplete="current-password"
              size="large"
              className="!bg-white !text-gray-800 placeholder:!text-gray-400 !border-gray-300 hover:!border-purple-400 focus:!border-purple-500"
            />
          </Form.Item>

          {/* Remember me + Forgot */}
          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-sm hover:!text-purple-700 !text-gray-600 transition-colors font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full rounded-full !bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 !h-12 border-0 shadow-lg"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          {/* Register Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Đăng ký ngay
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
