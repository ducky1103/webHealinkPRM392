/* eslint-disable no-unused-vars */
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.jpg";
import {
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Button,
  Card,
  Space,
  Tag,
  Popconfirm,
  message,
  Checkbox,
  Row,
  Col,
  Slider,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  FileImageOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { postPostcardRequest } from "../../redux/auth/admin/Podcast/post_postcard/postPoscastSlice";
import { deletePodcastRequest } from "../../redux/auth/admin/Podcast/delete_podcast/deletePodcastSlice";
import { updatePodcastRequest } from "../../redux/auth/admin/Podcast/update_podcast/updatePodcastSlice";
import { fetchPostcastRequest } from "../../redux/auth/admin/Podcast/fetch_podcast/fetchPodcastSlice";
import { fetchCategoryRequest } from "../../redux/auth/admin/Categories/fetch_category/fetchCategorySlice";
import { fetchPodcastByCategoryRequest } from "../../redux/User/podcast/get_podcast_by_category/getPodcastByCategorySlice";
import audioManager from "../../utils/audioManager";

const { TextArea } = Input;
const { Meta } = Card;

const categoryColors = {
  Healing: "green",
  "Giáo dục": "blue",
  "Âm nhạc": "purple",
  "Tin tức": "orange",
  "Sức khỏe": "red",
};

const AdminPodcastPage = () => {
  const dispatch = useDispatch();
  const { loading, error, createdPodcast } = useSelector(
    (state) => state.postPodcast
  );
  const {
    loading: fetchLoading,
    error: fetchError,
    fetchPodcast: fetchedPodcasts,
  } = useSelector((state) => state.fetchPodcast);
  const {
    loading: deleteLoading,
    error: deleteError,
    deletedPodcastId,
  } = useSelector((state) => state.deletePodcast);
  const { updateLoading, updateError, updatedPodcast } = useSelector(
    (state) => state.updatePodcast
  );
  const { fetchCategory: categories } = useSelector(
    (state) => state.fetchCategory
  );
  const { podcastsByCategory, loading: categoryLoading } = useSelector(
    (state) => state.fetchPodcastByCategory
  );

  const [podcasts, setPodcasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioDuration, setAudioDuration] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch podcasts on component mount
  useEffect(() => {
    dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    dispatch(fetchCategoryRequest());
  }, [dispatch]);

  // Cleanup audio when component unmounts or page changes
  useEffect(() => {
    return () => {
      audioManager.cleanup();
      setCurrentAudio(null);
      setAudioProgress({});
      setAudioDuration({});
    };
  }, []);

  // Update podcasts state when fetchedPodcasts changes
  useEffect(() => {
    if (fetchedPodcasts) {
      setPodcasts(fetchedPodcasts);
    }
  }, [fetchedPodcasts]);

  // Update podcasts when category changes
  useEffect(() => {
    console.log("=== Update podcasts effect ===");
    console.log("Selected category:", selectedCategory);
    console.log("Fetched podcasts:", fetchedPodcasts);
    console.log("Podcasts by category:", podcastsByCategory);
    console.log("Category loading:", categoryLoading);

    if (selectedCategory === "all") {
      if (fetchedPodcasts) {
        console.log("Setting all podcasts, count:", fetchedPodcasts.length);
        setPodcasts(fetchedPodcasts);
      }
    } else {
      // Only update if we have data, don't clear if still loading
      if (categoryLoading === false) {
        if (podcastsByCategory) {
          console.log(
            "Setting podcasts by category, count:",
            podcastsByCategory.length
          );
          setPodcasts(podcastsByCategory);
        } else {
          console.log("No podcasts found for category (empty response)");
          setPodcasts([]);
        }
      }
    }
  }, [selectedCategory, fetchedPodcasts, podcastsByCategory, categoryLoading]);

  // Refetch after successful create
  useEffect(() => {
    if (createdPodcast) {
      dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    }
  }, [createdPodcast, dispatch]);

  // Refetch after successful update
  useEffect(() => {
    if (updatedPodcast) {
      console.log("Podcast updated successfully:", updatedPodcast);
      dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    }
  }, [updatedPodcast, dispatch]);

  // Refetch after successful delete
  useEffect(() => {
    if (deletedPodcastId) {
      dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    }
  }, [deletedPodcastId, dispatch]);

  const handleAddPodcast = async () => {
    try {
      const values = await form.validateFields();

      console.log("Form values:", values); // Debug

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Fix: Handle multiple categories from checkbox
      if (values.categories && values.categories.length > 0) {
        // Convert array to JSON string for FormData
        formData.append("categoryIds", JSON.stringify(values.categories));
      } else {
        message.error("Vui lòng chọn ít nhất một thể loại!");
        return;
      }

      // Validate files
      if (!values.image?.fileList?.[0]?.originFileObj) {
        message.error("Vui lòng chọn ảnh thumbnail!");
        return;
      }
      if (!values.audio?.fileList?.[0]?.originFileObj) {
        message.error("Vui lòng chọn file âm thanh!");
        return;
      }

      formData.append("imageFile", values.image.fileList[0].originFileObj);
      formData.append("file", values.audio.fileList[0].originFileObj);

      // Debug FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }

      dispatch(postPostcardRequest(formData));

      form.resetFields();
      setOpen(false);
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      console.error("Validation Failed:", error);
    }
  };

  const handleDeletePodcast = (id) => {
    if (!id) {
      message.error("ID podcast không hợp lệ!");
      return;
    }

    // Stop audio if the deleted podcast is currently playing
    if (currentAudio && currentAudio.podcastId === id) {
      currentAudio.audio.pause();
      currentAudio.audio.remove();
      setCurrentAudio(null);
      setAudioProgress({});
      setAudioDuration({});
    }

    dispatch(deletePodcastRequest(id));
  };

  const handlePlayAudio = (audioUrl, podcastId) => {
    // Validate audioUrl
    if (!audioUrl) {
      message.error("Không có file âm thanh cho podcast này!");
      return;
    }

    // Check if URL is valid
    if (!audioUrl.startsWith("http") && !audioUrl.startsWith("/")) {
      message.error("Đường dẫn file âm thanh không hợp lệ!");
      return;
    }

    // If same audio is playing, pause it
    if (currentAudio && currentAudio.url === audioUrl) {
      currentAudio.audio.pause();
      setCurrentAudio(null);
      setAudioProgress((prev) => ({
        ...prev,
        [podcastId]: 0,
      }));
      return;
    }

    // Stop any currently playing audio
    audioManager.stopAllAudio();

    try {
      const audio = new Audio(audioUrl);

      // Prevent autoplay - only play when explicitly requested
      audio.preload = "metadata";
      audio.autoplay = false;

      audio.addEventListener("loadedmetadata", () => {
        setAudioDuration((prev) => ({
          ...prev,
          [podcastId]: audio.duration,
        }));
      });

      audio.addEventListener("timeupdate", () => {
        setAudioProgress((prev) => ({
          ...prev,
          [podcastId]: audio.currentTime,
        }));
      });

      audio.addEventListener("ended", () => {
        setCurrentAudio(null);
        setAudioProgress((prev) => ({
          ...prev,
          [podcastId]: 0,
        }));
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        message.error(
          "Không thể tải file âm thanh. File có thể không tồn tại!"
        );
        setCurrentAudio(null);
      });

      // Only play when user explicitly clicks
      audio
        .play()
        .then(() => {
          audioManager.setCurrentAudio(audio);
          setCurrentAudio({ audio, url: audioUrl, podcastId });
          console.log("Audio started playing:", audioUrl);
        })
        .catch((error) => {
          console.error("Play error:", error);
          message.error("Không thể phát âm thanh! Vui lòng kiểm tra file.");
        });
    } catch (error) {
      console.error("Audio creation error:", error);
      message.error("Lỗi khi tạo audio player!");
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeekAudio = (podcastId, seekTime) => {
    if (currentAudio && currentAudio.podcastId === podcastId) {
      currentAudio.audio.currentTime = seekTime;
      setAudioProgress((prev) => ({
        ...prev,
        [podcastId]: seekTime,
      }));
    }
  };

  const handleCategoryChange = (categoryName) => {
    console.log("🔄 Changing category to:", categoryName);

    // Stop any playing audio when changing category
    if (currentAudio) {
      currentAudio.audio.pause();
      currentAudio.audio.remove();
      setCurrentAudio(null);
      setAudioProgress({});
      setAudioDuration({});
    }

    setSelectedCategory(categoryName);

    // If "all", fetch all podcasts
    if (categoryName === "all") {
      console.log("📋 Fetching ALL podcasts");
      dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    } else {
      console.log("📂 Fetching podcasts for category ID:", categoryName);
      dispatch(fetchPodcastByCategoryRequest(categoryName));
    }
  };

  const handleUpdatePodcast = (podcast) => {
    console.log("📝 Podcast for update:", podcast);
    console.log("📝 Podcast categories:", podcast.categories);

    setSelectedPodcast(podcast);

    // Fix: Set multiple categories for update - handle both object and id
    const selectedCategories = podcast.categories
      ? podcast.categories
          .filter((cat) => cat && (cat.id != null || cat.categoryId != null))
          .map((cat) => cat.id || cat.categoryId)
      : [];

    console.log("✅ Selected categories for form:", selectedCategories);

    updateForm.setFieldsValue({
      title: podcast.title,
      categories: selectedCategories,
      description: podcast.description,
    });
    setUpdateOpen(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      const values = await updateForm.validateFields();

      console.log("Update values:", values); // Debug

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Fix: Handle multiple categories for update (same as post)
      if (values.categories && values.categories.length > 0) {
        formData.append("categoryIds", JSON.stringify(values.categories));
      } else {
        message.error("Vui lòng chọn ít nhất một thể loại!");
        return;
      }

      // Files are optional for update
      if (values.image?.fileList?.[0]?.originFileObj) {
        formData.append("imageFile", values.image.fileList[0].originFileObj);
      }

      if (values.audio?.fileList?.[0]?.originFileObj) {
        formData.append("file", values.audio.fileList[0].originFileObj);
      }

      // Debug FormData
      console.log("Update FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }

      dispatch(
        updatePodcastRequest({ id: selectedPodcast.id, updateData: formData })
      );

      updateForm.resetFields();
      setUpdateOpen(false);
      setSelectedPodcast(null);
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      console.error("Update validation error:", error);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1,
    showUploadList: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Quản lý Podcast
              </h1>
              <p className="text-gray-600">
                Tạo và quản lý nội dung podcast của bạn
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => {
                // Stop audio when opening modal
                if (currentAudio) {
                  currentAudio.audio.pause();
                  currentAudio.audio.remove();
                  setCurrentAudio(null);
                  setAudioProgress({});
                  setAudioDuration({});
                }
                setOpen(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg h-12 px-8 rounded-xl"
            >
              Đăng Podcast Mới
            </Button>
          </div>

          {/* Category Filter */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Button
                type="default"
                onClick={() => {
                  handleCategoryChange("all");
                }}
                className={
                  selectedCategory === "all"
                    ? "bg-[#C59B6D] border-[#C59B6D] hover:bg-[#A97942] text-white"
                    : "bg-[#F7E9D7] border-[#E4C9A2] hover:bg-[#EFD1A5] hover:border-[#C59B6D] text-[#8B5E34]"
                }
              >
                Tất cả
              </Button>

              {Array.isArray(categories) &&
                categories.map((category) => (
                  <Button
                    key={category.id}
                    type="default"
                    onClick={() => {
                      handleCategoryChange(category.name);
                    }}
                    className={
                      selectedCategory === category.name
                        ? "bg-[#C59B6D] border-[#C59B6D] hover:bg-[#A97942] text-white"
                        : "bg-[#F7E9D7] border-[#E4C9A2] hover:bg-[#EFD1A5] hover:border-[#C59B6D] text-[#8B5E34]"
                    }
                  >
                    {category.name}
                  </Button>
                ))}
            </div>
          </div>
        </div>
        {/* Loading State */}
        {fetchLoading || categoryLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500">Đang tải podcast...</p>
            </div>
          </div>
        ) : !podcasts || podcasts.length === 0 ? (
          <div className="text-center py-20">
            <div className="space-y-4">
              <div className="text-6xl text-gray-300">🎧</div>
              <h3 className="text-xl font-semibold text-gray-600">
                Chưa có podcast nào
              </h3>
              <p className="text-gray-500">Hãy tạo podcast đầu tiên của bạn!</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
              >
                Tạo Podcast Mới
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {podcasts.map((podcast) => (
              <Card
                key={podcast.id}
                hoverable
                className="rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white flex flex-col h-full"
                cover={
                  <div className="relative h-52 overflow-hidden">
                    <img
                      alt={podcast.title}
                      src={
                        podcast.imageUrl ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 drop-shadow-lg">
                        {podcast.title}
                      </h3>
                    </div>
                  </div>
                }
                bodyStyle={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Description with fixed height */}
                  <div className="flex-1 mb-3">
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed min-h-[3.5rem]">
                      {podcast.description}
                    </p>
                  </div>

                  {/* Audio Player */}
                  {currentAudio?.url === podcast.audioUrl && (
                    <div className="space-y-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 mb-3">
                      <Slider
                        min={0}
                        max={audioDuration[podcast.id] || 100}
                        value={audioProgress[podcast.id] || 0}
                        onChange={(value) => handleSeekAudio(podcast.id, value)}
                        tooltip={{ formatter: (value) => formatTime(value) }}
                      />
                      <div className="flex justify-between text-xs font-medium text-gray-600">
                        <span>{formatTime(audioProgress[podcast.id])}</span>
                        <span>{formatTime(audioDuration[podcast.id])}</span>
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 mb-3">
                    <div className="flex items-center space-x-1">
                      <SoundOutlined className="text-amber-600" />
                      <span>{podcast.duration || "N/A"}</span>
                    </div>
                    <span>
                      {new Date(podcast.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  {/* Action Buttons - Fixed at bottom */}
                  <div className="flex items-center justify-between pt-3 space-x-2 mt-auto">
                    <Button
                      type="text"
                      icon={
                        currentAudio?.url === podcast.audioUrl ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                      className={`text-amber-700 hover:text-amber-800 hover:bg-amber-50 border-0 flex-1 flex items-center justify-center ${
                        !podcast.audioUrl ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!podcast.audioUrl}
                      onClick={() => {
                        console.log("Podcast data:", podcast);
                        console.log("Audio URL:", podcast.audioUrl);
                        handlePlayAudio(podcast.audioUrl, podcast.id);
                      }}
                    >
                      {!podcast.audioUrl
                        ? "Không có audio"
                        : currentAudio?.url === podcast.audioUrl
                        ? "Dừng"
                        : "Phát"}
                    </Button>
                    <Button
                      type="text"
                      icon={<FileImageOutlined />}
                      className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 border-0 flex items-center justify-center"
                      onClick={() => {
                        // Stop audio when opening update modal
                        if (currentAudio) {
                          currentAudio.audio.pause();
                          currentAudio.audio.remove();
                          setCurrentAudio(null);
                          setAudioProgress({});
                          setAudioDuration({});
                        }
                        handleUpdatePodcast(podcast);
                      }}
                    >
                      Sửa
                    </Button>
                    <Popconfirm
                      title="Xóa podcast"
                      description="Bạn có chắc chắn muốn xóa podcast này?"
                      onConfirm={() => handleDeletePodcast(podcast?.id)}
                      okText="Xóa"
                      cancelText="Hủy"
                      okButtonProps={{ danger: true }}
                    >
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 border-0 flex items-center justify-center"
                      >
                        Xóa
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {/* Modal for Adding Podcast */};
        <Modal
          title={
            <div className="text-center text-xl font-semibold text-[#6B4F3B]">
              <span>
                <img
                  src={logo}
                  alt=""
                  className="w-8 h-8 rounded-md inline-block mr-2"
                />
              </span>{" "}
              Đăng Podcast Mới
            </div>
          }
          open={open}
          onCancel={() => {
            setOpen(false);
            form.resetFields();
          }}
          onOk={handleAddPodcast}
          okText="Đăng"
          cancelText="Hủy"
          confirmLoading={loading}
          width={600}
          className="rounded-2xl overflow-hidden"
          bodyStyle={{
            background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <Form form={form} layout="vertical">
            {/* Tên Podcast */}
            <Form.Item
              name="title"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Tên Podcast *
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập tên podcast" }]}
            >
              <Input
                placeholder="Nhập tên podcast..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>

            {/* Thể loại */}
            <Form.Item
              name="categories"
              label={
                <span className="text-[#6B4F3B] font-medium">Thể loại *</span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ít nhất một thể loại",
                  type: "array",
                  min: 1,
                },
              ]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 10]}>
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <Col span={12} key={cat.id}>
                        <Checkbox
                          value={cat.id.toString()}
                          className="flex items-center px-2 py-1 rounded-lg transition text-[#5B4636] hover:bg-[#f5efea]"
                          style={{
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          {cat.name}
                        </Checkbox>
                      </Col>
                    ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            {/* Mô tả */}
            <Form.Item
              name="description"
              label={
                <span className="text-[#6B4F3B] font-medium">Mô tả *</span>
              }
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea
                rows={3}
                placeholder="Nhập mô tả podcast..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>

            {/* Ảnh Thumbnail */}
            <Form.Item
              name="image"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Ảnh Thumbnail *
                </span>
              }
              rules={[
                { required: true, message: "Vui lòng tải ảnh thumbnail" },
              ]}
            >
              <Upload {...uploadProps} listType="picture" accept="image/*">
                <Button
                  icon={<UploadOutlined />}
                  className="rounded-lg border-[#DCC7B1] bg-[#fffaf6] hover:bg-[#f1ebe6] text-[#5B4636]"
                >
                  Chọn ảnh
                </Button>
              </Upload>
            </Form.Item>

            {/* File MP3 */}
            <Form.Item
              name="audio"
              label={
                <span className="text-[#6B4F3B] font-medium">File MP3 *</span>
              }
              rules={[
                { required: true, message: "Vui lòng tải file âm thanh" },
              ]}
            >
              <Upload {...uploadProps} accept=".mp3,audio/*">
                <Button
                  icon={<UploadOutlined />}
                  className="rounded-lg border-[#DCC7B1] bg-[#fffaf6] hover:bg-[#f1ebe6] text-[#5B4636]"
                >
                  Chọn file MP3
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
        {/* Modal for Updating Podcast */}
        <Modal
          title={
            <div className="text-center text-xl font-semibold text-[#6B4F3B]">
              <span>
                <img
                  src={logo}
                  alt=""
                  className="w-8 h-8 rounded-md inline-block mr-2"
                />
              </span>{" "}
              Cập nhật Podcast
            </div>
          }
          open={updateOpen}
          onCancel={() => {
            setUpdateOpen(false);
            updateForm.resetFields();
            setSelectedPodcast(null);
          }}
          onOk={handleSubmitUpdate}
          okText="Cập nhật"
          cancelText="Hủy"
          confirmLoading={updateLoading}
          width={600}
          className="rounded-2xl overflow-hidden"
          bodyStyle={{
            background: "linear-gradient(145deg, #f9f5f1, #fffdfa)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <Form form={updateForm} layout="vertical">
            <Form.Item
              name="title"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Tên Podcast *
                </span>
              }
              rules={[{ required: true, message: "Vui lòng nhập tên podcast" }]}
            >
              <Input
                placeholder="Nhập tên podcast..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>

            <Form.Item
              name="categories"
              label={
                <span className="text-[#6B4F3B] font-medium">Thể loại *</span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ít nhất một thể loại",
                  type: "array",
                  min: 1,
                },
              ]}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Row gutter={[16, 10]}>
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <Col span={12} key={`update-${cat.id}`}>
                        <Checkbox
                          value={cat.id.toString()}
                          className="flex items-center px-2 py-1 rounded-lg transition text-[#5B4636] hover:bg-[#f5efea]"
                          style={{
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          {cat.name}
                        </Checkbox>
                      </Col>
                    ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <span className="text-[#6B4F3B] font-medium">Mô tả *</span>
              }
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea
                rows={3}
                placeholder="Nhập mô tả podcast..."
                className="rounded-xl border-[#E5D3BF] focus:border-[#B58E6B] focus:ring-[#B58E6B]"
              />
            </Form.Item>

            <Form.Item
              name="image"
              label={
                <span className="text-[#6B4F3B] font-medium">
                  Ảnh Thumbnail *
                </span>
              }
            >
              <Upload {...uploadProps} listType="picture" accept="image/*">
                <Button
                  icon={<UploadOutlined />}
                  className="rounded-lg border-[#DCC7B1] bg-[#fffaf6] hover:bg-[#f1ebe6] text-[#5B4636]"
                >
                  Chọn ảnh
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="audio"
              label={
                <span className="text-[#6B4F3B] font-medium">File MP3 *</span>
              }
            >
              <Upload {...uploadProps} accept=".mp3,audio/*">
                <Button
                  icon={<UploadOutlined />}
                  className="rounded-lg border-[#DCC7B1] bg-[#fffaf6] hover:bg-[#f1ebe6] text-[#5B4636]"
                >
                  Chọn file MP3
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPodcastPage;
