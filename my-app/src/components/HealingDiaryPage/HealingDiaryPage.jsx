import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  Moon,
  Sun,
  Star,
  Book,
  Send,
  RotateCcw,
} from "lucide-react";
import Header from "../HomePage/Header";
import { toast } from "react-toastify";

const HealingDiaryPage = () => {
  const [diaryEntry, setDiaryEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mascotState, setMascotState] = useState({
    message:
      "Xin chào! Tôi là Lua - linh vật chữa lành của bạn. Hãy chia sẻ những cảm xúc trong lòng bạn nhé! ✨",
    emotion: "happy",
    animation: "animate-bounce",
    position: "center",
  });
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [mascotMoving, setMascotMoving] = useState(false);

  const mascotResponses = {
    empty: {
      message:
        "Đừng ngại ngùng, hãy viết ra những gì bạn đang cảm thấy. Tôi luôn sẵn sàng lắng nghe! 🌸",
      emotion: "encouraging",
      animation: "animate-pulse",
      position: "left",
    },
    typing: {
      message:
        "Tuyệt vời! Tôi có thể cảm nhận được những cảm xúc chân thành của bạn. Hãy tiếp tục! 💕",
      emotion: "listening",
      animation: "animate-hop",
      position: "right",
    },
    longEntry: {
      message:
        "Wow! Bạn đã chia sẻ rất nhiều. Việc thể hiện cảm xúc như thế này rất tuyệt vời! 🌟",
      emotion: "happy",
      animation: "animate-jump-excited",
      position: "jumping",
    },
    submitted: {
      message:
        "Cảm ơn bạn đã tin tôi và chia sẻ! Mỗi lần viết nhật ký là một bước tiến trong hành trình chữa lành. Bạn đã làm rất tốt! 🦋",
      emotion: "celebrating",
      animation: "animate-victory-dance",
      position: "center",
    },
  };

  // Mascot movement effect
  useEffect(() => {
    if (mascotState.position !== "center") {
      setMascotMoving(true);
      const timer = setTimeout(() => setMascotMoving(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [mascotState.position]);

  useEffect(() => {
    const count = diaryEntry
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setWordCount(count);

    if (diaryEntry.length === 0) {
      setMascotState(mascotResponses.empty);
      setIsTyping(false);
    } else if (count > 50) {
      setMascotState(mascotResponses.longEntry);
      setIsTyping(true);
    } else if (diaryEntry.length > 10) {
      setMascotState(mascotResponses.typing);
      setIsTyping(true);
    }
  }, [diaryEntry]);

  const handleSubmit = () => {
    if (diaryEntry.trim() === "") {
      setMascotState({
        message:
          "Ơ không! Bạn chưa viết gì cả. Hãy chia sẻ một chút về cảm xúc của bạn nhé! 🥺",
        emotion: "encouraging",
        animation: "animate-wiggle",
      });
      toast.error("Vui lòng viết nhật ký trước khi lưu.");
      return;
    }
    setSubmitted(true);
    setMascotState(mascotResponses.submitted);
  };

  const handleReset = () => {
    setDiaryEntry("");
    setSubmitted(false);
    setWordCount(0);
    setIsTyping(false);
    setMascotState({
      message: "Tuyệt vời! Sẵn sàng để chia sẻ những cảm xúc mới rồi! ✨",
      emotion: "happy",
      animation: "animate-bounce",
      position: "center",
    });
  };

  const getMascotEmoji = () => {
    switch (mascotState.emotion) {
      case "happy":
        return "🐸";
      case "listening":
        return "🐸";
      case "encouraging":
        return "🐸";
      case "celebrating":
        return "🐸";
      default:
        return "🐸";
    }
  };

  const getFrogExpression = () => {
    switch (mascotState.emotion) {
      case "happy":
        return "😊";
      case "listening":
        return "👂";
      case "encouraging":
        return "💪";
      case "celebrating":
        return "🎉";
      default:
        return "😊";
    }
  };

  const getMascotPosition = () => {
    switch (mascotState.position) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      case "jumping":
        return "justify-center";
      case "center":
      default:
        return "justify-center";
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50 text-amber-900 mt-[50px] relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 text-amber-400 opacity-30 animate-float">
            <Heart size={24} />
          </div>
          <div className="absolute top-40 right-32 text-orange-400 opacity-40 animate-float-delayed">
            <Star size={20} />
          </div>
          <div className="absolute bottom-32 left-16 text-yellow-400 opacity-35 animate-float">
            <Sparkles size={28} />
          </div>
          <div className="absolute bottom-20 right-20 text-amber-500 opacity-30 animate-float-delayed">
            <Moon size={22} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Book className="text-amber-600" size={32} />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                Nhật Ký Chữa Lành
              </h1>
              <Book className="text-amber-600" size={32} />
            </div>
            <p className="text-amber-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Không gian an toàn để bạn chia sẻ cảm xúc và tìm thấy bình yên
              trong tâm hồn
            </p>
          </div>

          {/* Mascot Section */}
          <div className="mb-12">
            <div
              className={`flex ${getMascotPosition()} mb-8 transition-all duration-1000 ease-in-out`}
            >
              <div className="relative">
                {/* Mascot Avatar */}
                <div
                  className={`relative ${mascotState.animation} ${
                    mascotMoving ? "scale-110" : ""
                  } transition-transform duration-500`}
                >
                  <div className="w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-green-200/50 relative overflow-hidden">
                    {/* Frog Body */}
                    <div className="text-5xl mb-1">{getMascotEmoji()}</div>
                    {/* Frog Expression */}
                    <div className="text-lg absolute bottom-8">
                      {getFrogExpression()}
                    </div>

                    {/* Lily Pad Effect */}
                    <div className="absolute -bottom-2 w-48 h-12 bg-green-300/30 rounded-full blur-sm"></div>

                    {/* Floating Hearts */}
                    {mascotState.emotion === "celebrating" && (
                      <>
                        <div className="absolute -top-2 -right-2 text-pink-500 animate-bounce">
                          <Heart size={16} />
                        </div>
                        <div className="absolute -bottom-2 -left-2 text-red-500 animate-bounce delay-300">
                          <Heart size={12} />
                        </div>
                      </>
                    )}

                    {/* Water Ripples when jumping */}
                    {mascotState.position === "jumping" && (
                      <>
                        <div className="absolute -bottom-4 w-32 h-2 bg-blue-300/40 rounded-full animate-ping"></div>
                        <div className="absolute -bottom-6 w-40 h-2 bg-blue-200/30 rounded-full animate-ping delay-200"></div>
                      </>
                    )}
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-30 animate-pulse scale-110 -z-10"></div>
                </div>

                {/* Status Indicator */}
                <div className="absolute -bottom-2 -right-2">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full border-2 border-green-100 animate-pulse"></div>
                </div>

                {/* Movement Trail */}
                {mascotMoving && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Mascot Message */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-sm">
                    🐸
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-700 mb-1">
                      Ếch Xanh - Linh vật chữa lành
                    </h3>
                    <div className="text-amber-800 leading-relaxed">
                      {mascotState.message}
                    </div>
                    <cite className="text-amber-700 font-semibold">
                      - Ếch Xanh, Linh vật chữa lành
                    </cite>
                  </div>
                </div>

                {/* Typing indicator */}
                {isTyping && !submitted && (
                  <div className="flex items-center gap-2 mt-3 text-amber-600 text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span>Ếch Xanh đang lắng nghe...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Diary Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/60 backdrop-blur-sm border border-amber-200/40 rounded-3xl p-8 shadow-2xl">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <label className="block text-amber-800 text-lg font-medium mb-3">
                      💭 Hãy chia sẻ cảm xúc của bạn...
                    </label>
                    <div className="relative">
                      <textarea
                        value={diaryEntry}
                        onChange={(e) => setDiaryEntry(e.target.value)}
                        placeholder="Hôm nay tôi cảm thấy... 
Tôi muốn chia sẻ rằng...
Những điều khiến tôi vui...
Những điều tôi quan tâm..."
                        className="w-full h-48 p-6 rounded-2xl bg-white/40 border border-amber-300/50 text-amber-900 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-300"
                      />

                      {/* Character counter */}
                      <div className="absolute bottom-4 right-4 text-amber-600 text-sm">
                        {diaryEntry.length} ký tự
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-amber-700 text-sm">
                      📝 Số từ:{" "}
                      <span className="font-semibold text-amber-800">
                        {wordCount}
                      </span>
                    </div>
                    <div className="text-amber-700 text-sm">
                      {wordCount > 0 && "Tuyệt vời! Tiếp tục chia sẻ nhé! 🌟"}
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <Send
                      size={20}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    Lưu nhật ký của tôi
                    <Sparkles size={20} className="animate-pulse" />
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
                      🎉
                    </div>
                    <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text mb-4">
                      Hoàn thành xuất sắc!
                    </h2>
                    <p className="text-amber-700 text-lg max-w-2xl mx-auto leading-relaxed">
                      Bạn đã hoàn thành một bước quan trọng trong hành trình
                      chữa lành. Việc chia sẻ cảm xúc giúp tâm hồn bạn nhẹ nhàng
                      hơn. Hãy tiếp tục duy trì thói quen tốt này! 🦋
                    </p>
                  </div>

                  {/* Entry Summary */}
                  <div className="bg-amber-100/40 rounded-2xl p-6 mb-6 border border-amber-200/30">
                    <h3 className="text-amber-800 font-semibold mb-3">
                      📊 Thống kê nhật ký hôm nay:
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-700">
                          {wordCount}
                        </div>
                        <div className="text-amber-600">Từ đã viết</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {diaryEntry.length}
                        </div>
                        <div className="text-amber-600">Ký tự</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto group"
                  >
                    <RotateCcw
                      size={20}
                      className="group-hover:rotate-180 transition-transform duration-500"
                    />
                    Viết nhật ký mới
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Quote */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto bg-amber-50/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30">
              <blockquote className="text-amber-800 italic text-lg mb-3">
                "Mỗi cảm xúc đều có giá trị, mỗi suy nghĩ đều xứng đáng được
                chia sẻ. Bạn không đơn độc trên hành trình này."
              </blockquote>
              <cite className="text-amber-700 font-semibold">
                - Lua, Linh vật chữa lành
              </cite>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealingDiaryPage;
