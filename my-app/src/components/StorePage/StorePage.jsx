import { ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // 🔔 import thêm

import img1 from "../../img/v1.jpg";
import img2 from "../../img/v2.webp";
import img3 from "../../img/v3.jpg";
import img4 from "../../img/v4.webp";
import img5 from "../../img/v5.jpg";
import img6 from "../../img/v6.png";
import Header from "../HomePage/Header";
import { useSelector } from "react-redux";

const mockProducts = [
  { id: 1, name: "Vòng tay gỗ", price: 150000, category: "Gỗ", image: img1 },
  { id: 2, name: "Vòng tay đá", price: 200000, category: "Đá", image: img2 },
  {
    id: 3,
    name: "Vòng tay phong thủy",
    price: 300000,
    category: "Phong thủy",
    image: img3,
  },
  {
    id: 4,
    name: "Vòng tay vang",
    price: 300000,
    category: "Phong thủy",
    image: img4,
  },
  {
    id: 5,
    name: "Vòng tay thủy",
    price: 300000,
    category: "Phong thủy",
    image: img5,
  },
  {
    id: 6,
    name: "Vòng tay phong",
    price: 300000,
    category: "Phong thủy",
    image: img6,
  },
];

const StorePage = ({ addToCart }) => {
  const navigate = useNavigate();

  // 👉 Hàm xử lý khi thêm sản phẩm
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng 🛒");
    }
    addToCart(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng 🛒`, {
      position: "top-right",
    });
  };

  const handleBuyNow = (product) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm 🛒");
      return;
    }
    navigate("/checkout", { state: { product } });
  };
  const { user } = useSelector((state) => state.account);
  return (
    <>
      <Header />
      {/* Nút xem giỏ hàng */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-end">
        <button
          onClick={() => {
            if (!user) {
              toast.error("Vui lòng đăng nhập để xem giỏ hàng 🛒");
              return;
            } else {
              navigate("/cart");
            }
          }}
          className="mt-2 w-40 rounded-lg bg-amber-600 text-white py-2 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center"
        >
          <ShoppingBag className="mr-2" />
          Xem giỏ hàng
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-slate-800 ">
          Cửa hàng vòng tay
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-amber-100 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-800">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600">
                Giá: {product.price.toLocaleString()} VND
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!user) {
                      toast.error(
                        "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng 🛒"
                      );
                      return;
                    }
                    handleAddToCart(product);
                  }}
                  className="flex-1 rounded-md bg-amber-500 text-white py-1.5 text-sm font-medium shadow-sm 
             hover:bg-amber-600 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  Thêm vào giỏ
                </button>

                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
               py-1.5 text-sm font-medium shadow-sm 
               hover:from-indigo-600 hover:to-purple-600 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StorePage;
