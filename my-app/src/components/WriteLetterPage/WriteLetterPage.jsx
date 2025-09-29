import React, { useState } from "react";
import { Send, Heart, Feather } from "lucide-react";
import Header from "../HomePage/Header";

const WriteLetterPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendLetter = () => {
    if (!email.trim() || !message.trim()) {
      // Simple alert instead of toast for now
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setSending(true);

    // Simulate sending letter with animation
    setTimeout(() => {
      setSending(false);
      setShowSuccess(true);

      // Reset form after success animation
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setMessage("");
      }, 4000);
    }, 3000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-red-300 rounded-full blur-3xl"></div>
        </div>

        {/* Flying bird animation when sending */}
        {sending && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 animate-fly-across">
              <div className="relative">
                <div className="w-8 h-8 bg-amber-700 rounded-full relative">
                  <div className="absolute -top-1 -left-2 w-4 h-2 bg-amber-600 rounded-full transform rotate-45"></div>
                  <div className="absolute -top-1 -right-2 w-4 h-2 bg-amber-600 rounded-full transform -rotate-45 animate-wing-flap"></div>
                </div>
                <div className="absolute -bottom-1 left-1 w-6 h-6 bg-white rounded-lg shadow-lg transform rotate-12 animate-letter-float">
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg border border-amber-300"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success animation */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center animate-scale-up">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Thư đã được gửi!
              </h3>
              <p className="text-gray-600">
                Thư của bạn đang bay đến tương lai...
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Feather className="w-8 h-8 text-amber-700" />
                <h1 className="text-4xl font-bold text-amber-900 font-semibold">
                  Thư gửi tương lai
                </h1>
                <Feather className="w-8 h-8 text-amber-700 scale-x-[-1]" />
              </div>
              <p className="text-amber-700 text-lg font-semibold">
                Viết những lời nhắn yêu thương cho chính mình trong tương lai
              </p>
            </div>

            {/* Letter Paper */}
            <div className="relative">
              {/* Paper shadow */}
              <div className="absolute inset-0 rounded-lg transform translate-x-2 translate-y-2 opacity-20"></div>

              {/* Main paper */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg shadow-2xl overflow-hidden">
                {/* Paper texture overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='25' cy='15' r='0.5'/%3E%3Ccircle cx='45' cy='25' r='1'/%3E%3Ccircle cx='15' cy='35' r='0.5'/%3E%3Ccircle cx='35' cy='45' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Red margin line */}
                <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300 opacity-30"></div>

                {/* Hole punches */}
                <div className="absolute left-6 top-12 w-2 h-2 bg-white border border-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute left-6 top-24 w-2 h-2 bg-white border border-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute left-6 top-36 w-2 h-2 bg-white border border-gray-300 rounded-full shadow-inner"></div>

                {/* Letter content */}
                <div className="relative p-8 pl-20 pr-8">
                  {/* Date line */}
                  <div className="text-right mb-6">
                    <div className="inline-block border-b border-amber-300 pb-1">
                      <span className="text-amber-600 font-serif text-sm">
                        {new Date().toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif text-amber-900 mb-2">
                      Gửi tương lai của tôi,
                    </h2>
                  </div>

                  <form className="space-y-6">
                    {/* Email field */}
                    <div className="relative">
                      <label className="block text-amber-800 font-serif mb-2 text-sm">
                        Email của bạn:
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-transparent border-b-2 border-amber-300 text-amber-900 placeholder-amber-500 focus:outline-none focus:border-amber-600 transition-colors font-serif text-lg"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, transparent 0%, transparent 100%)",
                          backgroundSize: "100% 1px",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "0 100%",
                        }}
                      />
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <label className="block text-amber-800 font-semibold mb-2 text-sm">
                        Lời nhắn:
                      </label>
                      <div className="relative">
                        {/* Lined paper background */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(transparent, transparent 29px, #d97706 29px, #d97706 30px)",
                            opacity: 0.1,
                          }}
                        ></div>
                        <textarea
                          placeholder="Tôi muốn nhắn gửi đến bản thân trong tương lai rằng..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-4 bg-transparent text-amber-900 placeholder-amber-500 focus:outline-none resize-none font-semibold text-lg leading-8 relative z-10"
                          rows={12}
                          style={{
                            lineHeight: "30px",
                            paddingTop: "5px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Signature area */}
                    <div className="flex justify-end mt-8">
                      <div className="text-right">
                        <div className="text-amber-800 font-serif mb-2">
                          Với tình yêu,
                        </div>
                        <div className="border-b border-amber-300 w-32 pb-1">
                          <span className="text-amber-600 font-serif italic">
                            Bản thân hiện tại
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400 opacity-30"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400 opacity-30"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400 opacity-30"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400 opacity-30"></div>
              </div>

              {/* Send button */}
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={handleSendLetter}
                  disabled={sending}
                  className={`group relative px-8 py-4 rounded-full font-serif text-lg font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 ${
                    sending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Đang gửi thư...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Gửi thư đi</span>
                      </>
                    )}
                  </div>

                  {/* Button glow effect */}
                  {!sending && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity -z-10 blur-xl"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fly-across {
            0% {
              transform: translateX(-100px) translateY(0) rotate(0deg);
            }
            50% {
              transform: translateX(50vw) translateY(-50px) rotate(10deg);
            }
            100% {
              transform: translateX(100vw) translateY(-20px) rotate(0deg);
            }
          }

          @keyframes wing-flap {
            0%,
            100% {
              transform: rotate(-45deg) scaleY(1);
            }
            50% {
              transform: rotate(-45deg) scaleY(0.5);
            }
          }

          @keyframes letter-float {
            0%,
            100% {
              transform: rotate(12deg) translateY(0);
            }
            50% {
              transform: rotate(8deg) translateY(-3px);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scale-up {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          .animate-fly-across {
            animation: fly-across 3s ease-in-out forwards;
          }

          .animate-wing-flap {
            animation: wing-flap 0.3s ease-in-out infinite;
          }

          .animate-letter-float {
            animation: letter-float 0.5s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }

          .animate-scale-up {
            animation: scale-up 0.4s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default WriteLetterPage;
