import React from "react";
import { XCircle, RotateCcw, Home } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cancelPayment } from "../../redux/User/cancelPayment/cancelPaymentSlice"; // đường dẫn tùy project
import { Spin } from "antd";

export default function PaymentCancel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("orderCode"); // lấy từ URL
  const { loading } = useSelector((state) => state.cancelPayos);

  const handleCancel = () => {
    if (!transactionId) return;
    dispatch(cancelPayment(transactionId));
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
        <XCircle className="text-red-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thanh toán thất bại ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Giao dịch chưa được hoàn tất hoặc đã bị hủy. Bạn có muốn chắc chắn hủy
          giao dịch này không?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
          >
            {loading ? (
              <Spin size="small" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
            Xác nhận hủy
          </button>

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
