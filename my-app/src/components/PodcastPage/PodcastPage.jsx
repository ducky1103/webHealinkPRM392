/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import { Headset, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPostcastRequest } from "../../redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSlice";

const PodcastPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const {
    fetchPodcast: allPodcasts,
    loading,
    error,
  } = useSelector((state) => state.fetchPodcast);
  const { fetchCategpory: allCategories } = useSelector(
    (state) => state.fetchCategory
  );

  // Local pagination state
  const [page, setPage] = useState(1);
  const podcastsPerPage = 8;

  // Fetch ALL podcasts once (không thay đổi saga)
  useEffect(() => {
    dispatch(fetchPostcastRequest({}));
  }, [dispatch]);

  // Calculate pagination manually
  const totalPodcasts = allPodcasts?.length || 0;
  const totalPages = Math.ceil(totalPodcasts / podcastsPerPage);

  // Get current page podcasts
  const indexOfLastPodcast = page * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts =
    allPodcasts?.slice(indexOfFirstPodcast, indexOfLastPodcast) || [];

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải podcast...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-red-600">
            <p>Lỗi khi tải podcast: {error}</p>
            <button
              onClick={() => dispatch(fetchPostcastRequest({}))}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Thử lại
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-10 space-x-4 text-amber-600">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
            Khám Phá Podcast Chữa Lành
          </h1>
          <Headset className="mb-8 size-fit" />
        </div>

        {/* Podcast Grid */}
        {currentPodcasts?.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6 text-slate-700 border-l-4 border-indigo-500 pl-3">
                Tất cả Podcast ({totalPodcasts} bài) - Trang {page}/{totalPages}
              </h2>

              {/* Grid 4x2 (4 podcasts per row, 2 rows = 8 total) */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentPodcasts.map((podcast) => (
                  <div
                    key={podcast.id}
                    className="group cursor-pointer bg-amber-100 border rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
                    onClick={() => navigate(`/podcast/${podcast.id}`)}
                  >
                    {/* Podcast Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-amber-200 to-amber-400">
                      {podcast.imageUrl ? (
                        <img
                          src={podcast.imageUrl}
                          alt={podcast.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Fallback when no image */}
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-400">
                        <Headset className="w-16 h-16 text-amber-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-amber-600 line-clamp-2 mb-2">
                        {podcast.title || "Podcast Title"}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {podcast.description || "Podcast description..."}
                      </p>

                      {/* Optional: Show created date */}
                      {podcast.createdAt && (
                        <p className="text-xs text-slate-400 mt-2">
                          {new Date(podcast.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                {/* Previous button */}
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`p-2 rounded-lg ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`px-3 py-2 rounded-lg ${
                        page === pageNumber
                          ? "bg-amber-600 text-white"
                          : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className={`p-2 rounded-lg ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : totalPodcasts === 0 ? (
          <div className="text-center py-12">
            <Headset className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Chưa có podcast nào để hiển thị.</p>
            <button
              onClick={() => dispatch(fetchPostcastRequest({}))}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Tải lại
            </button>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default PodcastPage;
