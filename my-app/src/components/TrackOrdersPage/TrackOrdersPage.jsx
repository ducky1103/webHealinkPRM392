import React, { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Header from "../HomePage/Header";

const TrackOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(0);

  const mockOrders = [
    {
      id: "VT2025001",
      product: "Vòng Tay Bạc Sterling 925 Hình Lá",
      image:
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "1.250.000 VNĐ",
      orderDate: "15/01/2025",
      estimatedDelivery: "20/01/2025",
      status: "shipping",
      trackingNumber: "VN123456789",
      timeline: [
        {
          status: "confirmed",
          title: "Xác nhận đơn hàng",
          description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
          time: "15/01/2025 14:30",
          completed: true,
        },
        {
          status: "preparing",
          title: "Đang chuẩn bị hàng",
          description: "Sản phẩm đang được đóng gói cẩn thận",
          time: "16/01/2025 09:15",
          completed: true,
        },
        {
          status: "shipping",
          title: "Đang vận chuyển",
          description: "Đơn hàng đã được giao cho đơn vị vận chuyển",
          time: "17/01/2025 16:20",
          completed: true,
          current: true,
        },
        {
          status: "delivered",
          title: "Đã giao hàng",
          description: "Đơn hàng đã được giao thành công",
          time: "Dự kiến 20/01/2025",
          completed: false,
        },
      ],
      shippingAddress: {
        name: "Nguyễn Văn An",
        phone: "0912 345 678",
        address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      },
    },
    {
      id: "VT2025002",
      product: "Vòng Tay Đá Mặt Trăng Xanh",
      image:
        "https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "850.000 VNĐ",
      orderDate: "10/01/2025",
      estimatedDelivery: "18/01/2025",
      status: "delivered",
      trackingNumber: "VN987654321",
      timeline: [
        {
          status: "confirmed",
          title: "Xác nhận đơn hàng",
          description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
          time: "10/01/2025 10:20",
          completed: true,
        },
        {
          status: "preparing",
          title: "Đang chuẩn bị hàng",
          description: "Sản phẩm đang được đóng gói cẩn thận",
          time: "11/01/2025 08:45",
          completed: true,
        },
        {
          status: "shipping",
          title: "Đang vận chuyển",
          description: "Đơn hàng đã được giao cho đơn vị vận chuyển",
          time: "12/01/2025 14:10",
          completed: true,
        },
        {
          status: "delivered",
          title: "Đã giao hàng",
          description: "Đơn hàng đã được giao thành công",
          time: "18/01/2025 15:30",
          completed: true,
          current: true,
        },
      ],
      shippingAddress: {
        name: "Trần Thị Bình",
        phone: "0987 654 321",
        address: "456 Đường Nguyễn Huệ, Phường Đa Kao, Quận 1, TP.HCM",
      },
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "preparing":
        return Package;
      case "shipping":
        return Truck;
      case "delivered":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (completed, current) => {
    if (current) return "bg-amber-600 border-amber-600";
    if (completed) return "bg-green-600 border-green-600";
    return "bg-stone-300 border-stone-300";
  };

  const order = mockOrders[selectedOrder];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-800 mb-2">
              Theo dõi đơn hàng
            </h1>
            <p className="text-stone-600 text-lg">
              Xem trạng thái và chi tiết các đơn hàng của bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">
                  Danh sách đơn hàng
                </h2>
                <div className="space-y-3">
                  {mockOrders.map((orderItem, index) => (
                    <div
                      key={orderItem.id}
                      onClick={() => setSelectedOrder(index)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedOrder === index
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={orderItem.image}
                          alt={orderItem.product}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-stone-800 truncate">
                            {orderItem.id}
                          </p>
                          <p className="text-sm text-stone-600 truncate">
                            {orderItem.product}
                          </p>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                orderItem.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : orderItem.status === "shipping"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {orderItem.status === "delivered"
                                ? "Đã giao"
                                : orderItem.status === "shipping"
                                ? "Đang giao"
                                : "Đang xử lý"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-lg">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-stone-800 mb-1">
                      Đơn hàng #{order.id}
                    </h2>
                    <p className="text-stone-600">
                      Đặt hàng ngày {order.orderDate}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="flex items-center space-x-2 text-stone-700">
                      <Truck className="w-5 h-5" />
                      <span className="font-medium">
                        Mã vận đơn: {order.trackingNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl p-6 mb-8">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">
                        {order.product}
                      </h3>
                      <p className="text-2xl font-bold text-amber-700 mb-2">
                        {order.price}
                      </p>
                      <div className="flex items-center text-stone-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          Dự kiến giao hàng: {order.estimatedDelivery}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-stone-800 mb-6">
                    Trạng thái đơn hàng
                  </h3>
                  <div className="space-y-6">
                    {order.timeline.map((step, index) => {
                      const IconComponent = getStatusIcon(step.status);
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${getStatusColor(
                                step.completed,
                                step.current || false
                              )}`}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`p-4 rounded-xl border transition-all duration-200 ${
                                step.current
                                  ? "border-amber-300 bg-amber-50 shadow-md"
                                  : step.completed
                                  ? "border-green-200 bg-green-50"
                                  : "border-stone-200 bg-stone-50"
                              }`}
                            >
                              <h4
                                className={`font-semibold text-lg ${
                                  step.current || step.completed
                                    ? "text-stone-800"
                                    : "text-stone-500"
                                }`}
                              >
                                {step.title}
                              </h4>
                              <p
                                className={`text-sm mb-2 ${
                                  step.current || step.completed
                                    ? "text-stone-600"
                                    : "text-stone-400"
                                }`}
                              >
                                {step.description}
                              </p>
                              <p
                                className={`text-sm font-medium ${
                                  step.current
                                    ? "text-amber-700"
                                    : step.completed
                                    ? "text-green-700"
                                    : "text-stone-400"
                                }`}
                              >
                                {step.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-xl p-6 border border-stone-200">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                      Địa chỉ giao hàng
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-stone-700">
                        <User className="w-4 h-4 mr-3 text-stone-500" />
                        <span className="font-medium">
                          {order.shippingAddress.name}
                        </span>
                      </div>
                      <div className="flex items-center text-stone-700">
                        <Phone className="w-4 h-4 mr-3 text-stone-500" />
                        <span>{order.shippingAddress.phone}</span>
                      </div>
                      <div className="flex items-start text-stone-700">
                        <MapPin className="w-4 h-4 mr-3 mt-0.5 text-stone-500" />
                        <span className="leading-relaxed">
                          {order.shippingAddress.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-stone-200">
                    <h3 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-amber-600" />
                      Thông tin vận chuyển
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-stone-600">
                          Đơn vị vận chuyển:
                        </span>
                        <span className="font-medium text-stone-800">
                          Giao Hàng Nhanh
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Phí vận chuyển:</span>
                        <span className="font-medium text-stone-800">
                          Miễn phí
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">
                          Thời gian dự kiến:
                        </span>
                        <span className="font-medium text-stone-800">
                          2-3 ngày làm việc
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Trọng lượng:</span>
                        <span className="font-medium text-stone-800">
                          0.2 kg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrdersPage;
