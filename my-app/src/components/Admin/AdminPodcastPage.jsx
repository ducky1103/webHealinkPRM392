/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPostcardRequest } from "../../redux/auth/admin/post_postcard/postPoscastSlice";
import { fetchPostcastRequest } from "../../redux/auth/admin/fetch_podcast/fetchPodcastSlice";
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
import { deletePodcastRequest } from "../../redux/auth/admin/delete_podcast/deletePodcastSlice";
import { updatePodcastRequest } from "../../redux/auth/admin/update_podcast/updatePodcastSlice";

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
  const [podcasts, setPodcasts] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [currentAudio, setCurrentAudio] = useState(null);

  // Fetch podcasts on component mount
  useEffect(() => {
    dispatch(fetchPostcastRequest({ page: 1, size: 100 })); // Change from page: 0 to page: 1
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

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      // ADD CATEGORY - This was missing!
      if (values.category) {
        formData.append("category", values.category);
      }

      if (values.image?.fileList?.[0]?.originFileObj) {
        formData.append("imageFile", values.image.fileList[0].originFileObj);
      }

      if (values.audio?.fileList?.[0]?.originFileObj) {
        formData.append("file", values.audio.fileList[0].originFileObj);
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
    updateForm.setFieldsValue({
      title: podcast.title,
      category: podcast.category,
      description: podcast.description,
    });
    setUpdateOpen(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      const values = await updateForm.validateFields();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.category) {
        formData.append("category", values.category);
      }

      if (values.image?.fileList?.[0]?.originFileObj) {
        formData.append("imageFile", values.image.fileList[0].originFileObj);
      }

      if (values.audio?.fileList?.[0]?.originFileObj) {
        formData.append("file", values.audio.fileList[0].originFileObj);
      }

      dispatch(
        updatePodcastRequest({ id: selectedPodcast.id, updateData: formData })
      );

      updateForm.resetFields();
      setUpdateOpen(false);
      setSelectedPodcast(null);
    } catch (error) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      console.log(error);
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
                className="rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
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
                    <div className="absolute top-3 left-3">
                      <Tag
                        color={categoryColors[podcast.category] || "default"}
                        className="px-3 py-1 rounded-full text-xs font-medium border-0 shadow-sm"
                      >
                        {podcast.category}
                      </Tag>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2 drop-shadow-lg">
                        {podcast.title}
                      </h3>
                    </div>
                  </div>
                }
                bodyStyle={{ padding: "16px" }}
              >
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {podcast.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <SoundOutlined className="text-blue-500" />
                      <span>{podcast.duration || "N/A"}</span>
                    </div>
                    <span>
                      {new Date(podcast.createdAt).toLocaleDateString("vi-VN")}
                    </span>
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

        {/* Modal for Adding Podcast */}
        <Modal
          title={
            <div className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
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
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Tên Podcast"
              rules={[{ required: true, message: "Vui lòng nhập tên podcast" }]}
            >
              <Input placeholder="Nhập tên podcast..." />
            </Form.Item>

            <Form.Item
              name="category"
              label="Thể loại"
              rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
            >
              <Select placeholder="Chọn thể loại">
                <Select.Option value="Healing">Healing</Select.Option>
                <Select.Option value="Giáo dục">Giáo dục</Select.Option>
                <Select.Option value="Âm nhạc">Âm nhạc</Select.Option>
                <Select.Option value="Tin tức">Tin tức</Select.Option>
                <Select.Option value="Sức khỏe">Sức khỏe</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={3} placeholder="Nhập mô tả podcast..." />
            </Form.Item>

            <Form.Item
              name="image"
              label="Ảnh Thumbnail"
              rules={[
                { required: true, message: "Vui lòng tải ảnh thumbnail" },
              ]}
            >
              <Upload {...uploadProps} listType="picture" accept="image/*">
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="audio"
              label="File MP3"
              rules={[
                { required: true, message: "Vui lòng tải file âm thanh" },
              ]}
            >
              <Upload {...uploadProps} accept=".mp3,audio/*">
                <Button icon={<UploadOutlined />}>Chọn file MP3</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal for Updating Podcast */}
        <Modal
          title={
            <div className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
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
        >
          <Form form={updateForm} layout="vertical">
            <Form.Item
              name="title"
              label="Tên Podcast"
              rules={[{ required: true, message: "Vui lòng nhập tên podcast" }]}
            >
              <Input placeholder="Nhập tên podcast..." />
            </Form.Item>

            <Form.Item
              name="category"
              label="Thể loại"
              rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
            >
              <Select placeholder="Chọn thể loại">
                <Select.Option value="Healing">Healing</Select.Option>
                <Select.Option value="Giáo dục">Giáo dục</Select.Option>
                <Select.Option value="Âm nhạc">Âm nhạc</Select.Option>
                <Select.Option value="Tin tức">Tin tức</Select.Option>
                <Select.Option value="Sức khỏe">Sức khỏe</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={3} placeholder="Nhập mô tả podcast..." />
            </Form.Item>

            <Form.Item name="image" label="Ảnh Thumbnail (tùy chọn)">
              <Upload {...uploadProps} listType="picture" accept="image/*">
                <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="audio" label="File MP3 (tùy chọn)">
              <Upload {...uploadProps} accept=".mp3,audio/*">
                <Button icon={<UploadOutlined />}>Chọn file MP3 mới</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPodcastPage;
