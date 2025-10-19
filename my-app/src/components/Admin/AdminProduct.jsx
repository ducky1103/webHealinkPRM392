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
import { ShoppingCartOutlined } from "@ant-design/icons";

import { getAllProduct } from "../../redux/User/product/fetchProduct/getAllProductSlice";
import { productPostRequest } from "../../redux/auth/admin/Product/post_product/postProductSlice";
import { updateProductRequest } from "../../redux/auth/admin/Product/update_Product/updateProductSlice";
import { deleteProductRequest } from "../../redux/auth/admin/Product/delete_product/deleteProductSlice";
import img from "../../img/logo1.png";
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
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 80,
      align: "center",
      render: (_, __, index) => (
        <div className="font-bold text-gray-600 text-center">
          {index + 1 + (currentPage - 1) * pageSize}
        </div>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 120,
      align: "center",
      render: (imageUrl, record) => (
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg mx-auto">
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
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-400">
              <div className="text-white text-2xl">📦</div>
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
      width: 220,
      render: (name) => (
        <div className="font-semibold text-gray-800 text-lg">{name}</div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "center",
      render: (price) => (
        <div className="font-bold text-green-600 text-lg">
          {price ? formatPrice(price) : "N/A"}
        </div>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Tồn kho",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      width: 120,
      align: "center",
      render: (stock) => {
        const stockNum = stock || 0;
        let bgColor, textColor;

        if (stockNum > 10) {
          bgColor = "bg-green-100";
          textColor = "text-green-800";
        } else if (stockNum > 0) {
          bgColor = "bg-yellow-100";
          textColor = "text-yellow-800";
        } else {
          bgColor = "bg-red-100";
          textColor = "text-red-800";
        }

        return (
          <div
            className={`px-3 py-2 rounded-full text-sm font-bold ${bgColor} ${textColor} inline-flex items-center gap-1`}
          >
            <span>{stockNum}</span>
          </div>
        );
      },
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 280,
      render: (description) => (
        <div className="text-gray-600 text-sm">
          {description || "Không có mô tả"}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => handleUpdateProduct(record)}
            className="bg-blue-600 hover:bg-blue-700 border-0 rounded-full px-4 py-2 h-auto font-semibold shadow-lg"
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
              className="border-0 rounded-full px-4 py-2 h-auto font-semibold shadow-lg"
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <ShoppingCartOutlined className="text-3xl" />
                  Quản lý sản phẩm
                </h1>
                <p className="text-blue-100 mt-1">
                  Quản lý toàn bộ sản phẩm trong hệ thống
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="default"
                  size="large"
                  onClick={refetchProducts}
                  loading={fetchLoading}
                  className="bg-white text-blue-600 hover:bg-blue-50 border-0 font-semibold px-6 py-2 h-auto rounded-full shadow-lg"
                >
                  Làm mới
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleCreateProduct}
                  className="bg-white text-blue-600 hover:bg-blue-50 border-0 font-semibold px-6 py-2 h-auto rounded-full shadow-lg"
                >
                  Thêm sản phẩm mới
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">
                      {pagination?.totalElements ||
                        (Array.isArray(products) ? products.length : 0)}
                    </div>
                    <div className="text-gray-600 font-medium">
                      Tổng sản phẩm
                    </div>
                  </div>
                  <div className="text-4xl text-blue-400"></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {Array.isArray(products)
                        ? products.filter((p) => (p.stockQuantity || 0) > 0)
                            .length
                        : 0}
                    </div>
                    <div className="text-gray-600 font-medium">Còn hàng</div>
                  </div>
                  <div className="text-4xl text-green-400"></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg border border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">
                      {Array.isArray(products)
                        ? products.filter(
                            (p) =>
                              (p.stockQuantity || 0) <= 5 &&
                              (p.stockQuantity || 0) > 0
                          ).length
                        : 0}
                    </div>
                    <div className="text-gray-600 font-medium">
                      Sắp hết hàng
                    </div>
                  </div>
                  <div className="text-4xl text-yellow-400"></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-red-600">
                      {Array.isArray(products)
                        ? products.filter((p) => (p.stockQuantity || 0) === 0)
                            .length
                        : 0}
                    </div>
                    <div className="text-gray-600 font-medium">Hết hàng</div>
                  </div>
                  <div className="text-4xl text-red-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="p-6">
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
                className: "custom-pagination",
              }}
              onChange={handleTableChange}
              scroll={{ x: 1100 }}
              className="custom-table"
              rowClassName="hover:bg-blue-50 transition-colors duration-200"
              locale={{
                emptyText: error
                  ? "Lỗi khi tải dữ liệu"
                  : "Không có sản phẩm nào",
              }}
            />
          </div>
        </div>
      </div>

      {/* Create Modal */}
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
            Đăng Sản Phẩm Mới
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
            className="px-6 py-2 h-auto rounded-lg font-semibold"
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={postLoading}
            onClick={handleSubmitCreate}
            className="bg-[#6B4F3B] hover:bg-[#5a4330] px-6 py-2 h-auto rounded-lg font-semibold"
          >
            Đăng
          </Button>,
        ]}
        width={600}
        destroyOnClose
        className="rounded-2xl overflow-hidden"
        bodyStyle={{
          background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
          borderRadius: "16px",
          padding: "24px 28px",
        }}
      >
        <Form
          form={createForm}
          layout="vertical"
          requiredMark="optional"
          className="mt-4"
        >
          <Form.Item
            label={
              <span className="text-[#6B4F3B] font-medium">Tên sản phẩm *</span>
            }
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự!" },
              { max: 100, message: "Tên sản phẩm không được quá 100 ký tự!" },
            ]}
          >
            <Input
              placeholder="Nhập tên sản phẩm..."
              className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#6B4F3B] font-medium">
                Mô tả sản phẩm *
              </span>
            }
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
              className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Giá sản phẩm (VND) *
                </span>
              }
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                { type: "number", min: 0, message: "Giá phải lớn hơn 0!" },
              ]}
            >
              <InputNumber
                placeholder="0"
                style={{ width: "100%" }}
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                max={1000000000}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Số lượng tồn kho *
                </span>
              }
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
                style={{ width: "100%" }}
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
                min={0}
                max={10000}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span className="text-[#6B4F3B] font-medium">
                Hình ảnh sản phẩm *
              </span>
            }
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
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center p-4 w-full">
                <div className="text-2xl mb-2 text-[#6B4F3B]">📁</div>
                <div className="text-sm font-medium text-[#6B4F3B]">
                  Chọn ảnh
                </div>
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
          <div className="text-center text-xl font-semibold text-[#6B4F3B]">
            <span>
              <img
                src={img}
                alt=""
                className="w-8 h-8 rounded-md inline-block mr-2"
              />
            </span>
            Cập Nhật Sản Phẩm
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
            className="px-6 py-2 h-auto rounded-lg font-semibold"
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmitUpdate}
            className="bg-[#6B4F3B] hover:bg-[#5a4330] px-6 py-2 h-auto rounded-lg font-semibold"
          >
            Cập nhật
          </Button>,
        ]}
        width={600}
        destroyOnClose
        className="rounded-2xl overflow-hidden"
        bodyStyle={{
          background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
          borderRadius: "16px",
          padding: "24px 28px",
        }}
      >
        <Form
          form={updateForm}
          layout="vertical"
          requiredMark="optional"
          className="mt-4"
        >
          {selectedProduct?.imageUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#6B4F3B] mb-2">
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
            label={
              <span className="text-[#6B4F3B] font-medium">Tên sản phẩm *</span>
            }
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              { min: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự!" },
              { max: 100, message: "Tên sản phẩm không được quá 100 ký tự!" },
            ]}
          >
            <Input
              placeholder="Nhập tên sản phẩm..."
              className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#6B4F3B] font-medium">
                Mô tả sản phẩm *
              </span>
            }
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
              className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Giá sản phẩm (VND) *
                </span>
              }
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                { type: "number", min: 0, message: "Giá phải lớn hơn 0!" },
              ]}
            >
              <InputNumber
                placeholder="0"
                style={{ width: "100%" }}
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
                max={1000000000}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Số lượng tồn kho *
                </span>
              }
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
                style={{ width: "100%" }}
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
                min={0}
                max={10000}
              />
            </Form.Item>
          </div>

          <Form.Item
            label={
              <span className="text-[#6B4F3B] font-medium">
                Cập nhật hình ảnh (tùy chọn)
              </span>
            }
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
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center p-4 w-full">
                <div className="text-2xl mb-2 text-[#6B4F3B]">📁</div>
                <div className="text-sm font-medium text-[#6B4F3B]">
                  Chọn ảnh mới
                </div>
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
