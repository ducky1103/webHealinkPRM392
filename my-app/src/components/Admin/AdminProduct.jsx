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
  InputNumber,
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { getAllProduct } from "../../redux/User/product/fetchProduct/getAllProductSlice";
import { productPostRequest } from "../../redux/auth/admin/Product/post_product/postProductSlice";
import { updateProductRequest } from "../../redux/auth/admin/Product/update_Product/updateProductSlice";
import { deleteProductRequest } from "../../redux/auth/admin/Product/delete_product/deleteProductSlice";

const { TextArea } = Input;

const AdminProductPage = () => {
  const dispatch = useDispatch();

  const {
    product: products,
    loading: fetchLoading,
    error,
    pagination,
  } = useSelector((state) => state.fetchProduct);
  const { postProduct, loading: postLoading } = useSelector(
    (state) => state.postProduct
  );
  const { product: updatedProduct, loading: updateLoading } = useSelector(
    (state) => state.updateProduct
  );
  const { delete: deletedProduct, loading: deleteLoading } = useSelector(
    (state) => state.deleteProduct
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getAllProduct({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (postProduct) {
      setCurrentPage(1);
      setTimeout(() => {
        dispatch(getAllProduct({ page: 1, size: pageSize }));
      }, 500);
    }
  }, [postProduct, dispatch, pageSize]);
  useEffect(() => {
    if (updatedProduct) {
      setTimeout(() => {
        dispatch(getAllProduct({ page: currentPage, size: pageSize }));
      }, 500);
    }
  }, [updatedProduct, dispatch, currentPage, pageSize]);
  useEffect(() => {
    if (deletedProduct) {
      setTimeout(() => {
        // ✅ Kiểm tra nếu xóa hết sản phẩm ở trang cuối
        const totalPages = Math.ceil(
          (pagination?.totalElements - 1) / pageSize
        );

        // Nếu trang hiện tại lớn hơn tổng số trang sau khi xóa, quay về trang cuối
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
          dispatch(getAllProduct({ page: totalPages, size: pageSize }));
        } else {
          // Refresh trang hiện tại
          dispatch(getAllProduct({ page: currentPage, size: pageSize }));
        }
      }, 500);
    }
  }, [
    deletedProduct,
    dispatch,
    currentPage,
    pageSize,
    pagination?.totalElements,
  ]);

  const refetchProducts = () => {
    dispatch(getAllProduct({ page: currentPage, size: pageSize }));
  };

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

      if (values.image && values.image.length > 0) {
        const file = values.image[0].originFileObj;
        formData.append("file", file);
      }

      dispatch(productPostRequest(formData));

      setCreateOpen(false);
      createForm.resetFields();

      message.success("Đang tạo sản phẩm...");
    } catch (error) {
      message.error("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product);
    setUpdateOpen(true);

    updateForm.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
  };

  const handleSubmitUpdate = async () => {
    try {
      const values = await updateForm.validateFields();

      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("description", values.description);
      formdata.append("price", values.price);
      formdata.append("stockQuantity", values.stockQuantity);
      if (values.image && values.image.length > 0) {
        const file = values.image[0].originFileObj;
        formdata.append("file", file);
      }
      dispatch(
        updateProductRequest({
          formData: formdata,
          productId: selectedProduct.id,
        })
      );
      setUpdateOpen(false);
      updateForm.resetFields();
      setSelectedProduct(null);
    } catch (error) {
      message.error("Vui lòng kiểm tra lại thông tin!");
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductRequest(productId));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a, b) => b.id - a.id,
      defaultSortOrder: "descend",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      render: (imageUrl, record) => (
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={record.name}
              className="w-full h-full object-cover"
              preview={{
                mask: "Xem",
              }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">
              <ShoppingCartOutlined className="text-blue-600 text-xl" />
            </div>
          )}
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
      width: 130,
      render: (price) => (
        <span className="font-bold text-green-600">
          {price ? formatPrice(price) : "N/A"}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: 100,
      align: "center",
      render: (stock) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
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
      width: 180,
      align: "center",
      render: (_, record) => (
        <Space size="small" wrap>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdateProduct(record)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa sản phẩm"
            description={`Bạn có chắc chắn muốn xóa "${record.name}"?`}
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
              type="default"
              size="large"
              icon={<ReloadOutlined />}
              onClick={refetchProducts}
              loading={fetchLoading}
            >
              Làm mới
            </Button>
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
              {pagination?.totalElements ||
                (Array.isArray(products) ? products.length : 0)}
            </div>
            <div className="text-gray-600">Tổng sản phẩm</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">
              {Array.isArray(products)
                ? products.filter((p) => (p.stockQuantity || 0) > 0).length
                : 0}
            </div>
            <div className="text-gray-600">Còn hàng (trang hiện tại)</div>
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
              current: currentPage,
              pageSize: pageSize,
              total:
                pagination?.totalElements ||
                (Array.isArray(products) ? products.length : 0),
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} sản phẩm`,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            onChange={handleTableChange}
            scroll={{ x: 1100 }}
            locale={{
              emptyText: error
                ? "Lỗi khi tải dữ liệu"
                : "Không có sản phẩm nào",
            }}
          />
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <PlusOutlined className="text-blue-600" />
            <span className="text-lg font-semibold">Thêm sản phẩm mới</span>
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
        width={700}
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
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
            rules={[
              { required: true, message: "Vui lòng chọn hình ảnh sản phẩm!" },
            ]}
          >
            <Upload
              beforeUpload={() => false}
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

      {/* Update Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EditOutlined className="text-orange-600" />
            <span className="text-lg font-semibold">Cập nhật sản phẩm</span>
          </div>
        }
        open={updateOpen}
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
          setSelectedProduct(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setUpdateOpen(false);
              updateForm.resetFields();
              setSelectedProduct(null);
            }}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmitUpdate}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Cập nhật
          </Button>,
        ]}
        width={700}
        destroyOnClose
      >
        <Form
          form={updateForm}
          layout="vertical"
          requiredMark="optional"
          className="mt-4"
        >
          {selectedProduct?.imageUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh hiện tại
              </label>
              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-32 h-32 object-cover rounded-lg"
                preview={{
                  mask: "Xem ảnh",
                }}
              />
            </div>
          )}

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
            label="Cập nhật hình ảnh (tùy chọn)"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) return e;
              return e && e.fileList;
            }}
          >
            <Upload
              beforeUpload={() => false}
              listType="picture-card"
              maxCount={1}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <PlusOutlined className="text-2xl mb-2" />
                <div className="text-sm">Chọn ảnh mới</div>
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
