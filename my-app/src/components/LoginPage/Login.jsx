import { Form, Input, Button, Checkbox, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import background from "../../img/background.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "../../redux/auth/authSlice";
import { resolveUserRole } from "../../utils/role";

const { Text } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ redux
  const { token, loading, user } = useSelector((state) => state.account);

  // Nếu login thành công thì redirect
  useEffect(() => {
    if (token) {
      const role = resolveUserRole(user);
      navigate(role === "Admin" ? "/Admin" : "/");
    }
  }, [token, user, navigate]);

  // Hàm login
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={background} alt="" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6 white">Login</h2>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Email/Username */}
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "⚠ Please input your Username!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Username"
              autoComplete="username"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "⚠ Please input your Password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
              className="bg-transparent text-white placeholder-gray-300"
            />
          </Form.Item>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="!text-white hover:!text-purple-700">
                Remember me
              </Checkbox>
            </Form.Item>
            <Link
              to="/forgot-password"
              className="text-sm hover:!text-purple-300 !text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full rounded-full !bg-purple-600 hover:!bg-purple-700"
            >
              Login
            </Button>
          </Form.Item>

          {/* Register Link - Fix màu đen */}
          <div className="text-center mt-6">
            <span className="text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-300 hover:text-white font-semibold"
              >
                Register now
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
