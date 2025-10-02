import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { updatePodcastFail, updatePodcastSuccess } from "./updatePodcastSlice";
import { fetchPodcastSuccess } from "../fetch_podcast/fetchPodcastSlice";

function* updatePodcastSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;

  try {
    const token = yield select((state) => state.account.token);
    const { id, updateData } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/podcasts/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      yield put(updatePodcastSuccess(response.data));
      const page = action.payload?.page || 1;
      const size = action.payload?.size || 100;

      const apiUrl = `${URL_API}/podcasts?page=${page}&size=${size}`;

      const fetch = yield call(axios.get, apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Extract content from paginated response
        const podcasts = fetch.data.content || fetch.data;
        yield put(fetchPodcastSuccess(podcasts));
        toast.success("Cập nhật podcast thành công!");
      }
    } else {
      yield put(updatePodcastFail("Failed to update podcast"));
    }
  } catch (error) {
    let errorMessage = "Có lỗi xảy ra khi cập nhật podcast";

    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data;

      if (status === 400) {
        errorMessage =
          typeof serverMessage === "string"
            ? serverMessage
            : "Dữ liệu không hợp lệ";
      } else if (status === 401) {
        errorMessage = "Không có quyền truy cập. Vui lòng đăng nhập lại.";
      } else if (status === 403) {
        errorMessage = "Bạn không có quyền thực hiện hành động này.";
      } else if (status === 404) {
        errorMessage = "Không tìm thấy podcast.";
      }
    }

    yield put(updatePodcastFail(error.response?.data || error.message));
    toast.error(errorMessage);
  }
}

function* watchUpdatePodcast() {
  yield takeLatest("UPDATE_PODCAST_REQUEST", updatePodcastSaga);
}

export default watchUpdatePodcast;
