import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const whispers = [
  "Đừng sợ thất bại; đó là cách bạn học được để thành công. — Michael Jordan",
  "Tình yêu đích thực bắt đầu khi không còn điều kiện. — Osho",
  "Đi chậm không sao, miễn là đừng bao giờ dừng lại. — Khổng Tử",
  "Sự kiên trì biến điều không thể thành có thể. — Napoleon Hill",
  "Bạn trở thành điều bạn nghĩ đến phần lớn thời gian. — Earl Nightingale",
  "Hạnh phúc không phải đích đến, mà là hành trình. — Zig Ziglar",
  "Nơi nào có tình yêu, nơi đó có sự sống. — Mahatma Gandhi",
  "Dũng cảm không phải là không sợ hãi, mà là vượt qua nó. — Nelson Mandela",
  "Đừng so sánh. Hoa hồng và hoa sen nở theo cách riêng. — Thích Nhất Hạnh",
  "Thành công là tổng của những nỗ lực nhỏ lặp đi lặp lại mỗi ngày. — R. Collier",
  "Khi bạn thay đổi cách nhìn, điều bạn nhìn cũng thay đổi. — Wayne Dyer",
  "Tình yêu chữa lành mọi vết thương, nếu bạn cho nó thời gian. — Steve Maraboli",
  "Bạn không bao giờ quá già để đặt mục tiêu mới. — C.S. Lewis",
  "Tĩnh lặng là nơi tâm hồn tìm thấy câu trả lời. — Rumi",
  "Thất bại chỉ là cơ hội để bắt đầu thông minh hơn. — Henry Ford",
  "Hãy tử tế. Bất kỳ ai bạn gặp cũng đang chiến đấu một cuộc chiến riêng. — Plato",
  "Sống là nghệ thuật cân bằng giữa buông bỏ và nắm giữ. — Rumi",
  "Kỷ luật là chiếc cầu nối giữa mục tiêu và thành tựu. — Jim Rohn",
  "Niềm tin là cơ bắp: dùng càng nhiều, càng mạnh. — Robin Sharma",
  "Giông bão làm rễ sâu hơn. — Dolly Parton",
  "Đặt trái tim vào mọi việc bạn làm. — Steve Jobs",
  "Đôi khi điều bạn mất đi mở đường cho điều tốt hơn. — Seneca",
  "Ân cần với chính mình, rồi bạn sẽ ân cần với đời. — Buddha",
  "Nếu muốn đi xa, hãy đi cùng nhau. — Tục ngữ Châu Phi",
  "Không có con đường đến hạnh phúc, hạnh phúc là con đường. — Thích Nhất Hạnh",
  "Điều vĩ đại được xây từ thói quen nhỏ. — James Clear",
  "Mỗi ngày một phần trăm tốt hơn. — Atomic Habits",
];

function Game() {
  const navigate = useNavigate();
  const [fireflies, setFireflies] = useState([]);
  const [currentWhisper, setCurrentWhisper] = useState("");
  const [showWhisper, setShowWhisper] = useState(false);
  const [isForestBright, setIsForestBright] = useState(false);
  const [clickParticles, setClickParticles] = useState([]);
  const [stars, setStars] = useState([]);
  const [trees, setTrees] = useState([]);
  const [floatingFireflies, setFloatingFireflies] = useState([]);
  const canvasRef = useRef(null);
  const particleIdRef = useRef(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const starArray = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStars(starArray);
  }, []);

  useEffect(() => {
    if (fireflies.length === 0) return;

    const animate = () => {
      setFireflies((prev) =>
        prev.map((f) => {
          let x = f.x + f.vx;
          let y = f.y + f.vy;
          let vx = f.vx;
          let vy = f.vy;

          // Phản hồi mép nhẹ nhàng hơn
          if (x < 5) vx = Math.abs(vx) * 0.6;
          if (x > 95) vx = -Math.abs(vx) * 0.6;
          if (y < 5) vy = Math.abs(vy) * 0.6;
          if (y > 95) vy = -Math.abs(vy) * 0.6;

          // Dao động nhỏ, mượt hơn
          if (Math.random() < 0.015) {
            vx += (Math.random() - 0.5) * 0.01;
            vy += (Math.random() - 0.5) * 0.01;
          }

          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > 0.08) {
            vx *= 0.97;
            vy *= 0.97;
          }

          // Tăng damping để chuyển động êm
          vx *= 0.998;
          vy *= 0.998;

          return {
            ...f,
            x,
            y,
            vx,
            vy,
            glowPhase: (f.glowPhase + 0.03) % (Math.PI * 2),
            brightness: 0.6 + Math.sin(f.glowPhase) * 0.4,
          };
        })
      );

      setClickParticles((prev) =>
        prev.map((p) => ({ ...p, life: p.life - 1 })).filter((p) => p.life > 0)
      );

      requestAnimationFrame(animate);
    };

    const frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [fireflies.length]);

  useEffect(() => {
    if (fireflies.length >= 10 && !isForestBright) {
      setIsForestBright(true);
      setCurrentWhisper(
        "Hành trình của bạn đã lan tỏa những tia sáng tích cực.\nHãy luôn giữ ngọn lửa niềm tin và tình yêu thương trong tim! 🌟"
      );
      setShowWhisper(true);

      if (!audioRef.current) {
        audioRef.current = new Audio("/audio/audio3.mp3");
        audioRef.current.volume = 0;
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => {});

      const targetVolume = 0.6;
      const step = 0.05;
      const interval = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(interval);
          return;
        }
        const next = Math.min(targetVolume, audioRef.current.volume + step);
        audioRef.current.volume = next;
        if (next >= targetVolume) clearInterval(interval);
      }, 150);

      const treeArray = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        width: Math.random() * 60 + 40,
        height: Math.random() * 120 + 120,
        delay: i * 0.15,
        opacity: 0,
      }));
      setTrees(treeArray);

      setTimeout(() => {
        setTrees((prev) => prev.map((tree) => ({ ...tree, opacity: 0.8 })));
      }, 100);

      setTimeout(() => {
        const newFlies = Array.from({ length: 25 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 6,
          duration: Math.random() * 3 + 4,
          delay: Math.random() * 2,
        }));
        setFloatingFireflies(newFlies);
      }, 1500);
    }
  }, [fireflies.length, isForestBright]);

  const handleCanvasClick = (e) => {
    if (fireflies.length >= 10) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const angle = Math.random() * Math.PI * 2;
    // Tốc độ thấp hơn để chuyển động nhẹ nhàng
    const speed = 0.002 + Math.random() * 0.0015;

    const newFirefly = {
      id: Date.now(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      brightness: 1,
      size: Math.random() * 6 + 10,
      glowPhase: Math.random() * Math.PI * 2,
    };

    setFireflies((prev) => [...prev, newFirefly]);

    const particles = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x,
      y,
      life: 30,
    }));
    setClickParticles((prev) => [...prev, ...particles]);

    const randomIndex = Math.floor(Math.random() * whispers.length);
    const whisper = whispers[randomIndex];
    setCurrentWhisper(whisper);
    setShowWhisper(true);
    setTimeout(() => setShowWhisper(false), 100000);
  };

  const resetForest = () => {
    setFireflies([]);
    setIsForestBright(false);
    setShowWhisper(false);
    setCurrentWhisper("");
    setClickParticles([]);
    setFloatingFireflies([]);
    setTrees([]);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBackHome = () => {
    // Tắt nhạc và hiệu ứng trước khi rời trang
    resetForest();
    navigate("/");
  };

  const getBackgroundGradient = () => {
    if (isForestBright) return "from-blue-900 via-blue-800 to-cyan-900";
    const progress = fireflies.length / 10;
    const darkness = Math.max(0, 1 - progress);
    return darkness > 0.7
      ? "from-slate-900 via-slate-800 to-slate-900"
      : darkness > 0.4
      ? "from-slate-800 via-blue-950 to-slate-800"
      : "from-blue-950 via-blue-900 to-slate-800";
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={handleBackHome}
          className="bg-gradient-to-r from-amber-800 to-stone-700 text-white px-5 py-2 rounded-full text-sm shadow-2xl hover:shadow-amber-600/40 hover:scale-105 transition-all duration-300 border-2 border-white/20"
        >
          ← Về trang chủ
        </button>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-[2500ms]`}
      />

      {stars.map((star, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white animate-pulse pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            opacity: isForestBright ? 0.9 : 0.3,
          }}
        />
      ))}

      {isForestBright && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-900/40 to-transparent pointer-events-none transition-opacity duration-2000" />
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="absolute bottom-0 transition-all duration-1000 ease-out pointer-events-none"
              style={{
                left: `${tree.x}%`,
                width: `${tree.width}px`,
                height: `${tree.height}px`,
                opacity: tree.opacity,
                transitionDelay: `${tree.delay}s`,
                transform:
                  tree.opacity > 0 ? "translateY(0)" : "translateY(50px)",
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-green-900 via-green-800 to-green-700 rounded-t-full" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-green-800 to-green-600 rounded-t-full blur-sm opacity-50" />
              </div>
            </div>
          ))}
          {floatingFireflies.map((f) => (
            <div
              key={f.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: `${f.size}px`,
                height: `${f.size}px`,
                animation: `floatFirefly ${f.duration}s infinite ease-in-out`,
                animationDelay: `${f.delay}s`,
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-yellow-300 rounded-full blur-md opacity-70" />
                <div className="absolute inset-0 bg-yellow-200 rounded-full" />
              </div>
            </div>
          ))}
        </>
      )}

      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className={`absolute inset-0 ${
          fireflies.length < 10 ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {fireflies.map((f) => (
          <div
            key={f.id}
            className="absolute pointer-events-none"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="relative"
              style={{ width: `${f.size}px`, height: `${f.size}px` }}
            >
              <div
                className="absolute inset-0 rounded-full bg-yellow-300 blur-md"
                style={{
                  opacity: f.brightness * 0.7,
                  boxShadow: `0 0 ${f.size * 2.5}px ${
                    f.size * 1.2
                  }px rgba(250,204,21,${f.brightness * 0.5})`,
                }}
              />
              <div
                className="absolute inset-0 rounded-full bg-yellow-100"
                style={{ opacity: f.brightness }}
              />
            </div>
          </div>
        ))}

        {clickParticles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.life / 30,
              transform: `translate(-50%, -50%) scale(${
                1 + (30 - p.life) / 30
              })`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
        ))}
      </div>

      {/* Beautiful Letter Design */}
      <div
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 max-w-3xl px-6 z-10 ${
          showWhisper ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative">
          {/* Decorative corners */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300/60 rounded-tl-lg"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300/60 rounded-tr-lg"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/60 rounded-bl-lg"></div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/60 rounded-br-lg"></div>

          {/* Main letter card */}
          <div className="bg-gradient-to-br from-amber-50/95 via-white/90 to-amber-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-amber-200/50 overflow-hidden">
            {/* Decorative header */}
            <div className="bg-gradient-to-r from-amber-100/50 via-yellow-50/50 to-amber-100/50 border-b border-amber-200/30 py-4 px-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
                <Heart className="w-5 h-5 text-rose-400 animate-pulse drop-shadow-sm" />
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <Heart className="w-5 h-5 text-rose-400 animate-pulse drop-shadow-sm" />
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
              </div>
              <p className="text-center text-amber-800/60 text-sm font-light mt-2 tracking-widest">
                LỜI NHẮN TỪ Healink Family
              </p>
            </div>

            {/* Letter content */}
            <div className="px-10 py-8 max-h-96 overflow-y-auto">
              <div className="relative">
                {/* Decorative quotation marks */}
                <div className="absolute -top-2 -left-4 text-6xl text-amber-300/40 font-serif leading-none">
                  "
                </div>
                <div className="absolute -bottom-6 -right-4 text-6xl text-amber-300/40 font-serif leading-none">
                  "
                </div>

                <p className="text-lg md:text-xl text-slate-700 text-center font-light leading-relaxed tracking-wide whitespace-pre-line relative z-10 py-2">
                  {currentWhisper}
                </p>
              </div>
            </div>

            {/* Decorative footer */}
            <div className="bg-gradient-to-r from-amber-100/30 via-yellow-50/30 to-amber-100/30 border-t border-amber-200/30 py-3 px-8">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400/50"></div>
                <div className="w-2 h-2 rounded-full bg-rose-400/50"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400/50"></div>
              </div>
            </div>
          </div>

          {/* Soft shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 to-rose-300/10 rounded-2xl blur-xl -z-10 transform scale-105"></div>
        </div>
      </div>

      {isForestBright && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-[fadeIn_1s_ease-out]">
          <button
            onClick={resetForest}
            className="bg-gradient-to-r from-amber-800 to-stone-700 text-white px-10 py-4 rounded-full font-light text-lg shadow-2xl hover:shadow-amber-600/40 hover:scale-105 transition-all duration-300 border-2 border-white/20"
          >
            Bắt đầu hành trình mới
          </button>
        </div>
      )}

      {!isForestBright && fireflies.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-6 px-6">
            <div className="text-8xl mb-4 animate-pulse">🌙</div>
            <h1 className="text-5xl md:text-6xl font-light text-white tracking-wide">
              Healink Trong Tim
            </h1>
            <p className="text-xl text-white/70 font-light max-w-md mx-auto">
              Chạm để thắp sáng hy vọng trong đêm tối
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes floatFirefly {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          25% { transform: translate(15px, -20px); opacity: 1; }
          50% { transform: translate(30px, -10px); opacity: 0.8; }
          75% { transform: translate(15px, 5px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

export default Game;
