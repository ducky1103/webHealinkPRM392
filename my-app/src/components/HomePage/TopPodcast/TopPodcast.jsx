import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, X } from "lucide-react";
import Header from "../Header";

const podcastsData = [
  {
    id: 2,
    title: "Hành trình lan tỏa sức khỏe",
    author: "Bác Nguyễn Xuân Hoè",
    img: "/19.jpg",
    audio: "/audio/es01_1.mp3",
    date: "03/11/2025",
    desc: "Bác Nguyễn Xuân Hoè – người lính năm xưa nay tiếp tục lan tỏa năng lượng sống tích cực.",
    comments: [
      { user: "duc", text: "Dạ, hay quá ạ!", time: "13:02:52 12/11/2025" },
      { user: "phuong", text: "Tuyệt vời quá ạ.", time: "09:33:33 06/11/2025" },
      {
        user: "Khanh",
        text: "Hay quá ông ơi, cảm ơn vì đã tạo ra podcast tuyệt vời!",
        time: "02:36:56 04/11/2025",
      },
      {
        user: "user",
        text: "Con cảm nhận được động lực rất lớn ạ.",
        time: "13:41:05 03/11/2025",
      },
      {
        user: "Minh Anh",
        text: "Nghe xong thấy yêu đời hơn, cảm ơn bác!",
        time: "08:15:22 13/11/2025",
      },
      {
        user: "Hải Đăng",
        text: "Giọng bác truyền cảm quá!",
        time: "10:22:10 13/11/2025",
      },
      {
        user: "Lan",
        text: "Podcast này xứng đáng top 1!",
        time: "11:45:00 13/11/2025",
      },
      {
        user: "Quốc",
        text: "Nội dung ý nghĩa, rất truyền cảm hứng.",
        time: "12:30:00 13/11/2025",
      },
      {
        user: "Thảo",
        text: "Mong có thêm nhiều tập như này!",
        time: "13:00:00 13/11/2025",
      },
      {
        user: "Tùng",
        text: "Bác chia sẻ rất chân thành!",
        time: "13:10:00 13/11/2025",
      },
    ],
    top: true,
  },
  {
    id: 1,
    title: "Chữa lành tâm hồn",
    author: "Healink Team",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/audio4.mp3",
    date: "10/11/2025",
    desc: "Những giây phút lắng đọng giúp bạn tìm lại sự cân bằng trong cuộc sống.",
    comments: [
      {
        user: "Thu Thảo",
        text: "Đúng cái mình đang cần lúc này.",
        time: "20:10:11 11/11/2025",
      },
      {
        user: "Quang Hải",
        text: "Nhạc nền rất chill, nội dung sâu sắc.",
        time: "18:05:22 11/11/2025",
      },
      {
        user: "Bảo Ngọc",
        text: "Mong ra thêm nhiều tập nữa!",
        time: "15:40:00 11/11/2025",
      },
    ],
  },
  {
    id: 3,
    title: "Sống xanh, Sống khỏe",
    author: "Dr. Green",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/audio5.mp3",
    date: "15/11/2025",
    desc: "Chia sẻ bí quyết sống khỏe mạnh từ thiên nhiên và thói quen hàng ngày.",
    comments: [
      {
        user: "Huy Hoàng",
        text: "Kiến thức rất bổ ích.",
        time: "08:20:15 16/11/2025",
      },
      {
        user: "Lan Chi",
        text: "Đã áp dụng thử và thấy hiệu quả.",
        time: "21:00:00 15/11/2025",
      },
    ],
  },
];

const HealinkPodcast = () => {
  const [activePod, setActivePod] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const handlePlay = (pod) => {
    if (activePod?.id === pod.id) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      setActivePod(pod);
      audioRef.current.src = pod.audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const current = audioRef.current;
    const updateProgress = () => setProgress(current.currentTime);
    const setDur = () => setDuration(current.duration || 0);
    const next = () => setIsPlaying(false);

    current.addEventListener("timeupdate", updateProgress);
    current.addEventListener("loadedmetadata", setDur);
    current.addEventListener("ended", next);
    return () => {
      current.removeEventListener("timeupdate", updateProgress);
      current.removeEventListener("loadedmetadata", setDur);
      current.removeEventListener("ended", next);
    };
  }, []);

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audioRef.current.currentTime = duration * percent;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#381B08] via-[#5D2E12] to-[#FFEFD5] text-white font-sans pb-28 mt-[20px]">
        <div className="max-w-6xl mx-auto px-4 py-10 relative">
          <h1 className="text-4xl font-bold text-[#E5CFA0] mb-10 text-center drop-shadow-md">
            Top Podcast Healink
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {podcastsData.map((pod, idx) => (
              <div
                key={pod.id}
                className={`rounded-xl border shadow-xl overflow-hidden flex flex-col h-[650px] transition-transform duration-300 hover:scale-105 ${
                  pod.top
                    ? "bg-gradient-to-tr from-[#FFD9A0] via-[#E5CFA0] to-[#B46835] border-[#FFD9A0] shadow-amber-200"
                    : "bg-[#5D2E12] border-[#7A4222]"
                }`}
                style={pod.top ? { boxShadow: "0 0 32px 0 #FFD9A0" } : {}}
              >
                <div className="p-4 pb-0">
                  <div
                    className="relative aspect-square mb-4 rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => handlePlay(pod)}
                  >
                    <img
                      src={pod.img}
                      className={`w-full h-full object-cover group-hover:scale-105 duration-500 ${
                        pod.top ? "border-4 border-[#FFD9A0]" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/30 flex justify-center items-center group-hover:bg-black/10">
                      <div className="bg-[#E5CFA0]/90 p-3 rounded-full shadow-lg scale-0 group-hover:scale-100 duration-300">
                        {activePod?.id === pod.id && isPlaying ? (
                          <Pause size={24} className="text-[#381B08]" />
                        ) : (
                          <Play size={24} className="text-[#381B08]" />
                        )}
                      </div>
                    </div>
                    {pod.top && (
                      <div className="absolute top-2 left-2 bg-[#FFD700] text-[#381B08] px-3 py-1 rounded-full font-bold text-xs shadow">
                        TOP 1
                      </div>
                    )}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      pod.top ? "text-[#B46835]" : "text-[#E5CFA0]"
                    }`}
                  >
                    {pod.title}
                  </h3>
                  <p className="text-xs opacity-70 mb-2">
                    {pod.date} • {pod.author}
                  </p>
                  <p className="text-sm opacity-85 line-clamp-2 mb-4">
                    {pod.desc}
                  </p>
                </div>

                <div className="flex-1 bg-[#4A2511]/50 p-4 border-t border-[#7A4222] flex flex-col overflow-hidden">
                  <p
                    className={`flex gap-2 mb-3 text-sm font-semibold ${
                      pod.top ? "text-[#B46835]" : "text-[#E5CFA0]"
                    }`}
                  >
                    Bình luận ({pod.comments.length})
                  </p>
                  <div className="flex-1 space-y-3 pr-2 overflow-y-auto custom-scrollbar">
                    {pod.comments.map((c, i) => (
                      <div
                        key={i}
                        className={`rounded-lg p-3 shadow-md ${
                          pod.top
                            ? "bg-[#FFD9A0]/80 text-[#381B08]"
                            : "bg-[#B46835]"
                        }`}
                      >
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="font-bold">{c.user}</span>
                          <span className="opacity-75 italic">{c.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player */}
        {activePod && (
          <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-[#FFD9A0] to-[#B46835] border border-[#C87941]/40 backdrop-blur-xl rounded-2xl h-20 flex items-center px-4 gap-6 shadow-2xl">
              <img
                src={activePod.img}
                className={`w-12 h-12 rounded-lg object-cover border shadow-sm ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
                alt=""
              />

              <div className="flex-1">
                <p className="text-sm font-bold truncate text-[#381B08]">
                  {activePod.title}
                </p>
                <p className="text-xs opacity-80 truncate text-[#381B08]">
                  {activePod.author}
                </p>

                {/* Progress bar */}
                <div className="mt-1 flex items-center gap-2 text-[10px] opacity-90 text-[#381B08]">
                  <span>
                    {Math.floor(progress / 60)}:
                    {("0" + Math.floor(progress % 60)).slice(-2)}
                  </span>
                  <div
                    className="flex-1 h-1 bg-black/20 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(progress / duration) * 100}%` }}
                    ></div>
                  </div>
                  <span>
                    {Math.floor(duration / 60) || 0}:
                    {("0" + Math.floor(duration % 60)).slice(-2) || "00"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play();
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 bg-white/30 border border-white/50 hover:bg-white/50 rounded-full flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-[#381B08]" />
                ) : (
                  <Play size={20} className="ml-[2px] text-[#381B08]" />
                )}
              </button>

              <button
                onClick={() => {
                  setActivePod(null);
                  audioRef.current.pause();
                  setIsPlaying(false);
                }}
                className="ml-2 w-8 h-8 bg-white/30 hover:bg-red-200 rounded-full flex items-center justify-center"
              >
                <X size={22} className="text-[#381B08]" />
              </button>
            </div>
          </div>
        )}

        <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes slide-up { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }
      `}</style>
      </div>
    </>
  );
};

export default HealinkPodcast;
