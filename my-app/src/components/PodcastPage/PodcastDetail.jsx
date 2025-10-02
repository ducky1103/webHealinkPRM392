import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Headset, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../HomePage/Header";
import toast from "react-hot-toast";

const PodcastDetail = () => {
  const { id } = useParams();
  const { fetchPodcast: podcasts } = useSelector((state) => state.fetchPodcast);

  // Find podcast by ID from Redux store
  const podcast = podcasts?.find((p) => p.id.toString() === id);

  // Comments state
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
    toast.success("Đã thêm bình luận!");
  };

  // If podcast not found in Redux, show not found
  if (!podcast) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <Headset className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Podcast không tồn tại</h1>
            <p className="text-amber-200 mb-6">
              Podcast bạn tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link
              to="/podcast"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Back button */}
          <Link
            to="/podcast"
            className="inline-flex items-center text-amber-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách podcast
          </Link>

          {/* Podcast Info */}
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-full md:w-1/3">
              {podcast.imageUrl ? (
                <img
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  className="rounded-xl shadow-lg object-cover w-full aspect-square"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                {podcast.title}
              </h1>
              <p className="text-lg text-amber-100 mb-8 leading-relaxed">
                {podcast.description || "Không có mô tả cho podcast này."}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-amber-300 mb-6">
                {podcast.author && (
                  <span className="flex items-center gap-2">
                    <span className="text-amber-400">👤</span> {podcast.author}
                  </span>
                )}

                {podcast.createdAt && (
                  <span className="flex items-center gap-2">
                    <Calendar size={18} />
                    {new Date(podcast.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                )}

                {podcast.duration && (
                  <span className="flex items-center gap-2">
                    <Clock size={18} /> {podcast.duration}
                  </span>
                )}

                {podcast.category && (
                  <span className="flex items-center gap-2 bg-amber-700 px-3 py-1 rounded-full text-sm">
                    <span>🏷️</span> {podcast.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="mt-12 bg-amber-100/10 border border-amber-800 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-bold mb-4">Nghe Podcast</h2>
            {podcast.audioUrl ? (
              <audio
                controls
                src={podcast.audioUrl}
                className="w-full"
                preload="metadata"
              >
                Trình duyệt của bạn không hỗ trợ audio player.
              </audio>
            ) : (
              <div className="text-center py-8 text-amber-200">
                <Headset className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Audio chưa được upload cho podcast này.</p>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-12 bg-amber-100/10 border border-amber-800 rounded-2xl p-6 shadow-inner">
            <h2 className="text-2xl font-bold mb-6">
              Bình luận ({comments.length})
            </h2>

            {/* Add comment form */}
            <div className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ cảm nghĩ của bạn về podcast này..."
                className="w-full p-4 rounded-lg bg-amber-100/20 border border-amber-700 text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-24"
              />
              <button
                onClick={handleAddComment}
                className="mt-4 px-6 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all duration-300 font-medium"
              >
                Gửi bình luận
              </button>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-amber-100/20 rounded-lg border border-amber-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-200">
                      {comment.name}
                    </span>
                    <span className="text-sm text-amber-400">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-white">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastDetail;
