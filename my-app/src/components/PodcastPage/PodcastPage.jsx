import React from "react";
import { useNavigate } from "react-router-dom";
import img7 from "../../img/7.jpg";
import img9 from "../../img/9.jpg";
import img10 from "../../img/10.jpg";
import img11 from "../../img/11.jpg";
import img8 from "../../img/8.jpg";
import Header from "../HomePage/Header";
import { Headset } from "lucide-react";
import Footer from "../HomePage/Footer";
const PodcastPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Chữa lành tâm hồn",
      podcasts: [
        {
          id: 1,
          title: "Podcast 1",
          description: "Tâm hồn bình an",
          image: img7,
        },
        {
          id: 2,
          title: "Podcast 2",
          description: "Học cách yêu thương",
          image: img8,
        },
        {
          id: 3,
          title: "Podcast 2",
          description: "Học cách love",
          image: img9,
        },
        {
          id: 4,
          title: "Podcast 2",
          description: "Học cách love",
          image: img9,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 4,
          title: "Podcast 2",
          description: "Học cách love",
          image: img9,
        },
        {
          id: 4,
          title: "Podcast 2",
          description: "Học cách love",
          image: img9,
        },
        {
          id: 4,
          title: "Podcast 2",
          description: "Học cách love",
          image: img9,
        },
      ],
    },
    {
      title: "Phát triển bản thân",
      podcasts: [
        {
          id: 3,
          title: "Podcast 3",
          description: "Tư duy tích cực",
          image: img10,
        },
        {
          id: 4,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 5,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
        {
          id: 6,
          title: "Podcast 4",
          description: "Kỹ năng sống",
          image: img11,
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-center mb-10 space-x-4 text-amber-600">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center ">
            Khám Phá Podcast Chữa Lành
          </h1>
          <Headset className="mb-8 size-fit" />
        </div>
        {/* Danh mục */}
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="mb-12">
              {/* Tiêu đề danh mục */}
              <h2 className="text-2xl font-bold mb-6 text-slate-700 border-l-4 border-indigo-500 pl-3">
                {category.title}
              </h2>

              {/* Grid podcast */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {category.podcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="group cursor-pointer bg-amber-100 border rounded-2xl shadow-sm hover:shadow-lg hover:scale-100 transition-all duration-300 overflow-hidden "
                    onClick={() => navigate(`/podcast/${podcast.id}`)}
                  >
                    {/* Ảnh podcast */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={podcast.image}
                        alt={podcast.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Nội dung */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-amber-300 line-clamp-1">
                        {podcast.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {podcast.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-600">
            Không có podcast nào để hiển thị.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PodcastPage;
