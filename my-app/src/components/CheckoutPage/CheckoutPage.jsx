"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../HomePage/Header";
import { getAllOrder } from "../../redux/User/order/fetchOrder/getAllOrderSlice";
import { getAllOrderItem } from "../../redux/User/order/fetchOrderItem/getAllOrderItemSlice";
// import { deleteOrder } from "../../redux/User/order/deleteOrder/deleteOrderSlice";
import { getProfile } from "../../redux/User/profile/getProfileSlice";
import { createPayos } from "../../redux/User/payos/createPayosSlice";
import { Modal, Spin, Radio } from "antd";
import { Eye, Trash2 } from "lucide-react";
import payos from "../../img/payos.png";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  const { orderItem, loading: itemLoading } = useSelector(
    (state) => state.orderItem
  );
  // const { loading: deleteLoading, success: deleteSuccess } = useSelector(
  //   (state) => state.deleteOrderId
  // );
  const { profile } = useSelector((state) => state.getProfile);
  const userId = useSelector((state) => state.account?.user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("payos");

  useEffect(() => {
    if (id) dispatch(getAllOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userId) dispatch(getProfile(userId));
  }, [dispatch, userId]);

  // useEffect(() => {
  //   if (deleteSuccess) navigate("/cart");
  // }, [deleteSuccess, navigate]);

  const totalAmount = order?.totalAmount || 0;
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleViewDetail = (itemId) => {
    dispatch(getAllOrderItem(itemId));
    setIsModalOpen(true);
  };

  // const handleDeleteOrder = () => {
  //   if (id && window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
  //     dispatch(deleteOrder({ id }));
  //   }
  // };

  const handleConfirmPayment = () => {
    if (paymentMethod === "payos") {
      dispatch(createPayos(id)); // Gọi API PayOS
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
        {/* Thanh tiến trình */}
        {/* ===== Progress Steps (Giống CartPage) ===== */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col items-center w-1/3 opacity-60">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 font-semibold">
              1
            </div>
            <p className="mt-2 text-gray-500 font-medium">Cart</p>
          </div>

          <div className="h-1 w-1/3 bg-yellow-400"></div>

          <div className="flex flex-col items-center w-1/3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white font-semibold">
              2
            </div>
            <p className="mt-2 text-yellow-600 font-medium">Checkout</p>
          </div>

          <div className="h-1 w-1/3 bg-gray-200"></div>

          <div className="flex flex-col items-center w-1/3 opacity-60">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 font-semibold">
              3
            </div>
            <p className="mt-2 text-gray-500 font-medium">Complete</p>
          </div>
        </div>

        <h1 className="text-3xl text-center font-bold mb-6 text-slate-800">
          Thanh toán đơn hàng
        </h1>

        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">Lỗi: {error}</p>}

        {!loading && order && order.id ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin giao hàng + phương thức thanh toán */}
            <div className="p-6 border rounded-lg bg-gradient-to-b from-amber-50 to-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Thông tin giao hàng
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  value={order.user?.fullName || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="email"
                  value={order.user?.email || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="text"
                  value={profile.phoneNumber || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="Địa chỉ nhận hàng"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  placeholder="Ghi chú cho shop"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </form>

              {/* Phương thức thanh toán */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Phương thức thanh toán
                </h3>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-3 flex flex-col"
                >
                  <Radio value="payos">
                    <div className="flex items-center gap-3">
                      <img src={payos} alt="PayOS" className="w-24 h-auto" />
                      <span className="font-medium">Thanh toán qua PayOS</span>
                    </div>
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            {/* Giỏ hàng */}
            <div className="p-6 border rounded-lg bg-gradient-to-b from-amber-50 to-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Giỏ hàng của bạn
              </h2>

              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-3 hover:shadow-md transition-all duration-200"
                  >
                    <img
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Giá: {formatPrice(item.product.price)}
                      </p>
                      <p className="text-sm text-slate-600">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewDetail(item.id)}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors p-2"
                      title="Xem chi tiết"
                    >
                      <Eye size={22} />
                    </button>
                  </div>
                ))}

                {/* Tổng cộng */}
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-slate-600">
                    Tạm tính: {formatPrice(totalAmount)}
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    Tổng cộng: {formatPrice(totalAmount)}
                  </p>
                </div>

                {/* Nút hành động */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-lg bg-gray-500 text-white py-2 mt-4 hover:bg-gray-600 transition-all duration-300 shadow-md"
                >
                  Tiếp tục mua hàng
                </button>

                {/* <button
                  onClick={handleDeleteOrder}
                  disabled={deleteLoading}
                  className="w-full rounded-lg bg-red-600 text-white py-2 mt-3 hover:bg-red-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  {deleteLoading ? "Đang xóa..." : "Xóa đơn hàng"}
                </button> */}

                <button
                  onClick={handleConfirmPayment}
                  className="w-full rounded-lg bg-indigo-600 text-white py-2 mt-3 hover:bg-indigo-700 transition-all duration-300 shadow-md"
                >
                  Tiếp tục thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p className="text-slate-600">Không có đơn hàng nào.</p>
        )}
      </div>

      {/* Modal Chi tiết sản phẩm */}
      <Modal
        title={<span className="font-semibold text-lg">Chi tiết sản phẩm</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="rounded-2xl overflow-hidden"
      >
        {itemLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : orderItem ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex justify-center">
              <img
                src={orderItem.product.imageUrl || "/placeholder.svg"}
                alt={orderItem.product.name}
                className="w-48 h-48 object-cover rounded-xl shadow"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {orderItem.product.name}
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                Mô tả: {orderItem.product.description || "Không có mô tả"}
              </p>
              <p className="text-sm text-slate-700">
                Giá:{" "}
                <span className="font-semibold text-indigo-600">
                  {formatPrice(orderItem.product.price)}
                </span>
              </p>
              <p className="text-sm text-slate-700">
                Số lượng: {orderItem.quantity}
              </p>
              <p className="text-sm text-slate-700">
                Còn trong kho: {orderItem.product.stockQuantity}
              </p>
            </div>
          </div>
        ) : (
          <p>Không có dữ liệu chi tiết.</p>
        )}
      </Modal>
    </>
  );
};

export default CheckoutPage;
