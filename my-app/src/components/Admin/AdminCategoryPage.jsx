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
import img from "../../img/logo1.png";

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

      const updateData = {
        name: values.name,
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
      title: "#",
      key: "index",
      width: 80,
      align: "center",
      render: (_, __, index) => index + 1,
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
            <div className="text-center text-xl font-semibold text-[#6B4F3B]">
              <span>
                <img
                  src={img}
                  alt=""
                  className="w-8 h-8 rounded-md inline-block mr-2"
                />
              </span>
              Đăng Category Mới
            </div>
          }
          open={open}
          onCancel={() => {
            setOpen(false);
            form.resetFields();
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setOpen(false);
                form.resetFields();
              }}
              className="px-6 py-2 h-auto rounded-lg font-semibold"
            >
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleAddCategory}
              className="bg-[#6B4F3B] hover:bg-[#5a4330] px-6 py-2 h-auto rounded-lg font-semibold"
            >
              Đăng
            </Button>,
          ]}
          width={500}
          destroyOnClose
          className="rounded-2xl overflow-hidden"
          bodyStyle={{
            background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <Form form={form} layout="vertical" className="mt-4">
            <Form.Item
              name="name"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Tên Category *
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập tên category" },
                { min: 2, message: "Tên category phải có ít nhất 2 ký tự" },
                { max: 50, message: "Tên category không được quá 50 ký tự" },
              ]}
            >
              <Input
                placeholder="Nhập tên category..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Editing Category */}
        <Modal
          title={
            <div className="text-center text-xl font-semibold text-[#6B4F3B]">
              <span>
                <img
                  src={img}
                  alt=""
                  className="w-8 h-8 rounded-md inline-block mr-2"
                />
              </span>
              Cập Nhật Category
            </div>
          }
          open={editOpen}
          onCancel={() => {
            console.log("Closing edit modal"); // Debug log
            setEditOpen(false);
            editForm.resetFields();
            setSelectedCategory(null);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setEditOpen(false);
                editForm.resetFields();
                setSelectedCategory(null);
              }}
              className="px-6 py-2 h-auto rounded-lg font-semibold"
            >
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleEditCategory}
              className="bg-[#6B4F3B] hover:bg-[#5a4330] px-6 py-2 h-auto rounded-lg font-semibold"
            >
              Cập nhật
            </Button>,
          ]}
          width={500}
          destroyOnClose={true}
          className="rounded-2xl overflow-hidden"
          bodyStyle={{
            background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <Form
            form={editForm}
            layout="vertical"
            preserve={false}
            key={selectedCategory?.id}
            className="mt-4"
          >
            <Form.Item
              name="name"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Tên Category *
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập tên category" },
                { min: 2, message: "Tên category phải có ít nhất 2 ký tự" },
                { max: 50, message: "Tên category không được quá 50 ký tự" },
              ]}
            >
              <Input
                placeholder="Nhập tên category..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
