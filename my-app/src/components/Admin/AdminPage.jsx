import React, { useEffect, useState } from "react";
import { Table, Input, Select, Button, Tag, Avatar, Spin, Alert } from "antd";
import { UserOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/auth/admin/getUser/getAllUserSlice"; // chỉnh path nếu khác

const { Option } = Select;

const AdminPage = () => {
  const dispatch = useDispatch();
  const { getUser, loading, error } = useSelector((state) => state.getAllUser);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  // Gọi API khi load trang hoặc đổi page
  useEffect(() => {
    dispatch(getAllUser({ page, size: pageSize }));
  }, [dispatch, page, pageSize]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert
          message="Lỗi tải danh sách người dùng"
          description={error}
          type="error"
        />
      </div>
    );

  // Dữ liệu người dùng
  const users = getUser?.content || [];

  // Tìm kiếm + lọc + sắp xếp
  const filteredUsers = users
    .filter((u) =>
      `${u.fullName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
    .sort((a, b) =>
      sort === "name"
        ? a.fullName.localeCompare(b.fullName)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: () => <Avatar size="large" icon={<UserOutlined />} />,
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role) =>
        role === "admin" ? (
          <Tag color="blue">Quản trị viên</Tag>
        ) : (
          <Tag color="green">Người dùng</Tag>
        ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "createdAt",
      render: (date) =>
        new Date(date).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Thao tác",
      render: () => (
        <Button type="primary" className="bg-green-500 hover:bg-green-600">
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Quản lý người dùng</h2>

      {/* Bộ lọc + tìm kiếm */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <Input
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />
        <Select
          value={roleFilter}
          onChange={setRoleFilter}
          className="md:w-1/4"
        >
          <Option value="all">Tất cả vai trò</Option>
          <Option value="admin">Quản trị viên</Option>
          <Option value="user">Người dùng</Option>
        </Select>
        <Select value={sort} onChange={setSort} className="md:w-1/4">
          <Option value="name">Sắp xếp theo tên</Option>
          <Option value="joined">Sắp xếp theo ngày tham gia</Option>
        </Select>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => dispatch(getAllUser({ page, size: pageSize }))}
        >
          Làm mới
        </Button>
      </div>

      {/* Bảng người dùng */}
      <Table
        rowKey="id"
        dataSource={filteredUsers}
        columns={columns}
        pagination={{
          current: page,
          total: getUser?.totalElements || 0,
          pageSize,
          onChange: (p) => setPage(p),
        }}
      />
    </div>
  );
};

export default AdminPage;
