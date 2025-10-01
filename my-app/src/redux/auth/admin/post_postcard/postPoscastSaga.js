import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  POST_POSTCARD_REQUEST,
  postPostcardFail,
  postPostcardSuccess,
} from "./postPoscastSlice";
import { fetchPodcastSuccess } from "../fetch_podcast/fetchPodcastSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postPostcardSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;

    const response = yield call(
      axios.post,
      `${URL_API}/podcasts/upload`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      yield put(postPostcardSuccess(response.data));
      toast.success("Post postcard successfully");
      const page = action.payload?.page || 1;
      const size = action.payload?.size || 10;

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
      yield put(postPostcardFail("Failed to post postcard"));
      toast.error("Failed to post postcard");
    }
  } catch (error) {
    console.error("❌ Post Postcard Error:", error);
    yield put(postPostcardFail(error.response?.data?.message || error.message));
    toast.error("An error occurred while posting the postcard");
  }
}

function* watchPostPodcast() {
  yield takeLatest(POST_POSTCARD_REQUEST, postPostcardSaga);
}

export default watchPostPodcast;
