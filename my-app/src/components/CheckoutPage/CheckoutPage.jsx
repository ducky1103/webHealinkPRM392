"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../HomePage/Header";
import { getAllOrder } from "../../redux/User/order/fetchOrder/getAllOrderSlice";
import { getAllOrderItem } from "../../redux/User/order/fetchOrderItem/getAllOrderItemSlice";
import { getProfile } from "../../redux/User/profile/getProfileSlice";
import { createPayos } from "../../redux/User/payos/createPayosSlice";
import { updateAddress } from "../../redux/User/order/updateAddress/updateAddressSlice"; // ✅ import action này
import { Modal, Spin, Radio, Input, Button } from "antd";
import { Eye, CreditCard, Package, ShoppingCart } from "lucide-react";
import payos from "../../img/payos.png";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);
  const { orderItem, loading: itemLoading } = useSelector(
    (state) => state.orderItem
  );
  const { profile } = useSelector((state) => state.getProfile);
  const { loading: updateLoading } = useSelector(
    (state) => state.updateAddress || {}
  );
  const userId = useSelector((state) => state.account?.user?.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("payos");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // ✅ modal cho địa chỉ
  const [newAddress, setNewAddress] = useState(""); // ✅ địa chỉ mới

  useEffect(() => {
    if (id) dispatch(getAllOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userId) dispatch(getProfile(userId));
  }, [dispatch, userId]);

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

  const handleConfirmPayment = () => {
    if (paymentMethod === "payos") {
      dispatch(createPayos(id));
    }
  };

  // ✅ Hàm mở modal nhập địa chỉ
  const handleOpenAddressModal = () => {
    setNewAddress(order?.address || "");
    setIsAddressModalOpen(true);
  };

  // ✅ Hàm gửi địa chỉ mới
  const handleSubmitAddress = () => {
    if (!newAddress.trim()) return;
    console.log("Data gửi đi:", newAddress);
    dispatch(updateAddress({ id, address: newAddress }));
    console.log("id-address", id);

    setIsAddressModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl text-center font-bold mb-6 text-slate-800">
          Thanh toán đơn hàng
        </h1>

        {loading && <p>Đang tải đơn hàng...</p>}
        {error && <p className="text-red-500">Lỗi: {error}</p>}

        {!loading && order && order.id ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin giao hàng */}
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

                {/* ✅ Nút mở modal cập nhật địa chỉ */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={order.address || ""}
                    readOnly
                    className="w-full p-3 border rounded-lg bg-gray-100"
                  />
                  <Button
                    onClick={handleOpenAddressModal}
                    type="primary"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Cập nhật
                  </Button>
                </div>

                <textarea
                  placeholder="Ghi chú cho shop"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </form>

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
                    >
                      <Eye size={22} />
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-slate-600">
                    Tạm tính: {formatPrice(totalAmount)}
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    Tổng cộng: {formatPrice(totalAmount)}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-lg bg-red-500 text-white py-2 mt-4 hover:bg-gray-600 transition-all duration-300 shadow-md"
                >
                  Tiếp tục mua hàng
                </button>

                <button
                  onClick={handleConfirmPayment}
                  className="w-full rounded-lg bg-green-600 text-white py-2 mt-3 hover:bg-indigo-700 transition-all duration-300 shadow-md"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p className="text-slate-600">Không có đơn hàng nào.</p>
        )}
      </div>

      <Modal
        open={isAddressModalOpen}
        onCancel={() => setIsAddressModalOpen(false)}
        footer={null}
        centered
        className="rounded-xl"
      >
        <div className="p-2">
          <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">
            🏠 Cập nhật địa chỉ giao hàng
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Vui lòng nhập chính xác địa chỉ nhận hàng để đơn của bạn được giao
            nhanh nhất.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ mới
            </label>
            <Input.TextArea
              rows={3}
              placeholder="VD: 123 Nguyễn Trãi, Phường 5, Quận 10, TP.HCM"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setIsAddressModalOpen(false)}>Hủy</Button>
            <Button
              type="primary"
              loading={updateLoading}
              onClick={handleSubmitAddress}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>

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
