import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../HomePage/Header";
import { getOrderUser } from "../../redux/User/order/fetchOrderByUser/getAllOrderByUserSlice";
import { getAllOrderItem } from "../../redux/User/order/fetchOrderItem/getAllOrderItemSlice";
import { Modal, Spin } from "antd";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log("userid", userId);

  const { orderUser, loading, error } = useSelector((state) => state.orderUser);
  const {
    orderItem,
    loading: itemLoading,
    error: itemError,
  } = useSelector((state) => state.orderItem);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getOrderUser({ userId, page: 1, size: 10 }));
    }
  }, [dispatch, userId]);

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  // ✅ Gom tất cả item từ tất cả order
  const orderList = orderUser?.content || [];
  const allItems = orderList.flatMap((order) => order.items || []);

  // ✅ Tổng tiền
  const totalAmount = orderList.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  // ✅ View detail
  const handleViewDetail = (itemId) => {
    dispatch(getAllOrderItem(itemId));
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Thanh toán</h1>

        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">Lỗi: {error}</p>}

        {!loading && allItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg bg-white">
            {/* Form thông tin giao hàng */}
            <div className="p-6 border rounded-lg bg-amber-50">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Giao hàng tận nơi
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  value={orderList[0]?.user?.username || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="text"
                  value={orderList[0]?.user?.fullName || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="email"
                  value={orderList[0]?.user?.email || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Địa chỉ nhận hàng"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </form>
            </div>

            {/* Giỏ hàng tổng hợp */}
            <div className="p-6 border rounded-lg bg-amber-50">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Giỏ hàng của bạn
              </h2>
              <div className="space-y-4">
                {allItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b pb-2"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Giá: {item.product.price.toLocaleString()} VND
                      </p>
                      <p className="text-sm text-slate-600">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    {/* Nút xem chi tiết */}
                    <button
                      onClick={() => handleViewDetail(item.id)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600">
                    Tạm tính: {totalAmount.toLocaleString()} VND
                  </p>
                  <p className="text-sm text-slate-600">
                    Phí vận chuyển: 15,000 VND
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    Tổng cộng: {(totalAmount + 15000).toLocaleString()} VND
                  </p>
                </div>

                <button className="w-full rounded-lg bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition-all duration-300">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p className="text-slate-600">Không có sản phẩm nào.</p>
        )}
      </div>

      {/* Modal hiển thị chi tiết item */}
      <Modal
        title="Chi tiết sản phẩm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {itemLoading ? (
          <Spin />
        ) : itemError ? (
          <p className="text-red-500">Lỗi: {itemError}</p>
        ) : orderItem ? (
          <div className="space-y-3">
            <img
              src={orderItem.product.imageUrl}
              alt={orderItem.product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">{orderItem.product.name}</h3>
            <p>Mô tả: {orderItem.product.description}</p>
            <p>Giá: {orderItem.product.price.toLocaleString()} VND</p>
            <p>Số lượng: {orderItem.quantity}</p>
            <p>Còn trong kho: {orderItem.product.stockQuantity}</p>
          </div>
        ) : (
          <p>Không có dữ liệu chi tiết.</p>
        )}
      </Modal>
    </>
  );
};

export default CheckoutPage;
