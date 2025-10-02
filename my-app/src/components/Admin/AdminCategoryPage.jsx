/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"; // Remove 'use' import
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Form,
  Input,
  Button,
  Card,
  Popconfirm,
  message,
  Space,
  Table,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { postCategoryRequest } from "../../redux/auth/admin/Categories/post_category/postCategorySlice";
import { fetchCategoryRequest } from "../../redux/auth/admin/Categories/fetch_category/fetchCategorySlice";
import { deleteCategoryRequest } from "../../redux/auth/admin/Categories/delete_category/deleteCategorySlice";
import { updateCategoryRequest } from "../../redux/auth/admin/Categories/update_category/updateCategorySlice";

const AdminCategoryPage = () => {
  const dispatch = useDispatch();
  const { loading, error, postCategory } = useSelector(
    (state) => state.postCategory
  );
  const { fetchCategory: categories } = useSelector(
    (state) => state.fetchCategory
  );
  const { updatedCategory, loading: updateLoading } = useSelector(
    (state) => state.updateCategory || {}
  );
  const { deletedCategoryId } = useSelector((state) => state.deleteCategory);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Debug logs
  useEffect(() => {
    console.log("Edit modal state:", { editOpen, selectedCategory });
  }, [editOpen, selectedCategory]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategoryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deletedCategoryId) {
      dispatch(fetchCategoryRequest());
    }
  }, [deletedCategoryId, dispatch]);

  useEffect(() => {
    if (updatedCategory) {
      dispatch(fetchCategoryRequest());
    }
  }, [updatedCategory, dispatch]);

  // Refetch after successful create
  useEffect(() => {
    if (postCategory) {
      dispatch(fetchCategoryRequest());
    }
  }, [postCategory, dispatch]);

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();

      const categoryData = {
        name: values.name,
        description: values.description || "",
      };

      console.log("Creating category:", categoryData);

      dispatch(postCategoryRequest(categoryData));
      form.resetFields();
      setOpen(false);
    } catch {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
    }
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategoryRequest(id));
  };

  const handleEditCategoryOpen = (category) => {
    console.log("Opening edit modal for category:", category);
    setSelectedCategory(category);
    editForm.setFieldsValue({
      name: category.name,
      description: category.description || "",
    });
    setEditOpen(true);
    console.log("Edit modal should be open now");
  };

  const handleEditCategory = async () => {
    try {
      const values = await editForm.validateFields();

      // Fix: Include both name and description
      const updateData = {
        name: values.name,
        description: values.description || "", // Fix: Add description field
      };

      console.log("Updating category:", {
        id: selectedCategory.id,
        data: updateData,
      }); // Debug log

      dispatch(
        updateCategoryRequest({
          id: selectedCategory.id,
          data: updateData,
        })
      );

      editForm.resetFields();
      setEditOpen(false);
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      console.error("Edit validation error:", error); // Debug log
    }
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
    },
    {
      title: "Tên Category",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) => (
        <div className="flex items-center space-x-2">
          <FolderOutlined className="text-blue-500" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "Không có mô tả",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => {
              console.log("Edit button clicked for record:", record);
              handleEditCategoryOpen(record);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa category"
            description="Bạn có chắc chắn muốn xóa category này?"
            onConfirm={() => handleDeleteCategory(record?.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              className="hover:bg-red-50"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Quản lý Category
              </h1>
              <p className="text-gray-600">
                Tạo và quản lý các danh mục cho hệ thống
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg h-12 px-8 rounded-xl"
            >
              Tạo Category Mới
            </Button>
          </div>
        </div>

        {/* Only total category card */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <Card className="rounded-xl border-0 shadow-md">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100">
                <FolderOutlined className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng Categories</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Array.isArray(categories) ? categories.length : 0}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
          <Table
            columns={columns}
            dataSource={Array.isArray(categories) ? categories : []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} categories`,
            }}
            loading={loading}
            className="rounded-lg"
          />
        </div>

        {/* Modal for Adding Category */}
        <Modal
          title={
            <div className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
              Tạo Category Mới
            </div>
          }
          open={open}
          onCancel={() => {
            setOpen(false);
            form.resetFields();
          }}
          onOk={handleAddCategory}
          okText="Tạo"
          cancelText="Hủy"
          confirmLoading={loading}
          width={500}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Tên Category"
              rules={[
                { required: true, message: "Vui lòng nhập tên category" },
                { min: 2, message: "Tên category phải có ít nhất 2 ký tự" },
                { max: 50, message: "Tên category không được quá 50 ký tự" },
              ]}
            >
              <Input placeholder="Nhập tên category..." />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả (tùy chọn)"
              rules={[{ max: 200, message: "Mô tả không được quá 200 ký tự" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Nhập mô tả cho category..."
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Editing Category */}
        <Modal
          title={
            <div className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
              Chỉnh sửa Category
            </div>
          }
          open={editOpen}
          onCancel={() => {
            console.log("Closing edit modal"); // Debug log
            setEditOpen(false);
            editForm.resetFields();
            setSelectedCategory(null);
          }}
          onOk={handleEditCategory}
          okText="Cập nhật"
          cancelText="Hủy"
          confirmLoading={updateLoading}
          width={500}
          destroyOnClose={true} // Fix: Destroy modal on close
          forceRender={false} // Fix: Don't force render
        >
          <Form
            form={editForm}
            layout="vertical"
            preserve={false} // Fix: Don't preserve form values
            key={selectedCategory?.id} // Fix: Re-render form when category changes
          >
            <Form.Item
              name="name"
              label="Tên Category"
              rules={[
                { required: true, message: "Vui lòng nhập tên category" },
                { min: 2, message: "Tên category phải có ít nhất 2 ký tự" },
                { max: 50, message: "Tên category không được quá 50 ký tự" },
              ]}
            >
              <Input placeholder="Nhập tên category..." />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả (tùy chọn)"
              rules={[{ max: 200, message: "Mô tả không được quá 200 ký tự" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Nhập mô tả cho category..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
