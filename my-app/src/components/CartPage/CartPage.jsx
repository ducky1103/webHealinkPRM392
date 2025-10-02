import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../HomePage/Header";
import { getAllCart } from "../../redux/User/cartApi/fetchCart/getAllCartSlice";
import { updateCartItem } from "../../redux/User/cartApi/updateCartItem/updateCartItemSlice";
import { deleteCartItem } from "../../redux/User/cartApi/deleteCartItem/deleteCartItemSlice";
import { Trash2 } from "lucide-react";
import { Popconfirm } from "antd";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);

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

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          🛒 Giỏ hàng của bạn
        </h1>

        {loading && <p className="text-slate-600 italic">Đang tải...</p>}
        {error && <p className="text-red-500 italic">Lỗi: {error}</p>}

        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-6 rounded-2xl shadow-md bg-yellow-50 hover:shadow-lg transition"
              >
                {/* Thông tin sản phẩm */}
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

                {/* Nút hành động */}
                <div className="flex items-center gap-3">
                  {/* Giảm */}
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    -
                  </button>

                  {/* Số lượng */}
                  <span className="px-4 py-1 rounded-lg bg-white shadow text-slate-700">
                    {item.quantity}
                  </span>

                  {/* Tăng */}
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    +
                  </button>

                  {/* Delete với Popconfirm */}
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

            {/* Tổng tiền */}
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
