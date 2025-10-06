import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  UPDATE_PODCAST_REQUEST,
  updatePodcastFail,
  updatePodcastSuccess,
} from "./updatePodcastSlice";
import { fetchPodcastSuccess } from "../fetch_podcast/fetchPodcastSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* updatePodcastSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { id, updateData } = action.payload;

    console.log("Updating podcast:", { id, updateData }); // Debug log

    // Fix: Extract categoryIds from FormData (same as post)
    let categoryIds = [];
    for (let [key, value] of updateData.entries()) {
      if (key === "categoryIds") {
        try {
          categoryIds = JSON.parse(value); // Parse JSON array
        } catch {
          categoryIds = [value]; // Fallback: single value
        }
        updateData.delete("categoryIds"); // Remove from body
        break;
      }
    }

    console.log("Extracted categoryIds:", categoryIds); // Debug log

    if (!categoryIds.length) {
      throw new Error("Bạn phải chọn ít nhất một danh mục (category).");
    }

    // Fix: Build URL with query params (same as post)
    const params = new URLSearchParams();
    categoryIds.forEach((id) => params.append("categoryIds", id));
    const url = `${URL_API}/podcasts/${id}?${params.toString()}`;

    console.log("Update URL:", url); // Debug log

    // Debug FormData contents
    console.log("FormData contents:");
    for (let [key, value] of updateData.entries()) {
      console.log(key, value instanceof File ? `File: ${value.name}` : value);
    }

    const response = yield call(axios.put, url, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // Avoid hanging requests
    });

    console.log("Update response:", response); // Debug log

    if ([200, 201].includes(response.status)) {
      yield put(updatePodcastSuccess(response.data));
      toast.success("Cập nhật podcast thành công!");

      // Refetch podcasts
      const page = 1;
      const size = 100;
      const fetchUrl = `${URL_API}/podcasts?page=${page}&size=${size}`;

      const fetchResponse = yield call(axios.get, fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (fetchResponse.status === 200) {
        const podcasts = fetchResponse.data.content || fetchResponse.data;
        yield put(fetchPodcastSuccess(podcasts));
      }
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
