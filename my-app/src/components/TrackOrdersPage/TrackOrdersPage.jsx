"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  CreditCard,
  FileCheck,
  PackageCheck,
  Home,
  ShoppingCart,
} from "lucide-react";
import Header from "../HomePage/Header";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Alert } from "antd";
import { getOrderUser } from "../../redux/User/order/fetchOrderByUser/getAllOrderByUserSlice";
import { updateStatusOrder } from "../../redux/User/order/updateStatusOrder/updateStatusOrderSlice";
import { createComment } from "../../redux/User/comment_rating/create_comment/createCommentSlice";
import { fetchAllCommentByUser } from "../../redux/User/comment_rating/fetchAllCommentByUser/fetchAllCommentByUserSlice";
import { toast } from "react-toastify";

export default function TrackOrdersPage() {
  const dispatch = useDispatch();
  const { orderUser, loading, error } = useSelector((state) => state.orderUser);
  const { fetchCommentUser } = useSelector(
    (state) => state.fetchAllCommentByUser
  );
  const user = useSelector((state) => state.account.user);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrderUser({ userId: user.id, page: 1, size: 200 }));
      dispatch(fetchAllCommentByUser(user.id)); // 👈 thêm dòng này
    }
  }, [dispatch, user]);

  const getOrderStep = (status) => {
    const statusMap = {
      paid: 0,
      confirmed: 1,
      processing: 2,
      shipped: 3,
      delivered: 4,
      received: 5,
      completed: 6,
    };
    return statusMap[status?.toLowerCase()] ?? 0;
  };

  const orderSteps = [
    {
      title: "Đã thanh toán",
      icon: <CreditCard className="w-5 h-5" />,
      status: "paid",
      description: "Đơn hàng đã được thanh toán",
    },
    {
      title: "Đã xác nhận",
      icon: <FileCheck className="w-5 h-5" />,
      status: "confirmed",
      description: "Đơn hàng đã được xác nhận",
    },
    {
      title: "Đang xử lý",
      icon: <Package className="w-5 h-5" />,
      status: "processing",
      description: "Đang chuẩn bị hàng",
    },
    {
      title: "Đang giao",
      icon: <Truck className="w-5 h-5" />,
      status: "shipped",
      description: "Đang trên đường giao",
    },
    {
      title: "Đã giao",
      icon: <Home className="w-5 h-5" />,
      status: "delivered",
      description: "Đã giao đến địa chỉ",
    },
    {
      title: "Đã nhận",
      icon: <PackageCheck className="w-5 h-5" />,
      status: "received",
      description: "Khách hàng đã nhận",
    },
    {
      title: "Hoàn thành",
      icon: <CheckCircle className="w-5 h-5" />,
      status: "completed",
      description: "Đơn hàng hoàn tất",
    },
  ];

  // ✅ Khi user nhấn “Đã nhận hàng”
  const handleConfirmReceived = async (orderId) => {
    await dispatch(
      updateStatusOrder({ id: orderId, status: "RECEIVED", userId: user.id })
    );

    if (user?.id) {
      dispatch(getOrderUser({ userId: user.id, page: 1, size: 40 }));
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-stone-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-stone-50 p-4">
        <Alert
          message="Lỗi tải đơn hàng"
          description={error}
          type="error"
          showIcon
          className="max-w-md"
        />
      </div>
    );

  if (!orderUser?.content?.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <ShoppingCart className="w-24 h-24 text-stone-300 mb-4" />
          <p className="text-stone-600 text-xl font-medium">
            Bạn chưa có đơn hàng nào.
          </p>
          <p className="text-stone-500 text-sm mt-2">
            Hãy đặt hàng để theo dõi tại đây
          </p>
        </div>
      </div>
    );

  const orders = orderUser.content.filter((order) =>
    [
      "paid",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "received",
      "completed",
    ].includes(order.status?.toLowerCase())
  );

  if (orders.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Package className="w-24 h-24 text-stone-300 mb-4" />
          <p className="text-stone-600 text-xl font-medium">
            Bạn chưa có đơn hàng nào đã thanh toán.
          </p>
        </div>
      </div>
    );

  const selected = orders[selectedOrder];

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "paid":
        return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white";
      case "confirmed":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "processing":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      case "shipped":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "pending":
        return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white";
      case "received":
        return "bg-gradient-to-r from-green-400 to-emerald-400 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-slate-400 text-white";
    }
  };

  const handleSubmitReview = (productId) => {
    const review = reviewData[productId];
    if (!review?.star || !review?.comment) {
      toast.warn("Vui lòng chọn số sao và nhập bình luận!");
      return;
    }

    const payload = {
      productId,
      comment: review.comment,
      star: review.star,
    };

    dispatch(createComment(payload));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Theo dõi đơn hàng
          </h1>
          <p className="text-stone-600">
            Xem chi tiết và trạng thái đơn hàng của bạn
          </p>
        </div>

        {/* Progress Bar Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-200 text-stone-500 font-semibold mb-2 transition-all">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-stone-500">Giỏ hàng</p>
            </div>

            <div className="h-1 flex-1 bg-stone-200 mx-2"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-200 text-stone-500 font-semibold mb-2 transition-all">
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-stone-500">Đặt hàng</p>
            </div>

            <div className="h-1 flex-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-2"></div>

            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold mb-2 shadow-lg transition-all">
                <Package className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-amber-600">
                Theo dõi đơn hàng
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                <h2 className="text-xl font-bold text-white">
                  Đơn hàng của bạn
                </h2>
                <p className="text-amber-100 text-sm mt-1">
                  {orders.length} đơn đã thanh toán
                </p>
              </div>

              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {orders.map((order, index) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(index)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedOrder === index
                        ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md scale-[1.02]"
                        : "border-stone-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            order.items[0]?.product?.imageUrl ||
                            "/placeholder.svg"
                          }
                          alt={order.items[0]?.product?.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        {order.items.length > 1 && (
                          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {order.items.length}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-800 text-sm">
                          #{order.id}
                        </p>
                        <p className="text-xs text-stone-600 truncate mt-0.5">
                          {order.items[0]?.product?.name}
                        </p>
                        <p className="text-xs text-amber-700 font-semibold mt-1">
                          {order.totalAmount.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Detail */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-1">
                    Đơn hàng #{selected.id}
                  </h2>
                  <p className="text-stone-600 text-sm mb-1">
                    Ngày tạo:{" "}
                    <span className="font-medium text-stone-700">
                      {new Date(selected.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </p>

                  {/* 💡 Địa chỉ giao hàng */}
                  <div className="flex items-start gap-2 mt-2">
                    <span className="text-stone-500 text-sm mt-0.5">📍</span>
                    <div>
                      <p className="text-stone-600 text-sm font-medium">
                        Địa chỉ giao hàng:
                      </p>
                      <p className="text-stone-800 text-sm bg-stone-100 rounded-lg px-3 py-2 mt-1 inline-block shadow-inner">
                        {selected.address || "Chưa có địa chỉ"}
                      </p>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg ${getStatusBadge(
                    selected.status
                  )}`}
                >
                  {selected.status}
                </span>
              </div>

              {/* Order Items */}
              {selected.items.map((item) => {
                const userComments = fetchCommentUser.filter(
                  (c) => c.product.id === item.product.id
                );

                return (
                  <div
                    key={item.id}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100 mb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-800 mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-stone-600 text-sm">
                          Số lượng:{" "}
                          <span className="font-semibold">{item.quantity}</span>
                        </p>
                        <p className="text-amber-700 font-bold mt-1">
                          {item.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                    </div>

                    {/* Nếu đã đánh giá thì hiển thị lại comment */}
                    {userComments.length > 0 ? (
                      <div className="mt-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <h4 className="text-stone-800 font-semibold mb-2">
                          Các đánh giá của bạn
                        </h4>

                        {userComments.map((c) => (
                          <div
                            key={c.id}
                            className="border-b border-stone-200 pb-3 mb-3 last:border-none last:pb-0 last:mb-0"
                          >
                            <div className="flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-5 h-5 ${
                                    c.star >= star
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-stone-300"
                                  }`}
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 .587l3.668 7.57L24 9.423l-6 5.857 1.416 8.26L12 18.896l-7.416 4.644L6 15.28 0 9.423l8.332-1.266z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-stone-700 text-sm italic">
                              “{c.comment}”
                            </p>
                            <p className="text-xs text-stone-500 mt-2">
                              {new Date(c.dateCreated).toLocaleString("vi-VN")}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Nếu chưa đánh giá và đơn hàng đã hoàn thành thì cho phép đánh giá
                      selected.status?.toLowerCase() === "completed" && (
                        <div className="mt-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                          <h4 className="text-stone-800 font-semibold mb-2">
                            Đánh giá sản phẩm
                          </h4>

                          {/* ⭐ Rating Stars */}
                          <div className="flex gap-2 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() =>
                                  setReviewData((prev) => ({
                                    ...prev,
                                    [item.product.id]: {
                                      ...prev[item.product.id],
                                      star,
                                    },
                                  }))
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`w-6 h-6 transition-all ${
                                    (reviewData[item.product.id]?.star || 0) >=
                                    star
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-stone-300"
                                  }`}
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 .587l3.668 7.57L24 9.423l-6 5.857 1.416 8.26L12 18.896l-7.416 4.644L6 15.28 0 9.423l8.332-1.266z" />
                                </svg>
                              </button>
                            ))}
                          </div>

                          <textarea
                            rows="3"
                            placeholder="Nhập cảm nhận của bạn..."
                            className="w-full border border-stone-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                            value={reviewData[item.product.id]?.comment || ""}
                            onChange={(e) =>
                              setReviewData((prev) => ({
                                ...prev,
                                [item.product.id]: {
                                  ...prev[item.product.id],
                                  comment: e.target.value,
                                },
                              }))
                            }
                          />

                          <button
                            onClick={() => handleSubmitReview(item.product.id)}
                            className="mt-3 px-5 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-all"
                          >
                            Gửi đánh giá
                          </button>
                        </div>
                      )
                    )}
                  </div>
                );
              })}
              {/* ✅ Hiển thị nút “Đã nhận hàng” khi status = DELIVERED */}
              {selected.status?.toUpperCase() === "DELIVERED" &&
                (console.log("id", selected.id),
                (
                  <div className="mt-6 text-right">
                    <button
                      onClick={() => handleConfirmReceived(selected.id)}
                      className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                      Đã nhận hàng
                    </button>
                  </div>
                ))}

              <div className="mt-6 pt-6 border-t-2 border-stone-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-stone-700">
                    Tổng cộng:
                  </span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {selected.totalAmount.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-amber-600" />
                Trạng thái đơn hàng
              </h3>

              {/* Desktop Timeline */}
              <div className="hidden md:block">
                <div className="relative">
                  {orderSteps.map((step, index) => {
                    const currentIndex = getOrderStep(selected.status);
                    const isCompleted =
                      selected.status?.toLowerCase() === "completed";
                    const isDone = isCompleted ? true : index < currentIndex;
                    const isCurrent = isCompleted
                      ? false
                      : index === currentIndex;

                    return (
                      <div key={step.status} className="relative">
                        {index < orderSteps.length - 1 && (
                          <div className="absolute left-6 top-14 w-0.5 h-16 -ml-px">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isDone
                                  ? "bg-gradient-to-b from-green-500 to-emerald-500"
                                  : isCurrent
                                  ? "bg-gradient-to-b from-amber-500 to-amber-300"
                                  : "bg-stone-200"
                              }`}
                            ></div>
                          </div>
                        )}

                        <div className="flex items-start gap-4 pb-6">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isDone
                                ? "bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/50"
                                : isCurrent
                                ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50 animate-pulse"
                                : "bg-stone-100 border-2 border-stone-300"
                            }`}
                          >
                            <div
                              className={
                                isDone
                                  ? "text-white"
                                  : isCurrent
                                  ? "text-white"
                                  : "text-stone-400"
                              }
                            >
                              {step.icon}
                            </div>
                          </div>

                          <div className="flex-1 pt-2">
                            <h4
                              className={`font-bold mb-1 ${
                                isDone
                                  ? "text-green-600"
                                  : isCurrent
                                  ? "text-amber-600"
                                  : "text-stone-400"
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p
                              className={`text-sm ${
                                isDone
                                  ? "text-green-600/80"
                                  : isCurrent
                                  ? "text-amber-600/80"
                                  : "text-stone-400"
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>

                          {(isDone || isCurrent) && (
                            <div
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                isDone
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {isDone ? "✓ Hoàn thành" : "Đang xử lý"}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden space-y-4">
                {orderSteps.map((step, index) => {
                  const currentIndex = getOrderStep(selected.status);
                  const isDone = index < currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <div
                      key={step.status}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                        isDone
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
                          : isCurrent
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300"
                          : "bg-stone-50 border-2 border-stone-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isDone
                            ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                            : isCurrent
                            ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                            : "bg-stone-200 text-stone-400"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-bold text-sm ${
                            isDone
                              ? "text-green-700"
                              : isCurrent
                              ? "text-amber-700"
                              : "text-stone-500"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-stone-600 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                      {(isDone || isCurrent) && (
                        <div
                          className={`text-xs font-bold ${
                            isDone ? "text-green-600" : "text-amber-600"
                          }`}
                        >
                          {isDone ? "✓" : "•••"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
