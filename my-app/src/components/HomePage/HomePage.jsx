import micro from "../../img/micro.png";
import Footer from "./Footer";
import img1 from "../../img/1.jpg";
import img2 from "../../img/2.jpg";
import img3 from "../../img/3.jpg";
import img6 from "../../img/6.jpg";
import Header from "./Header";
import HealingLetter from "../HealingLetter/HealingLetter";
import HeroCarousel from "../Home/HeroCarousel";
import ChatAI from "../Chat/ChatAI";
const HomePage = () => {
  return (
    <div className="text-slate-800">
      <HealingLetter />
      {/* Header */}
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden h-[790px]">
        <div className="absolute inset-0 animate-fadeIn">
          <img
            src={micro}
            alt="Studio microphone"
            className="h-full w-full object-cover scale-105 bg-white aanimate-slowZoom"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 text-white">
          <p className="max-w-2xl text-3xl md:text-5xl font-extrabold leading-tight animate-fadeUp mt-[300px]">
            Nuôi dưỡng tâm hồn bằng cảm hứng mỗi ngày
          </p>
          <div className="mt-6 animate-fadeUp delay-300">
            <a
              href="/podcast"
              className="inline-flex items-center rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 font-semibold shadow-lg transition-all duration-500 hover:scale-105"
            >
              Nghe ngay
            </a>
          </div>
        </div>
      </section>

      {/* Pills */}
      <section className="bg-amber-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Chữa lành không có nghĩa là quên đi, mà là học cách mỉm cười sau những tổn thương.",
            "Hãy tử tế với chính mình, bạn cũng xứng đáng được yêu thương.",
            "Chậm lại một chút để lắng nghe trái tim – đó cũng là một cách chữa lành.",
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-amber-200 text-amber-900 font-semibold text-center py-3 transition-all duration-500 hover:scale-105 hover:shadow-md"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="bg-amber-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h3 className="text-center text-lg md:text-xl font-semibold animate-fadeUp">
            Tham gia cộng đồng Healink và kết nối với những người đồng hành
          </h3>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-video rounded-2xl bg-amber-300/60 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <img src={img1} className="object-contain h-[300px] w-full" />
            </div>
            <div className="aspect-video rounded-2xl bg-amber-300/60 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <img src={img3} className="object-contain h-[300px] w-full" />
            </div>
            <div className="aspect-video rounded-2xl bg-amber-300/60 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <img src={img6} className="object-contain h-[300px] w-full" />
            </div>
            <div className="aspect-video rounded-2xl bg-amber-300/60 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-xl">
              {" "}
              <img src={img2} className="object-contain h-[300px] w-full" />
            </div>
          </div>
        </div>
      </section>

      <HeroCarousel />
      {/* Pricing */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h3 className="text-center text-xl font-semibold animate-fadeUp">
            Chọn gói đăng ký của bạn
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "FREEMIUM",
                desc: "Truy cập cảm hứng",
                btn: "Free",
                highlight: false,
              },
              {
                title: "PREMIUM INDIVIDUALS",
                desc: "59.000 VND/Tháng",
                btn: "Nhận ưu đãi",
                highlight: true,
              },
              {
                title: "PREMIUM CHANNEL",
                desc: "89.000 VND/Tháng",
                btn: "Nhận ưu đãi",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`flex flex-col rounded-2xl p-6 shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  plan.highlight
                    ? "relative border border-amber-300 bg-amber-50 ring-1 ring-amber-200"
                    : "border border-slate-200 bg-white"
                }`}
              >
                <h4 className="text-sm font-bold tracking-wider">
                  {plan.title}
                </h4>
                <p className="text-slate-600">{plan.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>Nghe podcast</li>
                  <li>Không quảng cáo</li>
                  <li>Bookmark tập podcast</li>
                  <li>Viết nhật ký - ghi cảm xúc</li>
                  {plan.title !== "FREEMIUM" && (
                    <li>Đóng góp podcast cá nhân</li>
                  )}
                  {plan.title === "PREMIUM CHANNEL" && (
                    <li>Đăng tải podcast cho kênh</li>
                  )}
                </ul>

                {/* đẩy button xuống cuối */}
                <div className="mt-auto pt-10">
                  <button
                    className={`w-full rounded-xl px-4 py-2 font-semibold transition-all duration-500 hover:scale-105 ${
                      plan.highlight
                        ? "bg-amber-600 text-white hover:bg-amber-700"
                        : "border border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {plan.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ChatAI />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
