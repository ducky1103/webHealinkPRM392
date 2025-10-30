import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  POST_POSTCARD_REQUEST,
  postPostcardFail,
  postPostcardSuccess,
} from "./postPoscastSlice";
import {
  fetchPodcastFail,
  fetchPodcastSuccess,
} from "../fetch_podcast/fetchPodcastSlice";

const URL_API = import.meta.env.VITE_API_URL;

/**
 * Saga xử lý upload podcast
 * @param {Object} action - chứa payload là FormData
 */
function* postPostcardSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const formData = action.payload;

    // Lấy categoryIds từ formData
    let categoryIds = [];
    for (let [key, value] of formData.entries()) {
      if (key === "categoryIds") {
        try {
          categoryIds = JSON.parse(value); // dạng JSON array
        } catch {
          categoryIds = [value]; // fallback: 1 value
        }
        formData.delete("categoryIds"); // bỏ khỏi body
        break;
      }
    }

    if (!categoryIds.length) {
      throw new Error("Bạn phải chọn ít nhất một danh mục (category).");
    }

    // Build URL với query params categoryIds
    const params = new URLSearchParams();
    categoryIds.forEach((id) => params.append("categoryIds", id));
    const url = `${URL_API}/podcasts/upload?${params.toString()}`;

    // Gửi request
    const response = yield call(axios.post, url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // tránh treo request
    });

    // Xử lý kết quả
    if ([200, 201].includes(response.status)) {
      yield put(postPostcardSuccess(response.data));
      toast.success("Tạo podcast thành công!");

      const page = action.payload?.page || 1; // Change from 0 to 1
      const size = action.payload?.size || 100;

      const apiUrl = `${URL_API}/podcasts?page=${page}&size=${size}`;

      const fetch = yield call(axios.get, apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (fetch.status === 200) {
        // Extract content from paginated response
        const podcasts = fetch.data.content || fetch.data;
        yield put(fetchPodcastSuccess(podcasts));
      } else {
        yield put(fetchPodcastFail("Failed to fetch podcast"));
      }
    } else {
      throw new Error("Upload podcast thất bại!");
    }
  } catch (error) {
    // Xử lý lỗi
    let errorMessage = "Lỗi không xác định";

    if (error.code === "ERR_NETWORK") {
      errorMessage = "Lỗi mạng - Không thể kết nối server.";
    } else if (error.response) {
      errorMessage =
        error.response.data?.message ||
        error.response.data ||
        `HTTP ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "CORS error - Server không cho phép request.";
    } else {
      errorMessage = error.message;
    }

    yield put(postPostcardFail(errorMessage));
    toast.error(`Lỗi tạo podcast: ${errorMessage}`);
  }
}

function* watchPostPodcast() {
  yield takeLatest(POST_POSTCARD_REQUEST, postPostcardSaga);
}

export default watchPostPodcast;
