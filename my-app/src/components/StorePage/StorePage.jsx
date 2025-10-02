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

  useEffect(() => {
    dispatch(getAllProduct({ page: 1, size: 10 }));
  }, [dispatch]);

  const handleAddToCart = (item) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng 🛒");
      return;
    }

    // 👉 dispatch đến saga (payload theo API backend)
    dispatch(
      addToCart({
        productId: item.id,
        quantity: 1, // mặc định thêm 1 sp
      })
    );
  };

  const handleBuyNow = (item) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm 🛒");
      return;
    }
    navigate("/checkout", { state: { product: item } });
  };

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
          {product?.content?.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-amber-100 hover:scale-105"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-800">
                {item.name}
              </h3>
              <p className="text-sm text-slate-600">Giá: {item.price} VND</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 rounded-md bg-amber-500 text-white py-1.5 text-sm font-medium shadow-sm 
                    hover:bg-amber-600 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  Thêm vào giỏ
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
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
