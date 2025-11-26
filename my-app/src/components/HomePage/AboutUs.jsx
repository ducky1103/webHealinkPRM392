import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Users, Heart, Mic, BookOpen, Coffee, Lightbulb } from "lucide-react";
import logo from "../../img/logo.jpg";
function AboutUs() {
  return (
    <>
      <Header />
      <div className="font-sans text-slate-800 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#B86933] text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <img
                  src={logo}
                  className="object-contain rounded-full w-full h-full "
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Healink xin chào,
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Nơi bạn tìm kiếm sự bình an, kết nối và sự phát triển bền vững
            </p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
                Triết lý của chúng tôi
              </h2>
              <div className="flex flex-wrap justify-center gap-8 text-amber-700 font-semibold text-lg mb-12">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Chánh niệm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-5 h-5" />
                  <span>Sự ấm áp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Phát triển</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100">
              <p className="text-center font-semibold text-lg text-amber-800 mb-8">
                Chúng tôi mong muốn nâng cao sức khỏe tinh thần thông qua cảm
                hứng hàng ngày và các podcast.
              </p>

              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                  <h3 className="font-bold text-amber-800 text-lg mb-3 flex items-center">
                    <span className="text-2xl mr-3">🧘</span>
                    Về Healink – Không gian chữa lành nhẹ nhàng mỗi ngày
                  </h3>
                  <p>
                    Tại Healink, chúng tôi tin rằng mỗi người đều xứng đáng có
                    một nơi để dừng lại, để sâu lắng nghe chính mình, để chữa
                    lành và phát triển. Healink mang đến một không gian tinh
                    thần – nơi bạn tìm thấy những podcast thư thái, các hoạt
                    động cộng đồng và những phút giây chánh niệm, giúp bạn kết
                    nối lại với giá trị tinh thần giáo dục sâu sắc.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
                  <h3 className="font-bold text-amber-800 text-lg mb-3 flex items-center">
                    <span className="text-2xl mr-3">🌟</span>
                    Sứ mệnh của chúng tôi
                  </h3>
                  <p className="mb-4">
                    Chúng tôi không chữa lành cho bạn – chúng tôi trao công cụ
                    để bạn tự chữa lành.
                  </p>
                  <p className="mb-6">
                    Healink không chỉ là một nơi để dừng lại, Healink hướng bạn
                    đến những giá trị bền vững từ bên trong, tạo dựng một nền
                    tảng chăm sóc tinh thần lành mạnh giúp bạn phát triển, sống
                    an lành và bền vững.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: "🌱",
                        text: "Tạo không gian an toàn, nơi chính mình, với chính mình.",
                      },
                      {
                        icon: "🤝",
                        text: "Kết nối giữa con người với con người, giữa những người thực sự hiểu nhau.",
                      },
                      {
                        icon: "🎧",
                        text: "Podcast thư giãn, viết nhật ký, những trải nghiệm chữa lành nhẹ nhàng.",
                      },
                      {
                        icon: "💡",
                        text: "Hoạt động cộng đồng, nuôi dưỡng năng lượng tích cực mỗi ngày.",
                      },
                      {
                        icon: "📖",
                        text: "Học tập và phát triển tư duy bền vững.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border-l-4 border-amber-500">
                  <p className="font-medium text-amber-800 italic">
                    "Healink không chỉ là một nơi để dừng lại, mà còn là nơi để
                    vươn lên – từ chuyện chữa lành đến phát triển, để những
                    người trẻ tuổi tìm thấy giá trị tinh thần bền vững cho chính
                    mình."
                  </p>
                </div>

                <div className="text-center p-6 bg-amber-800 text-white rounded-2xl">
                  <p className="text-lg font-medium">
                    Dừng lại để bình an, để yêu bản thân, để kết nối lại, để yêu
                    giá trị chỉ 5 phút mỗi ngày – Healink luôn sẵn sàng ở đây,
                    như một chiếc ô giữa cơn mưa cảm xúc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
              Đối Tác Của Chúng Tôi
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {Array(6)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="group h-20 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-amber-100 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg group-hover:from-amber-300 group-hover:to-amber-400 transition-colors"></div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Job Positions Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
              Vị Trí Tuyển Dụng
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: "🎤", title: "Podcast Host" },
                { icon: "✍️", title: "Content Writer" },
                { icon: "⚙️", title: "Developer" },
                { icon: "📱", title: "Mobile Dev" },
                { icon: "📧", title: "Marketing" },
                { icon: "🔗", title: "Community" },
              ].map((job, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer border border-amber-200"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {job.icon}
                  </div>
                  <p className="text-sm font-medium text-amber-800">
                    {job.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Nguyễn Xuân Huy", role: "COO", avatar: "👨‍💼" },
                { name: "Vũ Minh Đức", role: "CTO", avatar: "👨‍💻" },
                { name: "Danh Tuấn Đạt", role: "Developer", avatar: "👨‍💻" },
                { name: "Lê Thị Cao Ngân", role: "CFO", avatar: "👩‍💼" },
                { name: "Nguyễn Ngọc Xuân Thùy", role: "CMO", avatar: "👩‍✍️" },
                { name: "Trần Ngọc Minh", role: "CMO", avatar: "👩‍🎨" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-amber-100 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                    {member.avatar}
                  </div>
                  <h4 className="text-lg font-bold text-amber-800 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-amber-600 font-medium">{member.role}</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors cursor-pointer">
                      <Users className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
