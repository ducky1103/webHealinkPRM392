import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  UPDATE_PODCAST_REQUEST,
  updatePodcastFail,
  updatePodcastSuccess,
} from "./updatePodcastSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* updatePodcastSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, updateData } = action.payload;

    // Extract title, description, and categoryIds from FormData
    let title = "";
    let description = "";
    let categoryIds = [];

    // Create a new FormData to avoid modifying the original
    const formData = new FormData();

    for (let [key, value] of updateData.entries()) {
      if (key === "title") {
        title = value;
        // Don't add to new FormData, will be sent as query param
      } else if (key === "description") {
        description = value;
        // Don't add to new FormData, will be sent as query param
      } else if (key === "categoryIds") {
        try {
          categoryIds = JSON.parse(value);
        } catch {
          categoryIds = [value];
        }
        // Don't add to new FormData, will be sent as query param
      } else {
        // Keep file fields in FormData
        formData.append(key, value);
      }
    }

    if (!categoryIds.length) {
      throw new Error("Bạn phải chọn ít nhất một danh mục (category).");
    }

    // Build URL with query params
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (description) params.append("description", description);
    // Add each category as separate query parameter
    categoryIds.forEach((catId) => {
      params.append("category", catId.toString());
    });
    const url = `${URL_API}/podcasts/${id}?${params.toString()}`;

    // Debug FormData contents

    const response = yield call(axios.put, url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // Avoid hanging requests
    });

    if ([200, 201].includes(response.status)) {
      yield put(updatePodcastSuccess(response.data));
      toast.success("Cập nhật podcast thành công!");
    } else {
      throw new Error("Cập nhật podcast thất bại!");
    }
  } catch (error) {
    console.error("❌ Update Podcast Error:", error);

    let errorMessage = "Lỗi không xác định";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "Lỗi mạng - Không thể kết nối server.";
    } else if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data ||
        `HTTP ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "CORS error - Server không cho phép request.";
    } else {
      errorMessage = error.message;
    }

    yield put(updatePodcastFail(errorMessage));
    toast.error(`Lỗi cập nhật podcast: ${errorMessage}`);
  }
}

function* watchUpdatePodcast() {
  yield takeLatest(UPDATE_PODCAST_REQUEST, updatePodcastSaga);
}

export default watchUpdatePodcast;
