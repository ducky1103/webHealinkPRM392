import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, Heart, Feather, Calendar } from "lucide-react";
import Header from "../HomePage/Header";
import {
  postLetter,
  resetPostLetter,
} from "../../redux/User/letter/postLetterSlice";
import { getProfile } from "../../redux/User/profile/getProfileSlice";
import toast from "react-hot-toast";

const WriteLetterPage = () => {
  const dispatch = useDispatch();
  const { loading, success } = useSelector((state) => state.postLetter);
  const { profile } = useSelector((state) => state.getProfile);
  const { user } = useSelector((state) => state.account);

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendTime, setSendTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Fetch profile khi component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(getProfile(user.id));
    }
  }, [dispatch, user?.id]);

  // Set email từ profile
  useEffect(() => {
    if (profile?.email) {
      setEmail(profile.email);
    }
  }, [profile]);

  // Get minimum time if date is today
  const getMinTime = () => {
    if (sendDate === today) {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
    }
    return "00:00";
  };

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTitle("");
        setMessage("");
        setSendDate("");
        setSendTime("");
        dispatch(resetPostLetter());
      }, 4000);
    }
  }, [success, dispatch]);

  const handleSendLetter = () => {
    // Validation
    if (!email.trim()) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề!");
      return;
    }

    if (!message.trim()) {
      toast.error("Vui lòng nhập nội dung thư!");
      return;
    }

    if (!sendDate || !sendTime) {
      toast.error("Vui lòng chọn ngày và giờ gửi!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ!");
      return;
    }

    // Check if send time is in the future
    const selectedDateTime = new Date(`${sendDate}T${sendTime}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      toast.error("Thời gian gửi phải ở tương lai!");
      return;
    }

    // Format sendTime to ISO 8601
    const sendDateTime = `${sendDate}T${sendTime}:00.000Z`;

    // Dispatch action
    dispatch(
      postLetter({
        recipient: email,
        title: title,
        description: message,
        sendTime: sendDateTime,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        {/* Google Fonts Import */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Noto+Serif:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-red-300 rounded-full blur-3xl"></div>
        </div>

        {/* Flying bird animation when sending */}
        {loading && (
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
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center animate-scale-up max-w-md mx-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Thư đã được lên lịch!
              </h3>
              <p
                className="text-gray-600 mb-2"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Thư của bạn sẽ được gửi vào:
              </p>
              <p
                className="text-amber-700 font-semibold"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {new Date(`${sendDate}T${sendTime}`).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center min-h-screen p-4 py-24">
          <div className="max-w-5xl w-full">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Feather className="w-8 h-8 text-amber-700" />
                <h1
                  className="text-5xl font-bold text-amber-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Thư gửi tương lai
                </h1>
                <Feather className="w-8 h-8 text-amber-700 scale-x-[-1]" />
              </div>
              <p
                className="text-amber-700 text-lg"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Viết những lời nhắn yêu thương cho chính mình trong tương lai
              </p>
            </div>

            {/* Letter Paper */}
            <div className="relative">
              {/* Shadow layers for depth */}
              <div className="absolute -inset-2 bg-amber-200/30 rounded-xl blur-sm"></div>
              <div className="absolute -inset-1 bg-amber-100/50 rounded-lg blur-[2px]"></div>

              {/* Main paper */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300/60 rounded-xl shadow-2xl overflow-hidden">
                {/* Vintage paper texture */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3' /%3E%3C/svg%3E")`,
                  }}
                ></div>

                {/* Decorative header border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40"></div>

                {/* Left margin line */}
                <div className="absolute left-20 top-0 bottom-0 w-px bg-red-400/40"></div>

                {/* Letter content */}
                <div className="relative p-10 pl-24 pr-12">
                  {/* Ornamental top corner */}
                  <div className="absolute top-6 right-6 w-16 h-16 opacity-20">
                    <svg
                      viewBox="0 0 100 100"
                      className="text-amber-600 fill-current"
                    >
                      <path d="M50,10 Q80,30 90,50 Q70,70 50,90 Q30,70 10,50 Q20,30 50,10 Z" />
                    </svg>
                  </div>

                  {/* Date line */}
                  <div className="text-right mb-8">
                    <div className="inline-block">
                      <span
                        className="text-amber-700 text-sm tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {new Date().toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <div className="h-px bg-amber-400/50 mt-1"></div>
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="mb-8">
                    <h2
                      className="text-3xl text-amber-900 mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Gửi tương lai của tôi,
                    </h2>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
                  </div>

                  <form className="space-y-7">
                    {/* Email field */}
                    <div className="relative">
                      <label
                        className="block text-amber-800 mb-2 text-sm font-medium tracking-wide"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        Email nhận thư <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Đang tải email..."
                        value={email}
                        readOnly
                        className="w-full p-3 bg-white/60 border-b-2 border-amber-300 text-amber-900 placeholder-amber-400 focus:outline-none text-base cursor-not-allowed backdrop-blur-sm"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      />
                    </div>

                    {/* Title field */}
                    <div className="relative">
                      <label
                        className="block text-amber-800 mb-2 text-sm font-medium tracking-wide"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        Tiêu đề <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tiêu đề thư..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-transparent border-b-2 border-amber-300 text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-600 transition-colors text-lg"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      />
                    </div>

                    {/* Date and Time selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label
                          className="block text-amber-800 mb-2 text-sm font-medium tracking-wide flex items-center gap-2"
                          style={{ fontFamily: "'Noto Serif', serif" }}
                        >
                          <Calendar className="w-4 h-4" />
                          Ngày gửi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={sendDate}
                          onChange={(e) => setSendDate(e.target.value)}
                          min={today}
                          className="w-full p-3 bg-white/60 border-2 border-amber-300 rounded-lg text-amber-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all backdrop-blur-sm"
                          style={{ fontFamily: "'Noto Serif', serif" }}
                        />
                      </div>
                      <div className="relative">
                        <label
                          className="block text-amber-800 mb-2 text-sm font-medium tracking-wide"
                          style={{ fontFamily: "'Noto Serif', serif" }}
                        >
                          Giờ gửi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          value={sendTime}
                          onChange={(e) => setSendTime(e.target.value)}
                          min={getMinTime()}
                          className="w-full p-3 bg-white/60 border-2 border-amber-300 rounded-lg text-amber-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all backdrop-blur-sm"
                          style={{ fontFamily: "'Noto Serif', serif" }}
                        />
                      </div>
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <label
                        className="block text-amber-800 mb-2 text-sm font-medium tracking-wide"
                        style={{ fontFamily: "'Noto Serif', serif" }}
                      >
                        Nội dung thư <span className="text-red-500">*</span>
                      </label>
                      <div className="relative bg-white/30 rounded-lg p-1 backdrop-blur-sm">
                        <div
                          className="absolute inset-0 pointer-events-none rounded-lg"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(transparent, transparent 31px, rgba(217, 119, 6, 0.08) 31px, rgba(217, 119, 6, 0.08) 32px)",
                          }}
                        ></div>
                        <textarea
                          placeholder="Tôi muốn nhắn gửi đến bản thân trong tương lai rằng..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-4 bg-transparent text-amber-900 placeholder-amber-400/70 focus:outline-none resize-none text-base leading-8 relative z-10"
                          rows={12}
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            lineHeight: "32px",
                          }}
                        />
                      </div>
                    </div>

                    {/* Signature area */}
                    <div className="flex justify-end mt-10 mb-4">
                      <div className="text-right">
                        <div
                          className="text-amber-800 mb-3 italic"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "17px",
                          }}
                        >
                          Với tình yêu thương,
                        </div>
                        <div className="relative inline-block">
                          <span
                            className="text-amber-700 italic text-lg"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {profile?.fullname || "Bản thân hiện tại"}
                          </span>
                          <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-amber-500/40 rounded-tl-lg"></div>
                <div className="absolute top-5 right-5 w-10 h-10 border-r-2 border-t-2 border-amber-500/40 rounded-tr-lg"></div>
                <div className="absolute bottom-5 left-5 w-10 h-10 border-l-2 border-b-2 border-amber-500/40 rounded-bl-lg"></div>
                <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-amber-500/40 rounded-br-lg"></div>
              </div>

              {/* Send button */}
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={handleSendLetter}
                  disabled={loading}
                  className={`group relative px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl transform hover:scale-105 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white hover:shadow-2xl"
                  }`}
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  <div className="flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Đang gửi thư...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Lên lịch gửi thư</span>
                      </>
                    )}
                  </div>

                  {!loading && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity -z-10 blur-xl"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
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
            0%, 100% {
              transform: rotate(-45deg) scaleY(1);
            }
            50% {
              transform: rotate(-45deg) scaleY(0.5);
            }
          }

          @keyframes letter-float {
            0%, 100% {
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
