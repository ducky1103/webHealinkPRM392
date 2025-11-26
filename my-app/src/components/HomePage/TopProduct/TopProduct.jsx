import React from "react";
import {
  Star,
  ShoppingBag,
  Quote,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Header from "../Header";

const products = [
  {
    name: "Vòng tay chữa lành",
    img: "/Vong.png", // Đảm bảo bạn có file ảnh này trong thư mục public
    price: "25.000đ",
    desc: "Vòng tay handmade mang ý nghĩa chữa lành, kết nối và lan tỏa năng lượng tích cực.",
    rating: 4.8,
    comments: [
      {
        user: "thanosdao",
        text: "vòng đẹp á, vợ mình thích lắm (●'◡'●)",
        time: "15:31:10 13/11/2025",
      },
      {
        user: "Phạm Chung",
        text: "Vong nay deo vao cam giac rat thoai mai.",
        time: "15:23:22 13/11/2025",
      },
      {
        user: "Phương Vũ",
        text: "vòng cũng okela lắm, giản dị nhưng mà nó hay lắm á",
        time: "15:18:10 13/11/2025",
      },
      {
        user: "nguyen",
        text: "shop dễ thương, giao hàng nhanh",
        time: "15:11:14 13/11/2025",
      },
      { user: "Phuong Nguyen", text: "vòng đẹp", time: "15:02:49 13/11/2025" },
      {
        user: "Lý Huy Hoàng",
        text: "Đẹp mà còn rẻ nữa! Tuyệt vời",
        time: "14:52:09 13/11/2025",
      },
      {
        user: "Nguyễn Đình Hoàng",
        text: "Chất liệu tốt, rất ưng ý",
        time: "14:53:58 13/11/2025",
      },
    ],
    hot: true,
  },
  {
    name: "Card kết nối Healink",
    img: "/Card.png", // Đảm bảo bạn có file ảnh này trong thư mục public
    price: "15.000đ",
    desc: "Card QR kết nối cộng đồng Healink, mỗi kết nối mang theo một tia nắng nhỏ.",
    rating: 5.0,
    comments: [
      {
        user: "Việt Hoàng",
        text: "Card dễ thương quá đi mất, mình ngắm được 30 phút rồi",
        time: "13:21:53 16/11/2025",
      },
      {
        user: "Khanh",
        text: "Một cái card tuy là nhỏ xinh xắn nhưng mình thấy shop rất chu đáo và chuẩn bị kĩ lưỡng cho những người mua hàng. Mình sẽ tiếp tục ủng hộ shop trong thời gian sắp tới.",
        time: "12:59:36 16/11/2025",
      },
      {
        user: "Huỳnh Ngọc Kỳ",
        text: "Card shop đẹp và rất đậm chất phong cách riêng",
        time: "12:47:21 16/11/2025",
      },
    ],
    hot: false,
  },
];

const TopProduct = () => (
  <>
    <Header />
    <section className="bg-[#FFF8F0] py-16 px-4 md:px-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-[#B46835] font-bold tracking-wider uppercase text-sm bg-[#B46835]/10 px-3 py-1 rounded-full">
            Best Seller
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#381B08] mt-3 mb-4">
            Sản Phẩm <span className="text-[#B46835]">Yêu Thích</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những món quà nhỏ mang năng lượng chữa lành, được cộng đồng Healink
            đón nhận nồng nhiệt nhất.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {products.map((prod, idx) => (
            <div
              key={idx}
              className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border border-[#E5CFA0]/30
              ${
                prod.hot
                  ? "shadow-2xl hover:shadow-[#B46835]/20 ring-1 ring-[#B46835]/20"
                  : "shadow-xl hover:shadow-2xl"
              }
              hover:-translate-y-2 flex flex-col
            `}
            >
              {/* HOT Badge */}
              {prod.hot && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1 animate-pulse">
                  <Star size={12} fill="white" /> HOT TREND
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-72 overflow-hidden bg-[#F5E6D3]">
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-full h-full object-center object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Content Body */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Title & Price */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-[#381B08] group-hover:text-[#B46835] transition-colors">
                    {prod.name}
                  </h3>
                  <span className="text-xl font-bold text-[#B46835] bg-[#B46835]/10 px-3 py-1 rounded-lg whitespace-nowrap">
                    {prod.price}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 border-b border-dashed border-gray-200 pb-4">
                  <div className="flex items-center text-yellow-500 font-bold gap-1">
                    <Star size={16} fill="currentColor" /> {prod.rating}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag size={16} /> Đã bán {prod.sold}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                  {prod.desc}
                </p>

                {/* Comments Section (Styled nicely) */}
                <div className="bg-[#FAF9F6] rounded-2xl p-4 mb-6 flex-1 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3 text-[#B46835] font-semibold text-sm">
                    <Quote size={16} className="rotate-180" /> Feedback nổi bật
                  </div>
                  <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                    {prod.comments.map((cmt, i) => (
                      <div
                        key={i}
                        className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-sm"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-gray-800 text-xs">
                            {cmt.user}
                          </span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, starI) => (
                              <Star key={starI} size={8} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs italic">
                          "{cmt.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS nhỏ cho thanh cuộn đẹp hơn */}
      <style>{`
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #E5CFA0;
        border-radius: 10px;
      }
    `}</style>
    </section>
  </>
);

export default TopProduct;
