import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../HomePage/Header";
import { getAllCart } from "../../redux/User/cartApi/fetchCart/getAllCartSlice";
import { updateCartItem } from "../../redux/User/cartApi/updateCartItem/updateCartItemSlice";
import { deleteCartItem } from "../../redux/User/cartApi/deleteCartItem/deleteCartItemSlice";
import { checkoutCart } from "../../redux/User/cartApi/checkoutCart/checkoutCartSlice";
import { CreditCard, Package, ShoppingCart, Trash2 } from "lucide-react";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { loading: checkoutLoading, checkout } = useSelector(
    (state) => state.checkoutCart
  );

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

  useEffect(() => {
    if (checkout && checkout.id) {
      navigate(`/checkout/${checkout.id}`);
    }
  }, [checkout, navigate]);

  const items = cart?.items || [];

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ cartItemId, quantity: newQuantity }));
    setTimeout(() => {
      dispatch(getAllCart());
    }, 300);
  };

  const handleDelete = (cartItemId) => {
    dispatch(deleteCartItem(cartItemId));
    setTimeout(() => {
      dispatch(getAllCart());
    }, 300);
  };

  const handleCheckout = () => {
    dispatch(checkoutCart());
  };

  const handleContinueShopping = () => {
    navigate("/store"); // 👉 đổi URL này thành trang danh sách sản phẩm của bạn
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12 mt-20">
        {/* ===== Cart Items ===== */}
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          🛒 Giỏ hàng của bạn
        </h1>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold mb-2 shadow-lg transition-all">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-amber-600">Giỏ hàng</p>
            </div>

            <div className="h-1 flex-1 bg-stone-200 mx-2"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-200 text-stone-500 font-semibold mb-2 transition-all">
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-stone-500">Đặt hàng</p>
            </div>

            <div className="h-1 flex-1 bg-stone-200 mx-2"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-200 text-stone-500 font-semibold mb-2 transition-all">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-stone-500">
                Theo dõi đơn hàng
              </p>
            </div>
          </div>
        </div>
        {loading && <p className="text-slate-600 italic">Đang tải...</p>}
        {error && <p className="text-red-500 italic">Lỗi: {error}</p>}

        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-6 rounded-2xl shadow-md bg-yellow-50 hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Giá:{" "}
                    <span className="font-medium text-yellow-700">
                      {item.price.toLocaleString()} VND
                    </span>
                  </p>
                  <p className="text-sm text-slate-600">
                    Số lượng:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    -
                  </button>

                  <span className="px-4 py-1 rounded-lg bg-white shadow text-slate-700">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    +
                  </button>

                  <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc muốn xóa sản phẩm này không?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
                      <Trash2 size={16} />
                    </button>
                  </Popconfirm>
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-yellow-100 flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-700">
                Tổng cộng:
              </span>
              <span className="text-2xl font-bold text-yellow-700">
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </span>
            </div>

            {/* ==== Buttons ==== */}
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleContinueShopping}
                className="flex-1 py-3 rounded-xl bg-gray-200 text-slate-700 font-semibold text-lg hover:bg-gray-300 transition"
              >
                ← Tiếp tục mua hàng
              </button>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="flex-1 py-3 rounded-xl bg-yellow-500 text-white font-semibold text-lg hover:bg-yellow-600 transition disabled:opacity-50"
              >
                {checkoutLoading ? "Đang xử lý..." : "Đặt hàng"}
              </button>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-slate-600 italic">
              Giỏ hàng trống. Hãy thêm sản phẩm!
            </p>
          )
        )}
      </div>
    </>
  );
};

export default CartPage;
