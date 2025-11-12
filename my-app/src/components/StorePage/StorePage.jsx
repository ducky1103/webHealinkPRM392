import { ShoppingBag } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../HomePage/Header";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../redux/User/product/fetchProduct/getAllProductSlice";
import { addToCart } from "../../redux/User/product/postProductToCart/postProductToCartSlice";

const StorePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.account);
  const { product, loading, error } = useSelector(
    (state) => state.fetchProduct
  );

  // Format giá
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để truy cập cửa hàng 🔒");
      navigate("/login");
      return;
    }
    dispatch(getAllProduct({ page: 1, size: 10 }));
  }, [dispatch, user, navigate]);

  const handleAddToCart = (item) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng 🛒");
      return;
    }

    dispatch(
      addToCart({
        productId: item.id,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <Header />

      {/* Nút xem giỏ hàng */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-end mt-20">
        <button
          onClick={() => {
            if (!user) {
              toast.error("Vui lòng đăng nhập để xem giỏ hàng 🛒");
              return;
            }
            navigate("/cart");
          }}
          className="mt-2 w-40 rounded-lg bg-amber-600 text-white py-2 hover:bg-amber-700 transition-all duration-300 flex items-center justify-center"
        >
          <ShoppingBag className="mr-2" />
          Xem giỏ hàng
        </button>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          Cửa hàng vòng tay
        </h1>

        {loading && <p>Đang tải sản phẩm...</p>}
        {error && <p className="text-red-500">Lỗi: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {product?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between h-full p-4 border rounded-lg shadow-sm 
             hover:shadow-md transition-all duration-300 bg-amber-100 hover:scale-105"
            >
              {/* Phần trên: ảnh + tiêu đề */}
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <h3
                  className="text-lg font-semibold text-slate-800 line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors duration-200"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  {item.name}
                </h3>
              </div>

              {/* Phần dưới: giá + nút */}
              <div className="mt-4">
                <p className="text-sm text-slate-600 mb-3">
                  Giá:{" "}
                  <span className="font-medium">
                    {formatPrice(item.price)} VND
                  </span>
                </p>

                {/* 👉 Nút Thêm vào giỏ — kéo dài toàn chiều ngang */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full rounded-md bg-amber-500 text-white py-2 text-sm font-medium shadow-sm 
                 hover:bg-amber-600 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  Thêm vào giỏ
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
