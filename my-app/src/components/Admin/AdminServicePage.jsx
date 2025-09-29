import React, { useState } from "react";
import {
  Star,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  Trash2,
  Edit3,
} from "lucide-react";

const mockServices = [
  {
    id: 1,
    name: "FREEMIUM",
    price: 0,
    description: "Truy cập cảm hứng",
    features: [
      "Nghe postcards",
      "Không quảng cáo",
      "Flashcard to postcards",
      "Viết thư - nhật ký cảm xúc",
    ],
    users: 1250,
    revenue: 0,
    status: "Đang hoạt động",
    nextRenewal: "15/10/2024",
    isPopular: false,
    badge: "Free",
  },
  {
    id: 2,
    name: "PREMIUM INDIVIDUALS",
    price: 59000,
    description: "59.000 VND/Tháng",
    features: [
      "Nghe postcards",
      "Không quảng cáo",
      "Flashcard to postcards",
      "Viết thư - nhật ký cảm xúc",
      "Đăng tải postcard cá nhân",
    ],
    users: 892,
    revenue: 52628000,
    status: "Đang hoạt động",
    nextRenewal: "28/11/2024",
    isPopular: true,
    badge: "Hot Deal",
  },
  {
    id: 3,
    name: "PREMIUM CHANNEL",
    price: 89000,
    description: "89.000 VND/Tháng",
    features: [
      "Nghe postcards",
      "Không quảng cáo",
      "Flashcard to postcards",
      "Viết thư - nhật ký cảm xúc",
      "Đăng tải postcard cá nhân",
      "Đăng tải postcard cho kênh",
    ],
    users: 456,
    revenue: 40584000,
    status: "Đang hoạt động",
    nextRenewal: "28/11/2024",
    isPopular: false,
    badge: null,
  },
];

const AdminServicePage = () => {
  const [services, setServices] = useState(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    description: "",
    features: [],
    users: 0,
    revenue: 0,
    status: "Đang hoạt động",
    nextRenewal: "",
  });

  const handleAddService = () => {
    setServices([...services, { ...newService, id: services.length + 1 }]);
    setIsModalOpen(false);
    setNewService({
      name: "",
      price: 0,
      description: "",
      features: [],
      users: 0,
      revenue: 0,
      status: "Đang hoạt động",
      nextRenewal: "",
    });
  };

  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Quản lý Gói Premium
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Theo dõi và quản lý các gói dịch vụ premium của bạn
          </p>
        </div>

        {/* Add Service Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm gói dịch vụ</span>
          </button>
        </div>

        {/* Service Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative flex flex-col h-full gap-5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl border-2 border-amber-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Badge */}
              {service.badge && (
                <div
                  className={`absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-bold text-white ${
                    service.badge === "Hot Deal" ? "bg-red-500" : "bg-amber-600"
                  }`}
                >
                  {service.badge}
                </div>
              )}

              {/* Popular Star */}
              {service.isPopular && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-yellow-800 fill-current" />
                </div>
              )}

              {/* Service Header */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-amber-700 font-medium">
                  {service.description}
                </p>
                {service.price > 0 && (
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-amber-900">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-amber-700 ml-1">VND</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-amber-800"
                    >
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Info */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-700">Thông tin gói:</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Trạng thái:</span>
                  <span className="font-medium text-green-700">
                    {service.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Ngày gia hạn:</span>
                  <span className="font-medium text-amber-800">
                    {service.nextRenewal}
                  </span>
                </div>
              </div>

              <div className="mt-auto flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-200 text-sm">
                  Chi tiết gói
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Adding Service */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col    ">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Thêm gói dịch vụ mới
              </h2>

              <div className="space-y-4 ">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Tên gói dịch vụ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên gói dịch vụ"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                    className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Giá (VND)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    placeholder="Nhập mô tả gói dịch vụ"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Ngày gia hạn tiếp theo
                  </label>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={newService.nextRenewal}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        nextRenewal: e.target.value,
                      })
                    }
                    className="w-full p-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleAddService}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                >
                  Thêm gói dịch vụ
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServicePage;
