import { Outlet } from "react-router-dom";
import MiniPlayer from "../MiniPlayer/MiniPlayer";

export default function RootLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background for Glass Distortion Effect */}
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)
          `,
          animation: 'moveBackground 20s ease-in-out infinite',
        }}
      ></div>
      
      {/* Navbar / Header ở đây */}
      <Outlet /> {/* chỗ để render HomePage, Login */}
      <MiniPlayer />
    </div>
  );
}
