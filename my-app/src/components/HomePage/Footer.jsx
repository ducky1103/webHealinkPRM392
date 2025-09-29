import React from "react";
import logo from "../../img/logo.jpg";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Part 1 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Kết nối với chúng tôi</h3>
          <img src={logo} alt="Healink Logo" className="w-24 rounded-lg" />
          <div className="flex gap-3 mt-3">
            {["f", "i", "in"].map((s, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white text-lg font-bold transition-all duration-300 hover:scale-110 hover:bg-amber-500 shadow-md"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Part 2 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">AIMER GROUP</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Podcast
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Về chúng tôi
              </a>
            </li>
          </ul>
        </div>

        {/* Part 3 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Chăm sóc khách hàng</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Hỗ trợ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Điều khoản và điều kiện
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>

        {/* Part 4 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Hãy liên hệ với chúng tôi</h3>
          <p>
            Email: <span className="text-amber-400">healink@gmail.com</span>
          </p>
          <p>
            Phone: <span className="text-amber-400">0909 090 909</span>
          </p>
          <p>
            Address: <span className="text-amber-400">1234567890</span>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Healink. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
