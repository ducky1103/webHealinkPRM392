/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiMail,
  FiCoffee,
} from "react-icons/fi";
import { IoLeafOutline, IoSunnyOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80",
      title: "Healink",
      subtitle: "Bình yên bắt đầu từ trái tim bạn",
      description:
        "Khám phá hành trình chữa lành và tìm lại sự cân bằng trong cuộc sống",
      primaryBtn: "Khám phá ngay",
      secondaryBtn: "Tìm hiểu thêm",
      primaryAction: () => navigate("/podcast"),
      secondaryAction: () => navigate("/about-us"),
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
      title: "Healink",
      subtitle: "Hành trình chữa lành của bạn",
      description:
        "Sản phẩm thiên nhiên giúp bạn tìm lại sự bình an và thư thái",
      primaryBtn: "Mua sắm ngay",
      secondaryBtn: "Liên hệ tư vấn",
      primaryAction: () => navigate("/store"),
      secondaryAction: () => navigate("/about-us"),
    },
  ];

  const floatingIcons = [
    { Icon: FiCoffee, delay: 0, position: "top-[10%] left-[15%]" },
    { Icon: FiMail, delay: 1, position: "top-[25%] right-[20%]" },
    { Icon: IoLeafOutline, delay: 2, position: "bottom-[20%] left-[10%]" },
    { Icon: IoSunnyOutline, delay: 3, position: "top-[60%] right-[15%]" },
    { Icon: FiHeart, delay: 4, position: "bottom-[10%] right-[30%]" },
  ];

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="relative w-full h-full">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center z-10">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                {/* Logo & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiHeart className="text-5xl md:text-6xl text-red-400" />
                  </motion.div>
                  <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-wider drop-shadow-2xl">
                    {slides[currentSlide].title}
                  </h1>
                </div>

                {/* Subtitle */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-3xl md:text-5xl font-semibold text-amber-100 mb-6 drop-shadow-lg"
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl text-amber-50 mb-10 max-w-2xl leading-relaxed drop-shadow-md"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={slides[currentSlide].primaryAction}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-lg font-semibold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slides[currentSlide].primaryBtn}
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  <button
                    onClick={slides[currentSlide].secondaryAction}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    {slides[currentSlide].secondaryBtn}
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {floatingIcons.map(({ Icon, delay, position }, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 0, rotate: 0 }}
                  animate={{
                    y: [-20, 0, -20],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: delay,
                  }}
                  className={`absolute ${position}`}
                >
                  <Icon className="text-4xl md:text-5xl text-white/30" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/90 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
      >
        <FiChevronLeft className="text-2xl md:text-3xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-600/90 hover:bg-amber-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl backdrop-blur-sm"
      >
        <FiChevronRight className="text-2xl md:text-3xl" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-amber-600"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroCarousel;
