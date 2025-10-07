import React from "react";
import { CheckCircle2, Home, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <CheckCircle2 className="text-green-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thanh toán thành công 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã hoàn tất thanh toán. Hệ thống đã ghi nhận giao dịch của
          bạn.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
          >
            <Home className="w-4 h-4" /> Về trang chủ
          </Link>
          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 border border-green-500 text-green-600 px-5 py-2 rounded-xl hover:bg-green-50 transition"
          >
            <CreditCard className="w-4 h-4" /> Xem đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
