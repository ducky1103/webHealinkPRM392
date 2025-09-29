import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../HomePage/Header";

const CheckoutPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Thanh toán</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form thông tin giao hàng */}
          <div className="p-6 border rounded-lg bg-amber-50">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Giao hàng tận nơi
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <textarea
                placeholder="Lưu ý cho shop"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </form>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="p-6 border rounded-lg bg-amber-50">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Giỏ hàng của bạn
            </h2>
            {product ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Giá: {product.price.toLocaleString()} VND
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-slate-600">
                    Tạm tính: {product.price.toLocaleString()} VND
                  </p>
                  <p className="text-sm text-slate-600">
                    Phí vận chuyển: 15,000 VND
                  </p>
                  <p className="text-sm text-slate-600">
                    Tổng cộng: {(product.price + 15000).toLocaleString()} VND
                  </p>
                </div>
                <button className="w-full rounded-lg bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition-all duration-300">
                  Thanh toán
                </button>
              </div>
            ) : (
              <p className="text-slate-600">
                Không có sản phẩm nào để thanh toán.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
