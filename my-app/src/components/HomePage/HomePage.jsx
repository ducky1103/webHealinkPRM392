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
import img28 from "../../img/28.jpg";
import img29 from "../../img/29.jpg";
import img30 from "../../img/30.jpg";
import img31 from "../../img/31.jpg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Flashcard from "./Flashcard/Flashcard";
const HomePage = () => {
  return (
    <div className="text-slate-800">
      <HealingLetter />
      {/* Header */}
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden h-[790px] mt-[65px]">
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

      <section className="relative bg-gradient-to-br from-[#FFF9F3] to-[#FFEFD8] py-32 px-6 md:px-24 overflow-hidden">
        {/* 🌸 Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,220,180,0.3),transparent_70%)] pointer-events-none"></div>

        {/* 🌿 Animation Center */}
        <div className="flex justify-center mb-24">
          <DotLottieReact
            src="/animations/Male radio host interviewing female guest on radio.json"
            loop
            autoplay
            className="w-full max-w-5xl scale-100 hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
          />
        </div>

        {/* 🌸 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-10xl mx-auto">
          {[
            {
              img: img28,
              title: "Tự Nhiên & Tinh Tế",
              desc: "Như một buổi sáng trong khu vườn nhỏ – nơi mọi ý tưởng được ươm mầm bằng sự bình yên và ánh nắng nhẹ.",
            },
            {
              img: img29,
              title: "Tùy Biến Dễ Dàng",
              desc: "Tự do tạo nên không gian của riêng bạn – mỗi chi tiết đều phản chiếu cá tính và cảm xúc chân thành.",
            },
            {
              img: img30,
              title: "Thân Thiện Di Động",
              desc: "Dù ở bất cứ đâu, mọi trải nghiệm vẫn mượt mà như gió khẽ qua vườn hoa – nhẹ nhàng và tự nhiên.",
            },
            {
              img: img31,
              title: "Nhẹ Nhàng",
              desc: "Giao diện tinh giản, tốc độ mượt mà – để website của bạn lan tỏa cảm giác an yên và tươi sáng.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/90 backdrop-blur-md border border-amber-100 p-10 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.05] transition-all duration-700 ease-out text-center"
            >
              <div className="flex justify-center mb-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-32 h-32 rounded-3xl object-cover shadow-md border border-amber-50 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              <h4 className="text-2xl font-semibold text-[#3E2F1C] mb-4 group-hover:text-amber-600 transition-colors duration-500">
                {item.title}
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Flashcard />
      <ChatAI />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
