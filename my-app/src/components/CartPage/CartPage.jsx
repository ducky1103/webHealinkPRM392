import React, { useState } from "react";
import Header from "../HomePage/Header";

const CartPage = () => {
  // Mock data giỏ hàng ban đầu
  const [cart, setCart] = useState([
    { id: 1, name: "Vòng tay gỗ", price: 150000, quantity: 2 },
    { id: 2, name: "Vòng tay đá", price: 200000, quantity: 1 },
    { id: 3, name: "Vòng tay phong thủy", price: 300000, quantity: 3 },
  ]);

  // Hàm xóa sản phẩm
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          🛒 Giỏ hàng của bạn
        </h1>

        {cart.length > 0 ? (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-6 rounded-2xl shadow-md bg-gradient-to-r from-amber-50 to-amber-100 hover:shadow-xl transition"
              >
                {/* Thông tin sản phẩm */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    Giá:{" "}
                    <span className="font-medium text-amber-700">
                      {item.price.toLocaleString()} VND
                    </span>
                  </p>
                  <p className="text-sm text-slate-600">
                    Số lượng:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>

                {/* Nút chỉnh số lượng + xóa */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 rounded-lg bg-white shadow text-slate-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-white hover:bg-amber-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-3 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            {/* Tổng tiền */}
            <div className="p-6 rounded-2xl bg-amber-200/40 flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-700">
                Tổng cộng:
              </span>
              <span className="text-2xl font-bold text-amber-700">
                {cart
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
          <p className="text-slate-600 italic">
            Giỏ hàng trống. Hãy thêm sản phẩm nào! 😋
          </p>
        )}
      </div>
    </>
  );
};

export default CartPage;
