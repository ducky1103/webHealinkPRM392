import React, { useEffect, useState, useMemo } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  X,
  Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderUser } from "../../redux/User/order/fetchOrderByUser/getAllOrderByUserSlice";
import { getAllUser } from "../../redux/auth/admin/getUser/getAllUserSlice";
import { updateStatusOrder } from "../../redux/User/order/updateStatusOrder/updateStatusOrderSlice";
import { Spin, Alert, Tooltip } from "antd";

const STATUS_FLOW = [
  "paid",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "received",
  "completed",
  "cancelled",
];

const statusConfig = {
  paid: {
    label: "Đã thanh toán",
    color: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle,
  },
  confirmed: {
    label: "Đã xác nhận",
    color: "bg-blue-100 text-blue-800",
    icon: Check,
  },
  processing: {
    label: "Đang xử lý",
    color: "bg-amber-100 text-amber-800",
    icon: Clock,
  },
  shipped: {
    label: "Đang giao",
    color: "bg-indigo-100 text-indigo-800",
    icon: Truck,
  },
  delivered: {
    label: "Đã giao",
    color: "bg-violet-100 text-violet-800",
    icon: Package,
  },
  received: {
    label: "Đã nhận",
    color: "bg-teal-100 text-teal-800",
    icon: Package,
  },
  completed: {
    label: "Hoàn thành",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState(userId || "");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { getUser, loading: loadingUsers } = useSelector(
    (state) => state.getAllUserAdmin
  );
  const { orderUser, loading: loadingOrders } = useSelector(
    (state) => state.orderUser
  );
  const token = useSelector((state) => state.account.token);

  const PAGE = 1;
  const SIZE = 50;

  useEffect(() => {
    dispatch(getAllUser({ page: 1, size: 50 }));
  }, [dispatch]);

  useEffect(() => {
    if (!userId) {
      navigate("/Admin/orders/1", { replace: true });
      setSelectedUser("1");
    } else {
      setSelectedUser(userId);
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (token && selectedUser && !isNaN(selectedUser)) {
      dispatch(getOrderUser({ userId: selectedUser, page: PAGE, size: SIZE }));
    }
  }, [dispatch, token, selectedUser]);

  const filteredOrders = useMemo(() => {
    if (!orderUser?.content) return [];
    return orderUser.content.filter((o) =>
      STATUS_FLOW.includes(o.status?.toLowerCase())
    );
  }, [orderUser]);

  const handleSelectUser = (e) => {
    const newUserId = e.target.value;
    setSelectedUser(newUserId);
    if (newUserId) navigate(`/Admin/orders/${newUserId}`, { replace: true });
  };

  const onChangeStatus = (order, newStatus) => {
    if (!order?.id) return;
    if (order.status.toLowerCase() === "cancelled") {
      alert("Đơn hàng đã bị hủy, không thể cập nhật.");
      return;
    }
    if (
      !window.confirm(
        `Xác nhận đổi trạng thái đơn #${order.id} → ${newStatus}?`
      )
    )
      return;

    dispatch(
      updateStatusOrder({
        id: order.id,
        status: newStatus,
        userId: selectedUser,
        page: PAGE,
        size: SIZE,
      })
    );
  };

  const orderSteps = [
    {
      status: "paid",
      title: "Đã thanh toán",
      description: "Đơn hàng đã được thanh toán",
    },
    {
      status: "confirmed",
      title: "Đã xác nhận",
      description: "Đơn hàng đã được xác nhận",
    },
    {
      status: "processing",
      title: "Đang xử lý",
      description: "Đang chuẩn bị hàng",
    },
    {
      status: "shipped",
      title: "Đang giao",
      description: "Đang trên đường giao",
    },
    {
      status: "delivered",
      title: "Đã giao",
      description: "Đã giao đến địa chỉ",
    },
    {
      status: "received",
      title: "Đã nhận",
      description: "Khách hàng đã nhận hàng",
    },
    {
      status: "completed",
      title: "Hoàn thành",
      description: "Đơn hàng hoàn tất",
    },
    { status: "cancelled", title: "Đã hủy", description: "Đơn hàng đã bị hủy" },
  ];

  const getOrderStep = (status) =>
    STATUS_FLOW.indexOf(status?.toLowerCase() ?? "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-amber-200 shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-800 mb-2">
                Quản lý Đơn Hàng
              </h1>
              <p className="text-amber-700">
                Bạn có thể thay đổi trạng thái đơn hàng bằng dropdown bên dưới.
              </p>
            </div>
          </div>
        </div>

        {/* Select User */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Chọn khách hàng:
          </label>
          <select
            className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:border-amber-500 focus:ring-amber-500 text-amber-800"
            value={selectedUser}
            onChange={handleSelectUser}
            disabled={loadingUsers}
          >
            <option value="">-- Chọn khách hàng --</option>
            {getUser?.content
              ?.filter((u) => u.role === "user")
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.email})
                </option>
              ))}
          </select>
        </div>

        {/* Table Orders */}
        {!loadingOrders && filteredOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-amber-200 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <tr>
                    {[
                      "Mã đơn",
                      "Ngày đặt",
                      "Tổng tiền",
                      "Địa chỉ giao hàng",
                      "Trạng thái",
                      "Cập nhật",
                      "Thao tác",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const StatusIcon =
                      statusConfig[order.status]?.icon || Clock;
                    const isLocked = ["cancelled"].includes(
                      order.status.toLowerCase()
                    );

                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {order.id}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {order.orderDate ||
                            new Date(order.createdAt).toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-gray-900 font-semibold">
                          {formatCurrency(order.totalAmount)}
                        </td>

                        <td className="px-6 py-4 text-gray-700 max-w-[250px] truncate">
                          {order.address ? (
                            <Tooltip title={order.address} placement="topLeft">
                              <span className="cursor-pointer hover:text-blue-600">
                                {order.address}
                              </span>
                            </Tooltip>
                          ) : (
                            "Không có"
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <span
                              className={`px-3 py-1 text-xs rounded-full ${
                                statusConfig[order.status]?.color ||
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {statusConfig[order.status]?.label ||
                                order.status}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={order.status.toLowerCase()}
                            disabled={isLocked}
                            onChange={(e) =>
                              onChangeStatus(order, e.target.value)
                            }
                            className={`px-3 py-1 border rounded-md text-sm ${
                              isLocked
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white"
                            }`}
                          >
                            {STATUS_FLOW.map((s) => {
                              const currentIndex = STATUS_FLOW.indexOf(
                                order.status.toLowerCase()
                              );
                              const optionIndex = STATUS_FLOW.indexOf(s);
                              const disabledOption =
                                optionIndex < currentIndex ||
                                (s === "received" &&
                                  order.status.toLowerCase() !== "delivered") ||
                                (s === "completed" &&
                                  order.status.toLowerCase() !== "received") ||
                                (s === "cancelled" &&
                                  ["completed", "received"].includes(
                                    order.status.toLowerCase()
                                  ));
                              return (
                                <option
                                  key={s}
                                  value={s}
                                  disabled={disabledOption}
                                >
                                  {statusConfig[s]?.label || s}
                                </option>
                              );
                            })}
                          </select>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-4 py-2 text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 border border-amber-200 hover:border-amber-300 transition-colors"
                          >
                            <Eye className="w-4 h-4 inline-block mr-1" />
                            Chi tiết
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loadingOrders && filteredOrders.length === 0 && (
          <div className="text-center text-amber-600 py-12">
            <div className="space-y-4">
              <div className="text-6xl text-amber-300">📦</div>
              <h3 className="text-xl font-semibold text-amber-700">
                Khách hàng này không có đơn hàng nào
              </h3>
              <p className="text-amber-600">
                Hãy chọn khách hàng khác để xem đơn hàng
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal chi tiết */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          {/* vùng cuộn của modal */}
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">
                Chi tiết đơn hàng #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {orderSteps.map((step, idx) => {
                const currentStatus = selectedOrder.status.toLowerCase();
                const isCancelled = currentStatus === "cancelled";
                const isCompleted = currentStatus === "completed";
                const currentIndex = getOrderStep(currentStatus);
                const done =
                  isCompleted || (!isCancelled && idx < currentIndex);
                const active =
                  !isCompleted && !isCancelled && idx === currentIndex;

                if (isCancelled && step.status !== "cancelled") return null;

                return (
                  <div key={step.status} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          isCancelled
                            ? "bg-red-500 text-white"
                            : done
                            ? "bg-green-500 text-white"
                            : active
                            ? "bg-amber-500 text-white animate-pulse"
                            : "bg-stone-100 text-stone-400"
                        }`}
                      >
                        {isCancelled ? (
                          <XCircle className="w-5 h-5" />
                        ) : done ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {idx < orderSteps.length - 1 && (
                        <div
                          className={`w-px h-8 ${
                            done ? "bg-green-400" : "bg-stone-200"
                          } mt-1`}
                        ></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold ${
                          isCancelled
                            ? "text-red-600"
                            : done
                            ? "text-green-700"
                            : active
                            ? "text-amber-700"
                            : "text-stone-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`text-sm ${
                          isCancelled
                            ? "text-red-500"
                            : done
                            ? "text-green-600"
                            : active
                            ? "text-amber-600"
                            : "text-stone-400"
                        }`}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 border border-amber-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
