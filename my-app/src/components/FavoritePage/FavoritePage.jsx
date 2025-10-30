import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, Play, Calendar, Clock, User } from "lucide-react";
import Header from "../HomePage/Header";
import { getFavoriteRequest } from "../../redux/User/favoritePodcast/get_favorite/getFavoriteSlice";
import { removeFavoriteRequest } from "../../redux/User/favoritePodcast/remove_favorite/removeFavoriteSlice";

const FavoritePage = () => {
  const dispatch = useDispatch();
  const { favoritePodcasts, loading } = useSelector(
    (state) => state.getFavorite
  );
  const { user } = useSelector((state) => state.account);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Fetch favorite podcasts when component mounts
  useEffect(() => {
    if (user) {
      dispatch(getFavoriteRequest({ page: currentPage, size: pageSize }));
    }
  }, [dispatch, user, currentPage]);

  // Handle remove favorite
  const handleRemoveFavorite = (podcastId) => {
    dispatch(removeFavoriteRequest(podcastId));
    // Reload favorites after remove
    setTimeout(() => {
      dispatch(getFavoriteRequest({ page: currentPage, size: pageSize }));
    }, 1000);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    (favoritePodcasts?.totalElements || 0) / pageSize
  );

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-800 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <Heart className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Vui lòng đăng nhập</h1>
            <p className="text-amber-200 mb-6">
              Bạn cần đăng nhập để xem danh sách yêu thích.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Đăng nhập ngay
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Podcast Yêu Thích
            </h1>
            <p className="text-lg text-amber-200">
              Danh sách podcast bạn đã thêm vào yêu thích
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-300 text-lg">
                Đang tải danh sách yêu thích...
              </p>
            </div>
          ) : favoritePodcasts &&
            favoritePodcasts.content &&
            favoritePodcasts.content.length > 0 ? (
            <>
              {/* Podcast Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {favoritePodcasts.content.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="bg-amber-100/10 border border-amber-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
                  >
                    {/* Podcast Image */}
                    <div className="relative mb-4">
                      {favorite.podcastImage ? (
                        <img
                          src={favorite.podcastImage}
                          alt={favorite.podcastTitle}
                          className="w-full h-40 object-cover rounded-xl"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div className="hidden w-full h-40 bg-amber-800 rounded-xl items-center justify-center">
                        <Play className="w-10 h-10 text-amber-400" />
                      </div>

                      {/* Remove Favorite Button */}
                      <button
                        onClick={() => handleRemoveFavorite(favorite.podcastId)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Xóa khỏi yêu thích"
                      >
                        <Heart size={14} className="fill-current" />
                      </button>
                    </div>

                    {/* Podcast Info */}
                    <div className="flex flex-col h-full">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                          {favorite.podcastTitle}
                        </h3>

                        <div className="flex items-center gap-2 text-amber-300 text-sm">
                          <User size={16} />
                          <span>{favorite.username}</span>
                        </div>

                        <div className="flex items-center justify-between text-amber-400 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {favorite.active ? "Hoạt động" : "Không hoạt động"}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto pt-4">
                        <Link
                          to={`/podcast/${favorite.podcastId}`}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Play size={16} />
                          Nghe Podcast
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Trước
                  </button>

                  <span className="px-4 py-2 text-amber-200">
                    Trang {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">
                Chưa có podcast yêu thích
              </h2>
              <p className="text-amber-200 mb-6">
                Hãy khám phá và thêm podcast vào danh sách yêu thích của bạn!
              </p>
              <Link
                to="/podcast"
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Khám phá Podcast
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
