import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  FETCH_PODCAST_REQUEST,
  fetchPodcastFail,
  fetchPodcastSuccess,
} from "./fetchPodcastSlice";

function* fetchPodcastSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;

  try {
    const token = yield select((state) => state.account.token);

    // Change to 1-based pagination (page starts from 1, not 0)
    const page = action.payload?.page || 1; // Change from 0 to 1
    const size = action.payload?.size || 10;

    const apiUrl = `${URL_API}/podcasts?page=${page}&size=${size}`;

    const response = yield call(axios.get, apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Extract content from paginated response
      const podcasts = response.data.content || response.data;
      yield put(fetchPodcastSuccess(podcasts));
    } else {
      yield put(fetchPodcastFail("Failed to fetch podcast"));
    }
  } catch (error) {
    let errorMessage = "Có lỗi xảy ra khi tải podcast";

    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        errorMessage = "Không có quyền truy cập. Vui lòng đăng nhập lại.";
      } else if (status === 403) {
        errorMessage = "Không có quyền truy cập tính năng này.";
      } else if (status === 404) {
        errorMessage = "Không tìm thấy API endpoint.";
      } else if (status === 500) {
        // Handle specific 500 error message
        const serverMessage = error.response.data;
        if (
          typeof serverMessage === "string" &&
          serverMessage.includes("Page index")
        ) {
          errorMessage = "Lỗi phân trang. Đang thử lại...";
        } else {
          errorMessage = "Lỗi server. Vui lòng thử lại sau.";
        }
      }
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server.";
    }

    yield put(fetchPodcastFail(error.response?.data || error.message));
    toast.error(errorMessage);
  }
}

function* watchFetchPodcast() {
  yield takeLatest(FETCH_PODCAST_REQUEST, fetchPodcastSaga);
}

export default watchFetchPodcast;
