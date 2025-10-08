import React from "react";
import { XCircle, RotateCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <XCircle className="text-red-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thanh toán thất bại ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Rất tiếc, giao dịch của bạn chưa được hoàn tất hoặc đã bị hủy. Vui
          lòng thử lại hoặc kiểm tra thông tin thanh toán.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
          >
            <RotateCcw className="w-4 h-4" /> Thử lại
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 border border-red-500 text-red-600 px-5 py-2 rounded-xl hover:bg-red-50 transition"
          >
            <Home className="w-4 h-4" /> Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
