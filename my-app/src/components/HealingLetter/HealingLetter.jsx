import React, { useEffect, useState } from "react";
import { Heart, X, Sparkles, Coffee, Leaf } from "lucide-react";

const HealingLetter = () => {
  const healingQuotes = [
    "Chữa lành không có nghĩa là quên đi, mà là học cách mỉm cười sau những tổn thương.",
    "Hãy tử tế với chính mình, bạn cũng xứng đáng được yêu thương.",
    "Chậm lại một chút để lắng nghe trái tim – đó cũng là một cách chữa lành.",
    "Mỗi ngày là một cơ hội để bắt đầu lại và yêu thương bản thân hơn.",
    "Hãy để những tổn thương trở thành bài học quý giá trong cuộc sống.",
    "Bạn mạnh mẽ hơn bạn nghĩ – hãy tin vào chính mình.",
    "Hãy dành thời gian để chăm sóc tâm hồn, nó cũng cần được chữa lành.",
    "Những điều tốt đẹp sẽ đến khi bạn học cách buông bỏ những điều không tốt.",
    "Hãy để ánh sáng của hy vọng dẫn đường cho bạn.",
    "Chữa lành là hành trình, không phải đích đến.",
    "Hãy yêu thương bản thân như cách bạn yêu thương người khác.",
    "Mỗi vết thương đều có thể trở thành một câu chuyện đẹp nếu bạn học cách vượt qua.",
  ];

  const [quote, setQuote] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const showQuote = () => {
      const currentTime = new Date().getTime();
      const lastShownTime = localStorage.getItem("healingLetterTime");

      if (!lastShownTime || currentTime - parseInt(lastShownTime) > 3600000) {
        const randomQuote =
          healingQuotes[Math.floor(Math.random() * healingQuotes.length)];
        setQuote(randomQuote);
        localStorage.setItem("healingLetterTime", currentTime.toString());
      }
    };

    showQuote();
    const interval = setInterval(showQuote, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setQuote(null);
      setIsClosing(false);
    }, 400);
  };

  if (!quote) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/70 to-yellow-900/60 backdrop-blur-sm" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400/50 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-yellow-600/40 rounded-full animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-pulse delay-500" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-orange-500/40 rounded-full animate-pulse delay-1500" />
      </div>

      {/* Main card */}
      <div
        className={`relative max-w-2xl w-full transform transition-all duration-500 ${
          isClosing
            ? "scale-90 opacity-0 rotate-1"
            : "scale-100 opacity-100 rotate-0"
        }`}
      >
        {/* Card background with paper texture */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl border border-amber-200/50 overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/20 via-transparent to-orange-100/20" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-200/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-200/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12 text-center">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-amber-100/80 hover:bg-amber-200/90 text-amber-800 transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg group"
            >
              <X className="w-5 h-5 transition-transform duration-300" />
            </button>

            {/* Header with icons */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Coffee className="w-6 h-6 text-amber-700 animate-pulse" />
                <Heart className="w-8 h-8 text-orange-600 animate-pulse delay-500" />
                <Leaf className="w-6 h-6 text-yellow-700 animate-pulse delay-1000" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-yellow-800 bg-clip-text text-transparent mb-4">
                Lá thư chữa lành
              </h2>

              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                <Sparkles
                  className="w-4 h-4 text-amber-600 animate-spin"
                  style={{ animationDuration: "4s" }}
                />
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
              </div>
            </div>

            {/* Quote with decorative elements */}
            <div className="mb-10 relative">
              {/* Decorative quotes */}
              <div className="absolute -top-6 -left-2 md:-left-6 text-6xl md:text-8xl text-amber-300/30 font-serif leading-none select-none">
                "
              </div>
              <div className="absolute -bottom-6 -right-2 md:-right-6 text-6xl md:text-8xl text-amber-300/30 font-serif leading-none rotate-180 select-none">
                "
              </div>

              <p className="text-lg md:text-xl leading-relaxed text-amber-900 font-medium italic px-4 md:px-8 py-4 relative z-10">
                {quote}
              </p>
            </div>

            {/* Decorative hearts */}
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300" />
              <Heart className="w-6 h-6 text-yellow-600 animate-pulse delay-600" />
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-900" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-1200" />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="group px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:from-amber-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold text-base md:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 border border-amber-500/20"
            >
              <span className="flex items-center gap-3">
                <Heart className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                Đóng với tình yêu
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </span>
            </button>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-b-3xl opacity-60" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-300/40 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-300/40 rounded-br-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealingLetter;
