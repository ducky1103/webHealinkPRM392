import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ArrowLeft, ShoppingBag, Star } from "lucide-react";
import Header from "../HomePage/Header";
import { fetchProductDetail } from "../../redux/User/product/fetchProductDetail/fetchProductDetailSlice";
import { addToCart } from "../../redux/User/product/postProductToCart/postProductToCartSlice";
import { fetchAllCommentByProduct } from "../../redux/User/comment_rating/fetchCommentByProduct/fetchAllCommentByProductSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.account);
  const { productDetail, loading, error } = useSelector(
    (state) => state.fetchProductDetail
  );
  const { fetchCommnetProduct } = useSelector(
    (state) => state.fetchAllCommentByProduct
  );

  // Format giá
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Gọi API lấy chi tiết + comment
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
      dispatch(fetchAllCommentByProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng 🛒");
      return;
    }

    if (!productDetail) {
      toast.error("Không thể thêm sản phẩm vào giỏ hàng");
      return;
    }

    dispatch(
      addToCart({
        productId: productDetail.id,
        quantity: 1,
      })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng! 🛒");
  };

  const handleBackToStore = () => {
    navigate("/store");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center h-64 text-lg text-slate-600">
          Đang tải chi tiết sản phẩm...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center h-64 text-lg text-red-500">
          Lỗi: {error}
        </div>
      </>
    );
  }

  if (!productDetail) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center h-64 text-lg text-slate-600">
          Không tìm thấy sản phẩm
        </div>
      </>
    );
  }

  // 👉 Tính điểm trung bình sao
  const averageStar =
    fetchCommnetProduct && fetchCommnetProduct.length > 0
      ? (
          fetchCommnetProduct.reduce((sum, c) => sum + c.star, 0) /
          fetchCommnetProduct.length
        ).toFixed(1)
      : 0;

  return (
    <>
      <Header />

      {/* Nút quay lại */}
      <div className="max-w-7xl mx-auto px-4 py-6 mt-20">
        <button
          onClick={handleBackToStore}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2" size={20} />
          Quay lại cửa hàng
        </button>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ảnh */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={productDetail.imageUrl}
                alt={productDetail.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Thông tin */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {productDetail.name}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {productDetail.description}
              </p>
            </div>

            {/* Giá */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {formatPrice(productDetail.price)} VND
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Còn lại: {productDetail.stockQuantity} sản phẩm
              </div>
            </div>

            {/* Trạng thái */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-slate-600">Trạng thái:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    productDetail.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {productDetail.active ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-slate-600">Ngày tạo:</span>
                <span className="text-slate-800">
                  {new Date(productDetail.createdAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-slate-600">Cập nhật lần cuối:</span>
                <span className="text-slate-800">
                  {new Date(productDetail.updatedAt).toLocaleDateString(
                    "vi-VN"
                  )}
                </span>
              </div>
            </div>

            {/* Nút giỏ hàng */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={
                  !productDetail.active || productDetail.stockQuantity === 0
                }
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center ${
                  !productDetail.active || productDetail.stockQuantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 hover:shadow-lg hover:scale-105"
                }`}
              >
                <ShoppingBag className="mr-2" size={20} />
                {!productDetail.active || productDetail.stockQuantity === 0
                  ? "Sản phẩm không khả dụng"
                  : "Thêm vào giỏ hàng"}
              </button>

              {user && (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full py-2 px-6 rounded-lg font-medium text-amber-600 border-2 border-amber-500 hover:bg-amber-50 transition-all duration-300"
                >
                  Xem giỏ hàng
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ===================== PHẦN HIỂN THỊ COMMENT ===================== */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
            <Star className="text-yellow-500 mr-2" size={24} />
            Đánh giá sản phẩm
          </h2>

          {/* Hiển thị trung bình sao */}
          <div className="flex items-center mb-6">
            <span className="text-3xl font-semibold text-amber-600 mr-2">
              {averageStar}
            </span>
            <span className="text-slate-600">
              / 5 ⭐ ({fetchCommnetProduct?.length || 0} lượt đánh giá)
            </span>
          </div>

          {/* Danh sách bình luận */}
          {fetchCommnetProduct && fetchCommnetProduct.length > 0 ? (
            <div className="space-y-6">
              {fetchCommnetProduct.map((c) => (
                <div
                  key={c.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-800">
                      {c.user.fullName}
                    </span>
                    <span className="text-yellow-500 flex items-center">
                      {"⭐".repeat(Math.round(c.star))}{" "}
                      <span className="text-slate-500 ml-1 text-sm">
                        ({c.star})
                      </span>
                    </span>
                  </div>
                  <p className="text-slate-700">{c.comment}</p>
                  <div className="text-sm text-slate-500 mt-2">
                    {new Date(c.dateCreated).toLocaleString("vi-VN")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 italic">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
