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

  const [podcasts, setPodcasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [currentAudio, setCurrentAudio] = useState(null);

  // Fetch podcasts on component mount
  useEffect(() => {
    dispatch(fetchPostcastRequest({ page: 1, size: 100 }));
    dispatch(fetchCategoryRequest());
  }, [dispatch]);

  // Update podcasts state when fetchedPodcasts changes
  useEffect(() => {
    if (fetchedPodcasts) {
      setPodcasts(fetchedPodcasts);
    }
  }, [fetchedPodcasts]);

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

    dispatch(deletePodcastRequest(id));
  };

  const handlePlayAudio = (audioUrl) => {
    if (currentAudio) {
      currentAudio.audio.pause();
      if (currentAudio.url === audioUrl) {
        setCurrentAudio(null);
        return;
      }
    }

    const audio = new Audio(audioUrl);
    audio
      .play()
      .then(() => setCurrentAudio({ audio, url: audioUrl }))
      .catch((error) => {
        message.error("Không thể phát âm thanh!");
      });

    audio.onended = () => setCurrentAudio(null);
  };

  const handleUpdatePodcast = (podcast) => {
    setSelectedPodcast(podcast);

    // Fix: Set multiple categories for update
    const selectedCategories = podcast.categories
      ? podcast.categories.map((cat) => cat.id.toString())
      : [];

    updateForm.setFieldsValue({
      title: podcast.title,
      categories: selectedCategories, // Change from category to categories
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
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 hover:from-blue-600 hover:to-purple-700 shadow-lg h-12 px-8 rounded-xl"
            >
              Đăng Podcast Mới
            </Button>
          </div>
        </div>
        {/* Loading State */}
        {fetchLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500">Đang tải podcast...</p>
            </div>
          </div>
        ) : podcasts.length === 0 ? (
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
                className="rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white flex flex-col"
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
                bodyStyle={{ padding: "16px" }}
              >
                <div className="flex flex-col justify-between h-[170px] space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {podcast.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <SoundOutlined className="text-blue-500" />
                        <span>{podcast.duration || "N/A"}</span>
                      </div>
                      <span>
                        {new Date(podcast.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 space-x-2">
                    <Button
                      type="text"
                      icon={
                        currentAudio?.url === podcast.audioUrl ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-0 flex-1"
                      onClick={() => handlePlayAudio(podcast.audioUrl)}
                    >
                      {currentAudio?.url === podcast.audioUrl ? "Dừng" : "Phát"}
                    </Button>
                    <Button
                      type="text"
                      icon={<FileImageOutlined />}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 border-0"
                      onClick={() => handleUpdatePodcast(podcast)}
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
                        danger
                        className="hover:bg-red-50 border-0"
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
