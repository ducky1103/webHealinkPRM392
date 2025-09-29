import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";

import img7 from "../../img/7.jpg";
import img9 from "../../img/9.jpg";
import img10 from "../../img/10.jpg";
import Header from "../HomePage/Header";
import { toast } from "react-toastify";

// Mock data
const mockPodcasts = [
  {
    id: "1",
    title: "Podcast 1",
    description: "Đây là nội dung chi tiết của Podcast 1.",
    image: img7,
    audioUrl: "/audio/audio1.mp3",
    author: "Tech Creative Podcast",
    date: "15 Tháng 1, 2025",
    duration: "45:32",
    category: "Technology",
  },
  {
    id: "2",
    title: "Podcast 2",
    description: "Đây là nội dung chi tiết của Podcast 2.",
    image: img9,
    audioUrl: "/audio/audio2.mp3",
    author: "Design Radio",
    date: "20 Tháng 2, 2025",
    duration: "30:15",
    category: "Design",
  },
  {
    id: "3",
    title: "Podcast 3",
    description: "Đây là nội dung chi tiết của Podcast 3.",
    image: img10,
    audioUrl: "/audio/audio3.mp3",
    author: "Startup Talks",
    date: "3 Tháng 3, 2025",
    duration: "55:50",
    category: "Business",
  },
];

const PodcastDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const podcast = mockPodcasts.find((p) => p.id === id) || mockPodcasts[0];

  // State cho phần bình luận
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Ẩn danh",
      content: "Podcast rất hay và ý nghĩa!",
      time: "1 giờ trước",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      content: "Cảm ơn vì nội dung tuyệt vời!",
      time: "2 giờ trước",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      toast.error("Bình luận không được để trống!");
      return;
    }
    const newCommentData = {
      id: comments.length + 1,
      name: "Ẩn danh",
      content: newComment,
      time: "Vừa xong",
    };
    setComments([newCommentData, ...comments]);
    setNewComment("");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Info */}
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-full md:w-1/3">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="rounded-xl shadow-lg object-cover w-full aspect-square"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                {podcast.title}
              </h1>
              <p className="text-lg text-amber-100 mb-8 leading-relaxed">
                {podcast.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-amber-300 mb-6">
                <span className="flex items-center gap-2">
                  <span className="text-amber-400">👤</span> {podcast.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={18} /> {podcast.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} /> {podcast.duration}
                </span>
                <span className="flex items-center gap-2 bg-amber-700 px-3 py-1 rounded-full text-sm">
                  <Tag size={16} /> {podcast.category}
                </span>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className="mt-12 bg-amber-100/10 border border-amber-800 rounded-2xl p-6 shadow-inner">
            <audio controls src={podcast.audioUrl} className="w-full" />
          </div>

          {/* Comments Section */}
          <div className="mt-12 bg-amber-100/10 border border-amber-800 rounded-2xl p-6 shadow-inner">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-amber-100/20 rounded-lg border border-amber-700"
                >
                  <p className="text-sm text-amber-300">
                    <span className="font-bold">{comment.name}</span> -{" "}
                    {comment.time}
                  </p>
                  <p className="text-white">{comment.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="w-full p-3 rounded-lg bg-amber-100/20 border border-amber-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
              <button
                onClick={handleAddComment}
                className="mt-4 w-full rounded-lg bg-amber-600 text-white py-2 hover:bg-amber-700 transition-all duration-300"
              >
                Gửi bình luận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastDetail;
