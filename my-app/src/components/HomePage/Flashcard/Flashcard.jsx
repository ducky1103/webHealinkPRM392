import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Sparkles } from "lucide-react";
import { postFlashCardRequest } from "../../../redux/User/flashCardAI/postFlashCardSlice";

function Flashcard() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.postFlashCard?.loading);
  const flashResult = useSelector((state) => state.postFlashCard?.data);
  const error = useSelector((state) => state.postFlashCard?.error);

  useEffect(() => {
    if (isOpened) {
      dispatch(
        postFlashCardRequest({
          reply:
            "Hãy tạo ra một câu chuyện ngắn gọn, truyền động lực bằng tiếng Việt. Câu chuyện nên nói về hành trình vượt qua khó khăn, kiên trì, hoặc tìm lại ý nghĩa cuộc sống.  Cuối cùng, hãy thêm một câu nói hay, sâu sắc của một người từng trải (có thể là trích dẫn thực tế hoặc phong cách tương tự).  Giữ giọng văn ấm áp, khích lệ và phù hợp để hiển thị trên flashcard truyền cảm hứng.  Chỉ trả về phần câu chuyện và câu nói, không giải thích thêm.",
        })
      );
    }
  }, [isOpened, dispatch]);

  const toggleLetter = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-amber-300/20 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              width: `${12 + Math.random() * 8}px`,
              height: `${12 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h1 className="text-7xl font-serif font-bold text-amber-100 mb-3 tracking-wide drop-shadow-2xl">
              A Letter for You
            </h1>
            <div className="absolute -top-6 -right-8 animate-bounce-slow">
              <Heart
                className="w-10 h-10 text-rose-400/60"
                fill="currentColor"
              />
            </div>
          </div>
          <p className="text-xl text-amber-200/80 font-serif italic mt-4">
            {isOpened ? "Click again to seal" : "Click the envelope to reveal"}
          </p>
        </div>

        <div className="perspective-2000 cursor-pointer" onClick={toggleLetter}>
          <div className="relative letter-wrapper">
            {/* Phần nắp thư */}
            <div className={`envelope-flap ${isOpened ? "opened" : ""}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-amber-600 to-amber-700 envelope-flap-inner shadow-2xl">
                <div className="absolute inset-0 border-4 border-amber-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {!isOpened && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-rose-400/30 rounded-full blur-xl animate-pulse"></div>
                      <Heart
                        className="w-14 h-14 text-rose-300 animate-pulse relative z-10"
                        fill="currentColor"
                        strokeWidth={1}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thân thư */}
            <div className="envelope-body relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-orange-100 to-amber-200 rounded-md shadow-2xl border-4 border-amber-800/30">
                <div className="absolute inset-4 border-2 border-amber-700/20 rounded"></div>
              </div>
            </div>

            {/* Nội dung thư */}
            <div className={`letter-content ${isOpened ? "revealed" : ""}`}>
              <div className="relative h-[500px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-lg shadow-2xl p-10 border-4 border-amber-300/50">
                <div className="relative z-10 h-[600px] flex flex-col">
                  <h2 className="text-4xl font-serif font-bold text-amber-900 mb-8 text-center">
                    To You, With Love
                  </h2>

                  {/* Nếu đang loading */}
                  {loading && (
                    <p className="text-center text-amber-700 italic">
                      Đang viết thư cho bạn...
                    </p>
                  )}

                  {/* Nếu lỗi */}
                  {error && (
                    <p className="text-center text-rose-600 italic">
                      Lỗi: {error}
                    </p>
                  )}

                  {/* Nếu có kết quả */}
                  {flashResult && !loading && (
                    <p className="text-amber-800 leading-loose font-sans-serif text-lg whitespace-pre-wrap">
                      {flashResult?.reply}
                    </p>
                  )}

                  {/* Nếu chưa mở thư */}
                  {!isOpened && (
                    <p className="text-center text-amber-700 italic">
                      Hãy mở phong thư để xem điều kỳ diệu...
                    </p>
                  )}

                  {/* Chữ ký */}
                  {isOpened && (
                    <div className="mt-8 text-right">
                      <p className="text-lg font-sans italic text-amber-700">
                        Forever yours,
                      </p>
                      <p className="text-2xl font-serif font-bold text-amber-900 mt-1">
                        Your Secret Admirer
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(25px) rotate(-2deg); }
      }
      @keyframes float-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }

      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
      .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

      .perspective-2000 { perspective: 2000px; }

      .letter-wrapper {
        position: relative;
        width: 100%;
        height: 400px;
        transform-style: preserve-3d;
        transition: transform 1s;
      }

      .envelope-flap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        transform-origin: top;
        transition: transform 1s ease-in-out;
        z-index: 30;
        border-radius: 0.5rem 0.5rem 0 0;
      }

      .envelope-flap.opened { transform: rotateX(180deg); }

      .envelope-body {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 70%;
        z-index: 20;
        border-radius: 0 0 0.5rem 0.5rem;
      }

      .letter-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        opacity: 0;
        transform: translateY(30px);
        transition: all 1.2s ease-in-out;
        z-index: 10;
      }

      .letter-content.revealed {
        opacity: 1;
        transform: translateY(0);
         z-index: 50;
      }
    `}</style>
    </div>
  );
}

export default Flashcard;
