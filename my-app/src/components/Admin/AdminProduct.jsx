/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Popconfirm,
  Space,
  Select,
  InputNumber,
  Alert,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

// Use the existing user product fetch API
import { getAllProduct } from "../../redux/User/product/fetchProduct/getAllProductSlice";
import create from "@ant-design/icons/lib/components/IconFont";
import { productPostRequest } from "../../redux/auth/admin/Product/post_product/postProductSlice";

const { TextArea } = Input;
const { Option } = Select;

const AdminProductPage = () => {
  const dispatch = useDispatch();

  // Redux states - use the existing fetchProduct state
  const {
    product: products,
    loading: fetchLoading,
    error,
    pagination,
  } = useSelector((state) => state.fetchProduct);
  const { postProduct, loading: postLoading } = useSelector(
    (state) => state.postProduct
  );

  // Local states
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  // Fetch products on mount using the existing API
  useEffect(() => {
    dispatch(getAllProduct({ page: 1, size: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (postProduct) {
      dispatch(getAllProduct({ page: 1, size: 100 }));
    }
  }, [postProduct, dispatch]);
  // Show error message if there's an error
  useEffect(() => {
    if (error) {
      message.error(`Lỗi khi tải sản phẩm: ${error}`);
    }
  }, [error]);

  // Refetch products after operations
  const refetchProducts = () => {
    dispatch(getAllProduct({ page: 0, size: 100 }));
  };

  // Handle create product - disabled until API is ready
  const handleCreateProduct = () => {
    setCreateOpen(true);
    createForm.resetFields();
  };
  const handleSubmitCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("stockQuantity", values.stockQuantity);
      const file = values.image[0].originFileObj;
      formData.append("file", file);

      await dispatch(productPostRequest(formData));
      message.success("Tạo sản phẩm thành công!");
      setCreateOpen(false);
      createForm.resetFields();
      refetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      message.error("Có lỗi xảy ra khi tạo sản phẩm!");
    }
  };

  // Handle update product - disabled until API is ready
  const handleUpdateProduct = (product) => {
    message.info("Chức năng cập nhật sản phẩm đang được phát triển");
  };

  // Handle delete product - disabled until API is ready
  const handleDeleteProduct = (productId) => {
    message.info("Chức năng xóa sản phẩm đang được phát triển");
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 120,
      render: (imageUrl, record) => (
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={record.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">
            <ShoppingCartOutlined className="text-blue-600 text-xl" />
          </div>
        </div>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: 200,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price) => (
        <span className="font-bold text-green-600">
          {price ? formatPrice(price) : "N/A"}
        </span>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: 100,
      render: (stock) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            (stock || 0) > 10
              ? "bg-green-100 text-green-800"
              : (stock || 0) > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stock || 0}
        </span>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 250,
    },

    {
      title: "Thao tác",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdateProduct(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCartOutlined className="text-blue-600" />
              Quản lý sản phẩm
            </h1>
            <p className="text-gray-600">
              Quản lý toàn bộ sản phẩm trong hệ thống
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateProduct}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Thêm sản phẩm mới
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">
              {Array.isArray(products) ? products.length : 0}
            </div>
            <div className="text-gray-600">Tổng sản phẩm</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(products)
                ? products.filter((p) => (p.stockQuantity || 0) > 0).length
                : 0}
            </div>
            <div className="text-gray-600">Còn hàng</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-yellow-600">
              {Array.isArray(products)
                ? products.filter(
                    (p) =>
                      (p.stockQuantity || 0) <= 5 && (p.stockQuantity || 0) > 0
                  ).length
                : 0}
            </div>
            <div className="text-gray-600">Sắp hết hàng</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <div className="text-2xl font-bold text-red-600">
              {Array.isArray(products)
                ? products.filter((p) => (p.stockQuantity || 0) === 0).length
                : 0}
            </div>
            <div className="text-gray-600">Hết hàng</div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table
            columns={columns}
            dataSource={Array.isArray(products) ? products : []}
            rowKey="id"
            loading={fetchLoading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} sản phẩm`,
            }}
            scroll={{ x: 1400 }}
            locale={{
              emptyText: error
                ? "Lỗi khi tải dữ liệu"
                : "Không có sản phẩm nào",
            }}
          />
        </div>
      </div>
      <Modal
        title={
          <div className="flex items-center gap-2">
            <PlusOutlined className="text-blue-600" />
            <span>Thêm sản phẩm mới</span>
          </div>
        }
        open={createOpen}
        onCancel={() => {
          setCreateOpen(false);
          createForm.resetFields();
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setCreateOpen(false);
              createForm.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={postLoading}
            onClick={handleSubmitCreate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Tạo sản phẩm
          </Button>,
        ]}
        width={600}
        destroyOnClose
      >
        <Form
          form={createForm}
          layout="vertical"
          requiredMark="optional"
          className="mt-4"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự!" },
              { max: 100, message: "Tên sản phẩm không được quá 100 ký tự!" },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm..." size="large" />
          </Form.Item>

          <Form.Item
            label="Mô tả sản phẩm"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
              { min: 10, message: "Mô tả phải có ít nhất 10 ký tự!" },
              { max: 500, message: "Mô tả không được quá 500 ký tự!" },
            ]}
          >
            <TextArea
              placeholder="Nhập mô tả chi tiết về sản phẩm..."
              rows={4}
              size="large"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Giá sản phẩm (VND)"
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                { type: "number", min: 0, message: "Giá phải lớn hơn 0!" },
              ]}
            >
              <InputNumber
                placeholder="0"
                size="large"
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                max={1000000000}
              />
            </Form.Item>

            <Form.Item
              label="Số lượng tồn kho"
              name="stockQuantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng!" },
                {
                  type: "number",
                  min: 0,
                  message: "Số lượng phải lớn hơn hoặc bằng 0!",
                },
              ]}
            >
              <InputNumber
                placeholder="0"
                size="large"
                style={{ width: "100%" }}
                min={0}
                max={10000}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Hình ảnh sản phẩm"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              { required: true, message: "Vui lòng chọn hình ảnh sản phẩm!" },
            ]}
          >
            <Upload
              beforeUpload={() => false} // Ngăn upload tự động, để mình tự handle FormData
              listType="picture-card"
              maxCount={1}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <PlusOutlined className="text-2xl mb-2" />
                <div className="text-sm">Chọn hình ảnh</div>
                <div className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG (tối đa 5MB)
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProductPage;
