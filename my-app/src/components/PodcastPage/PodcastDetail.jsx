import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Headset,
  Calendar,
  Clock,
  ArrowLeft,
  Edit2,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../HomePage/Header";
import { message, Popconfirm } from "antd";

import { getComments } from "../../redux/User/comment/fetch_comment/fetchCommentSlice";
import {
  postComment,
  resetPostComment,
} from "../../redux/User/comment/post_comment/postCommentSilce";
import { updateCommentRequest } from "../../redux/User/comment/update_comment/updateCommentSlice";
import { deleteCommentRequest } from "../../redux/User/comment/delete_comment/deleteCommentSlice";
import { fetchPostcastRequest } from "../../redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSlice";

const PodcastDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fetchPodcast: podcasts, loading: loadingPodcasts } = useSelector(
    (state) => state.fetchPodcast
  );
  const { comments, loading: loadingComments } = useSelector(
    (state) => state.getComments
  );
  const { loading: postingComment, success: commentSuccess } = useSelector(
    (state) => state.postComment
  );
  const { user } = useSelector((state) => state.account);

  // Find podcast by ID from Redux store
  const podcast = podcasts?.find((p) => p.id.toString() === id);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Fetch comments when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getComments(id));
    }
  }, [dispatch, id]);

  // Fetch podcast if not found in store (when refresh page)
  useEffect(() => {
    if (id && (!podcasts || podcasts.length === 0)) {
      dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    }
  }, [dispatch, id, podcasts]);

  // Reset comment form after successful post
  useEffect(() => {
    if (commentSuccess) {
      setNewComment("");
      dispatch(resetPostComment());
      // Reload comments
      dispatch(getComments(id));
    }
  }, [commentSuccess, dispatch, id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      message.error("⚠ Bình luận không được để trống!");
      return;
    }

    if (!user) {
      message.error("⚠ Vui lòng đăng nhập để bình luận!");
      return;
    }

    dispatch(
      postComment({
        podcastId: parseInt(id),
        commentUser: user.username || "Ẩn danh",
        content: newComment,
      })
    );
  };

  // Handle edit comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  // Handle update comment
  const handleUpdateComment = () => {
    if (editContent.trim() === "") {
      message.error("⚠ Bình luận không được để trống!");
      return;
    }

    dispatch(
      updateCommentRequest({
        commentId: editingCommentId,
        podcastId: parseInt(id),
        commentUser: user.username || "Ẩn danh",
        content: editContent,
      })
    );

    // Reset edit state
    setEditingCommentId(null);
    setEditContent("");

    // Reload comments after update
    setTimeout(() => {
      dispatch(getComments(id));
    }, 1000);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  // Handle delete comment
  const handleDeleteComment = (comment) => {
    // Kiểm tra quyền xóa - chỉ người comment mới xóa được
    if (!user) {
      message.error("⚠ Vui lòng đăng nhập để thực hiện thao tác này!");
      return;
    }

    if (comment.commentUser !== user.username) {
      message.error("⚠ Bạn chỉ có thể xóa bình luận của chính mình!");
      return;
    }

    dispatch(deleteCommentRequest(comment.id));
    // Reload comments after delete
    setTimeout(() => {
      dispatch(getComments(id));
    }, 1000);
  };

  // Show loading while fetching podcast
  if (loadingPodcasts) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <h1 className="text-3xl font-bold mb-4">Đang tải podcast...</h1>
            <p className="text-amber-200">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </>
    );
  }

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
              Bình luận ({comments.length || 0})
            </h2>

            {/* Add comment form */}
            <div className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ cảm nghĩ của bạn về podcast này..."
                className="w-full p-4 rounded-lg bg-amber-100/20 border border-amber-700 text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-24"
                disabled={postingComment}
              />
              <button
                onClick={handleAddComment}
                disabled={postingComment}
                className={`mt-4 px-6 py-2 rounded-lg text-white transition-all duration-300 font-medium flex items-center gap-2 ${
                  postingComment
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700"
                }`}
              >
                {postingComment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <span>Gửi bình luận</span>
                )}
              </button>
            </div>

            {/* Comments list */}
            {loadingComments ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-400 mx-auto"></div>
                <p className="text-amber-300 mt-4">Đang tải bình luận...</p>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-amber-100/20 rounded-lg border border-amber-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-200">
                        {comment.commentUser || "Ẩn danh"}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-amber-400">
                          {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleString(
                                "vi-VN"
                              )
                            : ""}
                        </span>
                        {/* Chỉ hiển thị nút Edit/Delete nếu user đã đăng nhập và là chủ sở hữu comment */}
                        {user && comment.commentUser === user.username && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditComment(comment)}
                              className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                              title="Chỉnh sửa bình luận"
                            >
                              <Edit2 size={16} />
                            </button>
                            <Popconfirm
                              title="Xóa bình luận"
                              description="Bạn có chắc chắn muốn xóa bình luận này?"
                              onConfirm={() => handleDeleteComment(comment)}
                              okText="Xóa"
                              cancelText="Hủy"
                              okType="danger"
                            >
                              <button
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                title="Xóa bình luận"
                              >
                                <Trash2 size={16} />
                              </button>
                            </Popconfirm>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hiển thị nội dung comment hoặc form edit */}
                    {editingCommentId === comment.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-3 rounded-lg bg-amber-100/20 border border-amber-600 text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-20"
                          placeholder="Chỉnh sửa bình luận..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdateComment}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check size={16} />
                            Lưu
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                          >
                            <X size={16} />
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white">{comment.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-amber-200">
                <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PodcastDetail;
