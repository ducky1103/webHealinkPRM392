import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  Filter,
  Search,
  Calendar,
  User,
  Phone,
  X,
} from "lucide-react";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "Nguyễn Thị Mai",
      customerPhone: "0123456789",
      customerAddress: "123 Trần Hưng Đạo, Q1, TP.HCM",
      products: [
        {
          name: "Vòng tay vàng 18k",
          quantity: 1,
          price: 2500000,
          image:
            "https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
        },
        {
          name: "Vòng cổ bạc 925",
          quantity: 2,
          price: 800000,
          image:
            "https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
        },
      ],
      totalAmount: 4100000,
      status: "pending",
      orderDate: "2025-01-15",
      notes: "Khách hàng yêu cầu giao hàng vào buổi sáng",
    },
    {
      id: "ORD002",
      customerName: "Trần Văn Nam",
      customerPhone: "0987654321",
      customerAddress: "456 Nguyễn Huệ, Q1, TP.HCM",
      products: [
        {
          name: "Vòng tay kim cương",
          quantity: 1,
          price: 15000000,
          image:
            "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
        },
      ],
      totalAmount: 15000000,
      status: "confirmed",
      orderDate: "2025-01-14",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const statusConfig = {
    pending: {
      label: "Chờ xử lý",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    confirmed: {
      label: "Đã xác nhận",
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle,
    },
    shipping: {
      label: "Đang giao",
      color: "bg-purple-100 text-purple-800",
      icon: Truck,
    },
    delivered: {
      label: "Đã giao",
      color: "bg-green-100 text-green-800",
      icon: Package,
    },
    cancelled: {
      label: "Đã hủy",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      shipping: orders.filter((o) => o.status === "shipping").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Đơn Hàng
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi tất cả đơn hàng trang sức
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-lg border border-slate-200 p-4"
            >
              <div
                className={`text-2xl font-bold ${
                  statusConfig[key]?.color || "text-gray-900"
                }`}
              >
                {value}
              </div>
              <div className="text-sm text-gray-600">
                {statusConfig[key]?.label || "Tổng đơn"}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm theo tên khách hàng hoặc mã đơn..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                {Object.keys(statusConfig).map((status) => (
                  <option key={status} value={status}>
                    {statusConfig[status].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">
                              {order.customerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              {order.customerPhone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.products[0].image}
                            alt={order.products[0].name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {order.products[0].name}
                            </div>
                            {order.products.length > 1 && (
                              <div className="text-sm text-gray-500">
                                +{order.products.length - 1} sản phẩm khác
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusConfig[order.status].color
                            } border-0 cursor-pointer`}
                          >
                            {Object.keys(statusConfig).map((status) => (
                              <option key={status} value={status}>
                                {statusConfig[status].label}
                              </option>
                            ))}
                          </select>
                          <StatusIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {order.orderDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
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
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Chi tiết đơn hàng: {selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Khách hàng:</strong> {selectedOrder.customerName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Số điện thoại:</strong> {selectedOrder.customerPhone}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Địa chỉ:</strong> {selectedOrder.customerAddress}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ngày đặt:</strong> {selectedOrder.orderDate}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Ghi chú:</strong> {selectedOrder.notes || "Không có"}
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sản phẩm:
              </h3>
              <ul className="space-y-2">
                {selectedOrder.products.map((product, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Số lượng: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Giá: {formatCurrency(product.price)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                Tổng tiền: {formatCurrency(selectedOrder.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
