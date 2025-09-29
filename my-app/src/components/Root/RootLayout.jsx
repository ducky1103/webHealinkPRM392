import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      {/* Navbar / Header ở đây */}
      <Outlet /> {/* chỗ để render HomePage, Login */}
    </div>
  );
}
