import React, { useState } from "react";
import { Table, Input, Select, Button, Tag, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sort, setSort] = useState("name");

  // Mock Data
  const mockUsers = [
    {
      id: 1,
      name: "Bùi Thu Hương",
      email: "buithuhuong@email.com",
      phone: "0258147963",
      role: "admin",
      joined: "10-02-2025",
    },
    {
      id: 2,
      name: "Hoàng Văn Em",
      email: "hoangvanem@email.com",
      phone: "0859263741",
      role: "admin",
      joined: "10-02-2025",
    },
    {
      id: 3,
      name: "Lê Minh Cường",
      email: "leminhcuong@email.com",
      phone: "0369852147",
      role: "user",
      joined: "10-02-2025",
    },
    {
      id: 4,
      name: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0123456789",
      role: "user",
      joined: "10-02-2025",
    },
    {
      id: 5,
      name: "Phạm Thú Dân",
      email: "phamthudan@email.com",
      phone: "0741258963",
      role: "user",
      joined: "10-02-2025",
    },
  ];

  // Xử lý filter + search
  const filteredUsers = mockUsers
    .filter((u) =>
      `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : a.joined.localeCompare(b.joined)
    );

  // Cột cho Table
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: () => <Avatar size="large" icon={<UserOutlined />} />,
    },
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Số điện thoại", dataIndex: "phone" },
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
    { title: "Ngày tham gia", dataIndex: "joined" },
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
      </div>

      {/* Bảng người dùng */}
      <Table
        rowKey="id"
        dataSource={filteredUsers}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminPage;
