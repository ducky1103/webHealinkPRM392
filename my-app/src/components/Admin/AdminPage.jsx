import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Avatar,
  message,
  Popconfirm,
} from "antd";
import { UserOutlined, StopOutlined, UnlockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/User/ManageUser/getUser/getAllUserSlice";
import { banUser } from "../../redux/User/ManageUser/banUser/banUserSlice";
import { unBanUser } from "../../redux/User/ManageUser/unbanUser/unBanUserSlice";

const { Option } = Select;

const AdminPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState("name");

  // Redux state
  const {
    allUser: users,
    loading,
    error,
  } = useSelector((state) => state.getAllUser);
  const { loading: banLoading, error: banError } = useSelector(
    (state) => state.banUser
  );
  const { loading: unbanLoading, error: unbanError } = useSelector(
    (state) => state.unbanUser
  );

  // Load users on component mount
  useEffect(() => {
    dispatch(getAllUser({})); // Truyền object rỗng thay vì không truyền gì
  }, [dispatch]);

  // Handle ban user (xóa mềm)
  const handleBanUser = (userId) => {
    dispatch(banUser({ userId: String(userId) })); // Đảm bảo userId là string
    message.success("Đã cấm người dùng thành công!");
  };

  // Handle unban user
  const handleUnbanUser = (userId) => {
    dispatch(unBanUser({ userId: String(userId) })); // Đảm bảo userId là string
    message.success("Đã bỏ cấm người dùng thành công!");
  };

  // Xử lý filter + search - xử lý nhiều trường hợp dữ liệu
  let usersArray = [];
  if (Array.isArray(users)) {
    usersArray = users;
  } else if (users && Array.isArray(users.data)) {
    usersArray = users.data;
  } else if (users && Array.isArray(users.users)) {
    usersArray = users.users;
  } else if (users && Array.isArray(users.content)) {
    usersArray = users.content;
  }

  const filteredUsers = usersArray
    .filter((u) =>
      `${u.name || u.fullName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
    .sort((a, b) =>
      sort === "name"
        ? (a.name || a.fullName).localeCompare(b.name || b.fullName)
        : (a.createdAt || a.joined).localeCompare(b.createdAt || b.joined)
    );

  // Cột cho Table
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 80,
      align: "center",
      render: () => (
        <div className="flex justify-center">
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className="bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg"
          />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: 200,
      render: (text, record) => (
        <div className="font-semibold text-gray-800">
          {text || record.fullName || "N/A"}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
      render: (email) => (
        <div className="text-blue-600 font-medium">{email}</div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 150,
      render: (text, record) => {
        const phone =
          text ||
          record.phoneNumber ||
          record.phone_number ||
          record.mobile ||
          record.telephone;
        return <div className="text-gray-600">{phone || "N/A"}</div>;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: 120,
      align: "center",
      render: (role) =>
        role === "admin" ? (
          <Tag color="blue" className="px-3 py-1 rounded-full font-semibold">
            Admin
          </Tag>
        ) : (
          <Tag color="green" className="px-3 py-1 rounded-full font-semibold">
            User
          </Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      width: 120,
      align: "center",
      render: (active) =>
        active ? (
          <Tag color="green" className="px-3 py-1 rounded-full font-semibold">
            Hoạt động
          </Tag>
        ) : (
          <Tag color="red" className="px-3 py-1 rounded-full font-semibold">
            Bị cấm
          </Tag>
        ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joined",
      width: 150,
      render: (text, record) => {
        const dateValue =
          text || record.createdAt || record.joinedAt || record.created_at;
        if (!dateValue) return <span className="text-gray-400">N/A</span>;

        const date = new Date(dateValue);
        if (isNaN(date.getTime()))
          return <span className="text-gray-400">N/A</span>;

        return (
          <div className="text-gray-600 font-medium">
            {date.toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      width: 150,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          {!record.active ? (
            <Popconfirm
              title="Bỏ cấm người dùng?"
              description="Bạn có chắc chắn muốn bỏ cấm người dùng này?"
              onConfirm={() => handleUnbanUser(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="primary"
                icon={<UnlockOutlined />}
                className="bg-green-500 hover:bg-green-600 border-0 rounded-full px-4 py-2 h-auto font-semibold shadow-lg"
                loading={unbanLoading}
              >
                Bỏ cấm
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Cấm người dùng?"
              description="Bạn có chắc chắn muốn cấm người dùng này? (Xóa mềm)"
              onConfirm={() => handleBanUser(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="primary"
                danger
                icon={<StopOutlined />}
                className="border-0 rounded-full px-4 py-2 h-auto font-semibold shadow-lg"
                loading={banLoading}
              >
                Cấm
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Quản lý người dùng
              </h2>
              <p className="text-blue-100 mt-1">
                Quản lý tài khoản và quyền truy cập
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              className="bg-white text-blue-600 hover:bg-blue-50 border-0 font-semibold px-6 py-2 h-auto rounded-full shadow-lg"
              onClick={() => {
                dispatch(getAllUser({}));
              }}
            >
              Tải lại dữ liệu
            </Button>
          </div>
        </div>

        {/* Bộ lọc + tìm kiếm */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <Select
                value={roleFilter}
                onChange={setRoleFilter}
                className="w-48 h-12"
                placeholder="Vai trò"
              >
                <Option value="all">Tất cả vai trò</Option>
                <Option value="admin">Quản trị viên</Option>
                <Option value="user">Người dùng</Option>
              </Select>
              <Select
                value={sort}
                onChange={setSort}
                className="w-48 h-12"
                placeholder="Sắp xếp"
              >
                <Option value="name">Sắp xếp theo tên</Option>
                <Option value="joined">Sắp xếp theo ngày tham gia</Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Bảng người dùng */}
        <div className="p-6">
          <Table
            rowKey="id"
            dataSource={filteredUsers}
            columns={columns}
            pagination={{
              pageSize: 8,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} người dùng`,
              className: "custom-pagination",
            }}
            loading={loading}
            className="custom-table"
            rowClassName="hover:bg-blue-50 transition-colors duration-200"
          />
        </div>

        {/* Error Messages */}
        {error && (
          <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">⚠</span>
              <span className="text-red-700 font-medium">
                Lỗi khi tải danh sách người dùng: {error}
              </span>
            </div>
          </div>
        )}

        {banError && (
          <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">❌</span>
              <span className="text-red-700 font-medium">
                Lỗi khi cấm người dùng: {banError}
              </span>
            </div>
          </div>
        )}

        {unbanError && (
          <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">🔓</span>
              <span className="text-red-700 font-medium">
                Lỗi khi bỏ cấm người dùng: {unbanError}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
